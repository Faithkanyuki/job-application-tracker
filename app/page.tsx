"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data) {
        router.push("/dashboard");
      } else {
        setChecking(false);
      }
    });
  }, []);

  if (checking) {
    return <div className="min-h-screen bg-paper" />;
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="font-serif text-xl text-ink">Tracker</span>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/signin" className="text-ink hover:text-amber">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-ink text-paper rounded-full px-4 py-2 hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
            Keep every application in one place.
          </h1>
          <p className="text-stone mt-5 text-lg max-w-md">
            Job hunting means juggling dozens of roles at once. Save the ones
            you're interested in, track where each one stands, and never lose
            track of what happens next.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/signup"
              className="bg-amber text-paper rounded-full px-6 py-3 text-sm font-medium hover:opacity-90"
            >
              Start tracking for free
            </Link>
            <Link
              href="/signin"
              className="text-sm text-ink hover:text-amber"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Visual: a mock pipeline preview */}
        <div className="border border-hairline rounded-xl bg-white p-5 space-y-3">
          <PreviewRow
            title="Frontend Engineer"
            company="Northwind Studio"
            status="OFFER"
          />
          <PreviewRow
            title="Product Designer"
            company="Fieldstone Co."
            status="INTERVIEW"
          />
          <PreviewRow
            title="Backend Developer"
            company="Ravine Labs"
            status="APPLIED"
          />
          <PreviewRow
            title="Support Engineer"
            company="Talkcoms"
            status="SAVED"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          <Step
            number="1"
            title="Save a role"
            body="Add the title, company, and a link the moment you spot something worth applying to."
          />
          <Step
            number="2"
            title="Track your progress"
            body="Move it from Saved to Applied, Interview, Offer, or Rejected as things change."
          />
          <Step
            number="3"
            title="Add notes as you go"
            body="Keep interview details, contacts, and follow-ups attached to the role itself."
          />
        </div>
      </section>

      <footer className="border-t border-hairline">
        <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-stone">
          Built to keep the job search a little less chaotic.
        </div>
      </footer>
    </div>
  );
}

function PreviewRow({
  title,
  company,
  status,
}: {
  title: string;
  company: string;
  status: "SAVED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
}) {
  const styles: Record<string, string> = {
    SAVED: "bg-hairline text-ink",
    APPLIED: "bg-ink text-paper",
    INTERVIEW: "bg-amber text-paper",
    OFFER: "bg-sage text-paper",
    REJECTED: "bg-stone text-paper",
  };
  const labels: Record<string, string> = {
    SAVED: "Saved",
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
  };

  return (
    <div className="flex items-center justify-between border border-hairline rounded-lg px-4 py-3">
      <div>
        <p className="text-sm text-ink font-medium">{title}</p>
        <p className="text-xs text-stone">{company}</p>
      </div>
      <span
        className={
          "text-xs px-2.5 py-1 rounded-full font-medium " + styles[status]
        }
      >
        {labels[status]}
      </span>
    </div>
  );
}

function Step({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <span className="font-serif text-2xl text-amber">{number}</span>
      <h3 className="text-ink font-medium mt-2 mb-2">{title}</h3>
      <p className="text-sm text-stone">{body}</p>
    </div>
  );
}