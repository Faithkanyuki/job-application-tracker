"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [productOpen, setProductOpen] = useState(false);

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
      {/* Top nav */}
      <header className="border-b border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl text-ink">Tracker</span>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button className="flex items-center gap-1 text-ink">
                Product
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 3l4 4 4-4" stroke="#1C2B3A" strokeWidth="1.5" />
                </svg>
              </button>
              {productOpen ? (
                <div className="absolute top-full left-0 pt-3 w-64">
                  <div className="bg-white border border-hairline rounded-lg shadow-sm p-2">
                    <a
                      href="#how-it-works"
                      className="block px-3 py-2 rounded-md hover:bg-paper"
                    >
                      <p className="text-sm text-ink font-medium">
                        How it works
                      </p>
                      <p className="text-xs text-stone">
                        Save, track, and follow up
                      </p>
                    </a>
                    <a
                      href="#features"
                      className="block px-3 py-2 rounded-md hover:bg-paper"
                    >
                      <p className="text-sm text-ink font-medium">Features</p>
                      <p className="text-xs text-stone">
                        Everything included
                      </p>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <a href="#features" className="text-ink hover:text-amber">
              Features
            </a>
          </nav>

          <div className="flex items-center gap-4 text-sm">
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
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-2xl mx-auto">
          Keep every application in one place.
        </h1>
        <p className="text-stone mt-5 text-lg max-w-xl mx-auto">
          Job hunting means juggling dozens of roles at once. Save the ones
          you're interested in, track where each one stands, and never lose
          track of what happens next.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="bg-amber text-paper rounded-full px-6 py-3 text-sm font-medium hover:opacity-90"
          >
            Start tracking for free
          </Link>
          <Link href="/signin" className="text-sm text-ink hover:text-amber">
            I already have an account
          </Link>
        </div>
        <p className="text-xs text-stone mt-6">
          Free to use &middot; Track unlimited applications &middot; No credit
          card required
        </p>
      </section>

      {/* Preview */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
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
      <section id="how-it-works" className="border-t border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-serif text-2xl text-ink mb-10 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
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
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-serif text-2xl text-ink mb-10 text-center">
            Everything you need to stay organized
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="One dashboard"
              body="See every application and its current status at a glance."
            />
            <FeatureCard
              title="Simple status tracking"
              body="Saved, Applied, Interview, Offer, Rejected — move roles forward as things change."
            />
            <FeatureCard
              title="Private notes"
              body="Keep interview prep, contacts, and follow-ups attached to each role."
            />
            <FeatureCard
              title="Secure by default"
              body="Your applications are yours alone — no one else can see or touch them."
            />
            <FeatureCard
              title="Sign in your way"
              body="Use email and password, or continue instantly with Google or GitHub."
            />
            <FeatureCard
              title="Works everywhere"
              body="A clean, responsive interface on desktop and mobile alike."
            />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-hairline bg-ink">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <h2 className="font-serif text-2xl text-paper mb-3">
            Start tracking your applications today
          </h2>
          <p className="text-sm text-hairline mb-6">
            Free, and takes less than a minute to set up.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-amber text-paper rounded-full px-6 py-3 text-sm font-medium hover:opacity-90"
          >
            Create your account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-serif text-lg text-ink">Tracker</span>
            <p className="text-sm text-stone mt-3">
              Built to keep the job search a little less chaotic.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-ink mb-3">Product</p>
            <ul className="space-y-2 text-sm text-stone">
              <li>
                <a href="#how-it-works" className="hover:text-ink">
                  How it works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-ink">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-ink mb-3">Account</p>
            <ul className="space-y-2 text-sm text-stone">
              <li>
                <Link href="/signin" className="hover:text-ink">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-ink">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-ink mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-stone">
              <li className="text-stone">Terms &amp; conditions</li>
              <li className="text-stone">Privacy policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-hairline">
          <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-stone">
            &copy; {new Date().getFullYear()} Tracker. All rights reserved.
          </div>
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

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-hairline rounded-lg p-5">
      <h3 className="text-ink font-medium mb-2">{title}</h3>
      <p className="text-sm text-stone">{body}</p>
    </div>
  );
}
