

from datetime import datetime
from bson import ObjectId
from pymongo.errors import PyMongoError
from db import bug_report_collection


class BugReport:
    def __init__(self, title, email, description, reproduction_steps, severity, is_email_sent=False):
        self.title = title
        self.email = email
        self.description = description
        self.reproduction_steps = reproduction_steps
        self.severity = severity
        self.created_at = datetime.now()
        self.is_email_sent = is_email_sent
        self._id = None

    def save(self):
        try:
            bug_data = {
                "title": self.title,
                "email": self.email,
                "description": self.description,
                "reproduction_steps": self.reproduction_steps,
                "severity": self.severity,
                "created_at": self.created_at
            }
            result = bug_report_collection.insert_one(bug_data)
            self._id = result.inserted_id
            return result.inserted_id
        except PyMongoError as e:
            print(f"Error saving bug report: {e}")
            return None
    def update(self, updates):
        try:
            if not self._id:
                print("Cannot update bug report without _id")
                return False

            # Only allow updating certain fields
            allowed_fields = {"title", "email", "description", "reproduction_steps", "severity", "is_email_sent"}
            set_fields = {k: v for k, v in updates.items() if k in allowed_fields}
            if not set_fields:
                return False

            result = bug_report_collection.update_one({"_id": ObjectId(self._id)}, {"$set": set_fields})
            if result.modified_count > 0:
                # update local object
                for k, v in set_fields.items():
                    setattr(self, k, v)
                return True
            return False
        except PyMongoError as e:
            print(f"Error updating bug report: {e}")
            return False
    
    @staticmethod
    def find_by_id(bug_id):
        try:
            bug_data = bug_report_collection.find_one({"_id": ObjectId(bug_id)})
            if bug_data:
                bug = BugReport(
                    bug_data["title"],
                    bug_data["email"],
                    bug_data["description"],
                    bug_data["reproduction_steps"],
                    bug_data["severity"]
                )
                bug._id = bug_data["_id"]
                bug.created_at = bug_data["created_at"]
                return bug
            return None
        except PyMongoError as e:
            print(f"Error finding bug report: {e}")
            return None

    @staticmethod
    def get_all():
        try:
            bugs = []
            for bug_data in bug_report_collection.find():
                bug = BugReport(
                    bug_data["title"],
                    bug_data["email"],
                    bug_data["description"],
                    bug_data["reproduction_steps"],
                    bug_data["severity"]
                )
                bug._id = bug_data["_id"]
                bug.created_at = bug_data["created_at"]
                bugs.append(bug)
            return bugs
        except PyMongoError as e:
            print(f"Error retrieving bug reports: {e}")
            return [] 
