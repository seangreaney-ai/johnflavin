"use client";

import Link from "next/link";
import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/app/actions/auth";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "";
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl text-near-black mb-2">Sign in</h1>
        <p className="text-sm text-near-black/60">
          Welcome back. Your saved selection is waiting.
        </p>
      </div>

      {state?.error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}

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
            autoComplete="current-password"
            className="w-full border border-border bg-white px-4 py-3 text-sm text-near-black placeholder:text-near-black/30 focus:outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn btn--primary w-full justify-center mt-2"
          style={{ opacity: pending ? 0.6 : 1 }}
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-near-black/60 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="main--inner">
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
