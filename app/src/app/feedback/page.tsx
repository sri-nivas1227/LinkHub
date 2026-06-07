"use client";
import { useRef, useState } from "react";
import { postReportIssueAction } from "../actions";
import { toast } from "sonner";
export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    email: "",
    issueTitle: "",
    description: "",
    steps: "",
    severity: "",
    screenshot: null as File | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (
      e.target instanceof HTMLInputElement &&
      name === "screenshot" &&
      e.target.files
    ) {
      //   const input = e.target as HTMLInputElement;
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, screenshot: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend API
    const response = await postReportIssueAction(formData);
    if (response.success) {
      toast.success(response.message || "Issue reported successfully!");
    } else {
      toast.error(
        response.message || "Failed to report the issue. Please try again.",
      );
    }
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      email: "",
      issueTitle: "",
      description: "",
      steps: "",
      severity: "",
      screenshot: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  console.log("Current form data:", formData);
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-zinc-700/50 rounded-xl shadow-md p-6 md:p-8 space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center text-zinc-200">
          Report an Issue
        </h1>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-300"
          >
            Your Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border outline-none p-2 bg-zinc-800 text-zinc-200 border-zinc-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="issueTitle"
            className="block text-sm font-medium text-zinc-300"
          >
            Issue Title
          </label>
          <input
            id="issueTitle"
            name="issueTitle"
            type="text"
            required
            value={formData.issueTitle}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 bg-zinc-800 text-zinc-200 border-zinc-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Short summary of the issue"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-zinc-300"
          >
            Brief Description of the Issue
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={300}
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 bg-zinc-800 text-zinc-200 border-zinc-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Describe the issue in up to 300 characters"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="steps"
            className="block text-sm font-medium text-zinc-300"
          >
            Steps to Reproduce
          </label>
          <textarea
            id="steps"
            name="steps"
            rows={5}
            value={formData.steps}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 bg-zinc-800 text-zinc-200 border-zinc-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="severity"
            className="block text-sm font-medium text-zinc-300"
          >
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            required
            value={formData.severity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border outline-none p-2 bg-zinc-800 text-zinc-200 border-zinc-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select severity
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="screenshot"
            className="block text-sm font-medium text-zinc-300"
          >
            Screenshot
          </label>
          <input
            id="screenshot"
            name="screenshot"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-600 px-3 py-2 text-zinc-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-700"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700"
        >
          Submit Report
        </button>
      </form>
    </main>
  );
}
