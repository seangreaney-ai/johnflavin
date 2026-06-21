"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="main--inner min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-3xl text-near-black mb-4">Access by invitation</h1>
        <p className="text-sm text-near-black/60 leading-relaxed mb-8">
          The catalogue and portfolio are shared privately with clients. Get in touch with John to request access.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-white px-8 py-3.5 text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          Get in Touch
        </Link>
        <p className="text-sm text-near-black/60 mt-6">
          Already have access?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
