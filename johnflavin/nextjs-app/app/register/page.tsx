"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <div className="main--inner min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-near-black mb-2">Create an account</h1>
          <p className="text-sm text-near-black/60">
            Free to join. Browse the full catalogue the moment you sign up.
          </p>
        </div>

        {state?.error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {state.error}
          </div>
        )}

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-[0.1em] text-near-black/60 mb-1.5">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full border border-border bg-white px-4 py-3 text-sm text-near-black placeholder:text-near-black/30 focus:outline-none focus:border-primary"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-[0.1em] text-near-black/60 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-border bg-white px-4 py-3 text-sm text-near-black placeholder:text-near-black/30 focus:outline-none focus:border-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-[0.1em] text-near-black/60 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              minLength={8}
              className="w-full border border-border bg-white px-4 py-3 text-sm text-near-black placeholder:text-near-black/30 focus:outline-none focus:border-primary"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-white py-3.5 text-sm tracking-wide hover:bg-primary/90 transition-colors mt-2 disabled:opacity-60"
          >
            {pending ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-near-black/60 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
