"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  url: string | null;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  SAVED: "bg-gray-100 text-gray-700",
  APPLIED: "bg-blue-100 text-blue-700",
  INTERVIEW: "bg-purple-100 text-purple-700",
  OFFER: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const res = await fetch("/api/jobs");
      if (res.status === 401) {
        router.push("/signin");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to load jobs");
      }
      const data = await res.json();
      setJobs(data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/signin");
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your job applications</h1>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign out
        </button>
      </div>

      <Link
        href="/dashboard/new"
        className="inline-block bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 mb-6"
      >
        + Add job
      </Link>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs saved yet. Add your first one to start tracking.
        </p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/dashboard/${job.id}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition"
              >
                <h2 className="font-medium">{job.title}</h2>
                <p className="text-sm text-gray-500">
                  {job.company}
                  {job.location ? ` — ${job.location}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}