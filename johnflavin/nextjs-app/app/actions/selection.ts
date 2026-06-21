"use server";

import nodemailer from "nodemailer";
import { redirect } from "next/navigation";

export type SelectionState = { error?: string } | undefined;

interface SelectionItem {
  id: string;
  name: string;
  image: string;
  category: string;
  note?: string;
}

export async function sendSelection(state: SelectionState, formData: FormData): Promise<SelectionState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();
  const itemsJson = formData.get("items") as string;
  const uploadedFiles = formData.getAll("files") as File[];
  const validFiles = uploadedFiles.filter(f => f instanceof File && f.size > 0);

  if (!name || !email) {
    return { error: "Please enter your name and email address." };
  }

  let items: SelectionItem[] = [];
  try {
    items = JSON.parse(itemsJson || "[]");
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  if (items.length === 0) {
    return { error: "Your selection is empty. Add some items before sending." };
  }

  const johnEmail = process.env.JOHN_EMAIL || "info@johnflavin.ie";

  const grouped = items.reduce<Record<string, SelectionItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  const itemsHtml = Object.entries(grouped).map(([category, categoryItems]) => `
    <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:#9a8878;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #e8ddd0;">${category}</h3>
    ${categoryItems.map(item => `
      <div style="padding:10px 0;border-bottom:1px solid #f0ebe3;">
        <p style="margin:0;font-size:15px;color:#0f0d0b;font-weight:500;">${item.name}</p>
        ${item.note ? `<p style="margin:4px 0 0;font-size:13px;color:#9a8878;font-style:italic;">${item.note}</p>` : ""}
      </div>
    `).join("")}
  `).join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:580px;margin:0 auto;padding:40px 24px;color:#0f0d0b;">
      <div style="border-bottom:2px solid #702f18;padding-bottom:20px;margin-bottom:32px;">
        <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#9a8878;">Wood Interiors by John Flavin</p>
        <h1 style="margin:0;font-size:26px;font-weight:400;color:#0f0d0b;">New Selection — ${name}</h1>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#9a8878;width:80px;">Name</td>
          <td style="padding:6px 0;font-size:15px;color:#0f0d0b;">${name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#9a8878;">Email</td>
          <td style="padding:6px 0;font-size:15px;"><a href="mailto:${email}" style="color:#702f18;">${email}</a></td>
        </tr>
        ${phone ? `<tr>
          <td style="padding:6px 0;font-size:13px;color:#9a8878;">Phone</td>
          <td style="padding:6px 0;font-size:15px;color:#0f0d0b;">${phone}</td>
        </tr>` : ""}
      </table>

      ${message ? `
        <div style="background:#f5f0ea;padding:16px 20px;margin-bottom:32px;border-left:3px solid #702f18;">
          <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9a8878;">Message</p>
          <p style="margin:0;font-size:15px;color:#0f0d0b;line-height:1.6;">${message}</p>
        </div>
      ` : ""}

      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9a8878;">Selection — ${items.length} item${items.length !== 1 ? "s" : ""}</p>
      ${itemsHtml}

      ${validFiles.length > 0 ? `<p style="margin:28px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#9a8878;">Attachments</p><p style="margin:0 0 8px;font-size:14px;color:#0f0d0b;">${validFiles.length} file${validFiles.length !== 1 ? "s" : ""} attached: ${validFiles.map(f => f.name).join(", ")}</p>` : ""}
      <p style="margin:40px 0 0;font-size:12px;color:#c8bfb0;">Sent via johnflavin.ie on ${new Date().toLocaleDateString("en-IE", { day:"numeric", month:"long", year:"numeric" })}</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.hostgator.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "info@johnflavin.ie",
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const attachments = validFiles.length > 0
    ? await Promise.all(validFiles.map(async f => ({
        filename: f.name,
        content: Buffer.from(await f.arrayBuffer()),
      })))
    : undefined;

  try {
    await transporter.sendMail({
      from: `"Wood Interiors by John Flavin" <info@johnflavin.ie>`,
      to: johnEmail,
      replyTo: email,
      subject: `New selection from ${name} — ${items.length} item${items.length !== 1 ? "s" : ""}${validFiles.length > 0 ? ` + ${validFiles.length} file${validFiles.length !== 1 ? "s" : ""}` : ""}`,
      html,
      attachments,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("SMTP error:", msg);
    return { error: "Sorry, we couldn't send your selection right now. Please try again or contact John directly at info@johnflavin.ie." };
  }

  redirect("/selection/sent");
}
