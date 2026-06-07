from flask import Blueprint, jsonify, request, make_response
from bson import ObjectId
from models.BugReport import BugReport
from helpers.resend_emailer import send_email
import os
from dotenv import load_dotenv
from base64 import b64encode
load_dotenv()
admin_router = Blueprint("admin", __name__)

@admin_router.route("/admin/report_issue",methods=["POST"])
def report_issue():
    # data = request.get_json()
    email = request.form.get("email")
    issue_title = request.form.get("issueTitle")
    description = request.form.get("description")
    steps = request.form.get("steps")
    severity = request.form.get("severity")
    attachments = []
    if "screenshot" in request.files:
        file = request.files["screenshot"]
        encoded = b64encode(file.read()).decode("utf-8")
        attachments.append({
            "filename": file.filename,
            "content": encoded,
            "content_type": file.content_type,
        })   
    RESEND_EMAIL_DOMAIN = os.getenv("RESEND_EMAIL_DOMAIN")
    if not email or not issue_title:
        return make_response({"success":False,"message":"Some fields are empty. Fill them all"},400)
    bug_report_object = BugReport(title=issue_title, email=email, description=description, reproduction_steps=steps, severity=severity)
    inserted_id = bug_report_object.save()
    if inserted_id:
        subject = f"[ISSUE REPORT - {severity}]: {issue_title}"
        body = f"""
                    <b> Issue Description</b>
                    <br/>
                    <p>{description}</p>
                    <br/>
                    <b> Steps to Reproduce </b>
                    <p>{steps}</p>
                """
        email_object = send_email(fromEmail=f"bugreport@{RESEND_EMAIL_DOMAIN}", toEmails=[email,f"{os.getenv("ADMIN_EMAIL")}"],subject=subject, bodyType="html", body=body, attachments=attachments)
        if email_object:
            bug_object = BugReport.find_by_id(inserted_id)
            bug_object.update({"is_email_sent":True})
        
            return make_response(
                {
                    "success": True,
                    "message": "Issue has been reported successfully and an email has been sent to you regarding the same. Please follow up on the email if the issue is not resolved in 3 business days.",
                }, 200
            )
    return make_response(
                {
                    "success": False,
                    "message": "Something went wrong. Please try again.",
                }, 500
            )