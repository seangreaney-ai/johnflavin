"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

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

  // Send confirmation email to user + notification to John
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const johnEmail = process.env.JOHN_EMAIL || "info@johnflavin.ie";
    const displayName = name || email;

    await Promise.all([
      // To the new user
      resend.emails.send({
        from: "Wood Interiors by John Flavin <info@johnflavin.ie>",
        to: email,
        subject: "Welcome to John Flavin Wood Interiors",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0f0d0b;">
            <div style="border-bottom:2px solid #702f18;padding-bottom:20px;margin-bottom:32px;">
              <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#9a8878;">Wood Interiors by John Flavin</p>
              <h1 style="margin:0;font-size:26px;font-weight:400;color:#0f0d0b;">You're registered</h1>
            </div>
            <p style="font-size:16px;line-height:1.7;color:#0f0d0b;">Hi ${displayName},</p>
            <p style="font-size:15px;line-height:1.7;color:#3a3530;">Thanks for registering. You now have access to the John Flavin catalogue — browse door styles, finishes, handles, and worktops, and heart anything you like to build your selection.</p>
            <p style="font-size:15px;line-height:1.7;color:#3a3530;">When you're ready, send your selection through and John will get back to you to discuss your project.</p>
            <div style="margin:32px 0;">
              <a href="https://johnflavin.ie/catalogue" style="display:inline-block;background:#702f18;color:#f5f0ea;text-decoration:none;padding:14px 28px;font-size:14px;letter-spacing:0.05em;">Browse the Catalogue →</a>
            </div>
            <p style="margin:40px 0 0;font-size:12px;color:#c8bfb0;">Wood Interiors by John Flavin · Abbeyfeale, Co. Limerick</p>
          </div>
        `,
      }),
      // To John
      resend.emails.send({
        from: "Wood Interiors by John Flavin <info@johnflavin.ie>",
        to: johnEmail,
        replyTo: email,
        subject: `New registration — ${displayName}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#0f0d0b;">
            <div style="border-bottom:2px solid #702f18;padding-bottom:20px;margin-bottom:32px;">
              <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#9a8878;">Wood Interiors by John Flavin</p>
              <h1 style="margin:0;font-size:26px;font-weight:400;color:#0f0d0b;">New Registration</h1>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 0;font-size:13px;color:#9a8878;width:80px;">Name</td><td style="padding:6px 0;font-size:15px;color:#0f0d0b;">${displayName}</td></tr>
              <tr><td style="padding:6px 0;font-size:13px;color:#9a8878;">Email</td><td style="padding:6px 0;font-size:15px;"><a href="mailto:${email}" style="color:#702f18;">${email}</a></td></tr>
            </table>
            <p style="margin:40px 0 0;font-size:12px;color:#c8bfb0;">Sent via johnflavin.ie</p>
          </div>
        `,
      }),
    ]);
  } catch {
    // Email failure is non-fatal — account is still created
  }

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
