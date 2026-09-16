"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  url: string | null;
  description: string | null;
}

interface Application {
  id: string;
  jobId: string;
  status: "SAVED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  appliedDate: string | null;
  notes: string | null;
  updatedAt: string;
}

export default function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [status, setStatus] = useState("SAVED");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const jobRes = await fetch(`/api/jobs/${params.id}`);
      if (jobRes.status === 401) {
        router.push("/signin");
        return;
      }
      if (!jobRes.ok) {
        const data = await jobRes.json();
        throw new Error(data.error || "Job not found");
      }
      const jobData = await jobRes.json();
      setJob(jobData.job);

      // Look for an existing application linked to this job
      const appsRes = await fetch("/api/applications");
      const appsData = await appsRes.json();
      const existing = appsData.applications.find(
        (a: Application) => a.jobId === params.id
      );

      if (existing) {
        setApplication(existing);
        setStatus(existing.status);
        setNotes(existing.notes || "");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveApplication(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      let res;
      if (application) {
        // Update existing application
        res = await fetch(`/api/applications/${application.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, notes }),
        });
      } else {
        // Create a new application for this job
        res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: params.id, status, notes }),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save application");
      }

      setApplication(data.application);
      setSuccess("Application saved successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteJob() {
    if (!confirm("Delete this job and its application? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${params.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete job");
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!job) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <p className="text-red-600">{error || "Job not found"}</p>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
        ← Back to dashboard
      </Link>

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-semibold">{job.title}</h1>
        <p className="text-gray-500">
          {job.company}
          {job.location ? ` — ${job.location}` : ""}
        </p>
                {job.url ? (
  <a
    href={job.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-blue-600 hover:underline"
  >
    View job posting
  </a>
) : null}
        {job.description && (
          <p className="text-sm text-gray-600 mt-2">{job.description}</p>
        )}
      </div>

            <h2 className="text-lg font-medium mb-1">Application tracking</h2>
      <p className="text-sm text-stone mb-4">
        {application
          ? "Last updated " + new Date(application.updatedAt || "").toLocaleDateString()
          : "You haven't started tracking this one yet."}
      </p>

      <form onSubmit={handleSaveApplication} className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="SAVED">Saved</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            maxLength={2000}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            {success}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : application
              ? "Update application"
              : "Start tracking"}
          </button>
          <button
            type="button"
            onClick={handleDeleteJob}
            className="px-4 py-2 rounded-md border border-red-300 text-red-600 font-medium hover:bg-red-50"
          >
            Delete job
          </button>
        </div>
      </form>
    </div>
  );
}