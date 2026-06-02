
import os 
import resend
from dotenv import load_dotenv
from helpers.utilities import generate_numeric_otp


load_dotenv()

def send_email(fromEmail:str, toEmails:list[str], subject:str,bodyType:str, body:str):
    resend.api_key = os.getenv("RESEND_API_KEY")
    print(resend.api_key)
    params: resend.Emails.SendParams = {
        "from": fromEmail,
        "to": toEmails,
        "subject": subject,
    }
    if bodyType == "text":
        params["text"] = body
    if bodyType == "html":
        params["html"] = body

    try:
        email = resend.Emails.send(params=params)
    except Exception as e :
        return {"error": f"Send Email Failed. Error: {e}"}
    
    return email

def send_onboarding_otp(toEmail:str):
    random_OTP = generate_numeric_otp()

    # Email Params
    fromEmail = "StashD <onboarding.StashD@srinivasmekala.dev>"
    toEmails = [toEmail]
    subject = "Welcome! Your OTP to verify your Email."
    bodyType = "html"
    body = f"""
            <strong style="font-size:24px">OTP: {random_OTP}</strong>
            <p> Welcome to StashD! Save your links and categorize them easily. No lost link from now on.</p>
            """
    email_data = send_email(fromEmail=fromEmail, toEmails=toEmails, subject=subject, bodyType=bodyType, body=body)
    return {
            "OTP": random_OTP,
            "email_data": email_data
        }


    