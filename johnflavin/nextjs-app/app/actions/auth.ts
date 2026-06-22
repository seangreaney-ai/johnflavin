"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; success?: string } | undefined;

const DEMO_EMAIL = "demo@johnflavin.ie";
const DEMO_PASSWORD = "Flavin2025";

function hasSupabase() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function setDemoSession() {
  const jar = await cookies();
  jar.set("jf_session", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false, sameSite: "lax" });
}

async function clearDemoSession() {
  const jar = await cookies();
  jar.set("jf_session", "", { path: "/", maxAge: 0 });
}

export async function signUp(state: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!hasSupabase()) {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      await setDemoSession();
      redirect("/catalogue");
    }
    return { error: "Demo mode: use demo@johnflavin.ie / Flavin2025 to sign in." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
  if (error) return { error: error.message };
  if (data.session) redirect("/showcase");
  return { success: "Account created! Check your email for a confirmation link, then sign in." };
}

export async function signIn(state: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const next = (formData.get("next") as string) || "/showcase";

  if (!hasSupabase()) {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      await setDemoSession();
      redirect(next);
    }
    return { error: "Incorrect email or password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect(next);
}

export async function signOut() {
  if (!hasSupabase()) {
    await clearDemoSession();
    redirect("/");
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
