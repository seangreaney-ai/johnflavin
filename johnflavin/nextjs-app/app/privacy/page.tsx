import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Wood Interiors by John Flavin collects, uses and protects your personal data.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow">Legal</p>
          <h1 className="display--xl page-header__title">Privacy Policy</h1>
          <p className="page-header__sub">Last updated: July 2026</p>
        </div>
      </header>

      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>

          <div style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontSize: "var(--text-base)" }}>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>Who we are</h2>
            <p>Wood Interiors by John Flavin is a fitted furniture business based in Duagh, Co. Kerry, Ireland. We design and install kitchens, wardrobes, living room units, and bespoke furniture throughout Munster.</p>
            <p style={{ marginTop: "0.75rem" }}>Contact: <a href="mailto:info@johnflavin.ie" style={{ color: "var(--primary)" }}>info@johnflavin.ie</a> · <a href="tel:+353870632065" style={{ color: "var(--primary)" }}>087 063 2065</a></p>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>What data we collect</h2>
            <p>We only collect data you provide directly:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.4rem" }}><strong>Contact form:</strong> name, email address, phone number, and your message</li>
              <li style={{ marginBottom: "0.4rem" }}><strong>Registration:</strong> name and email address to create a catalogue account</li>
              <li style={{ marginBottom: "0.4rem" }}><strong>Selection submissions:</strong> your wishlist items, name, email, and any notes or photos you attach</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>We do not use advertising trackers, analytics platforms, or third-party cookies of any kind.</p>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>How we use it</h2>
            <p>Your data is used solely to respond to your enquiry or manage your account. We do not sell, rent, or share your information with any third party for marketing purposes.</p>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>Third-party services</h2>
            <p>We use the following services to operate this website. Each processes data only as necessary to deliver the service:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.4rem" }}><strong>Supabase</strong> — secure storage of account credentials. <a href="https://supabase.com/privacy" style={{ color: "var(--primary)" }} target="_blank" rel="noopener noreferrer">Privacy policy →</a></li>
              <li style={{ marginBottom: "0.4rem" }}><strong>Resend</strong> — delivery of confirmation and enquiry emails. <a href="https://resend.com/legal/privacy-policy" style={{ color: "var(--primary)" }} target="_blank" rel="noopener noreferrer">Privacy policy →</a></li>
              <li style={{ marginBottom: "0.4rem" }}><strong>Vercel</strong> — website hosting. <a href="https://vercel.com/legal/privacy-policy" style={{ color: "var(--primary)" }} target="_blank" rel="noopener noreferrer">Privacy policy →</a></li>
            </ul>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>Cookies</h2>
            <p>This site uses one essential cookie to keep you logged in to your account. No tracking or advertising cookies are used. Essential cookies do not require consent under GDPR but you are entitled to know they exist.</p>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>How long we keep data</h2>
            <p>Enquiry emails are kept in our inbox for as long as they are relevant to your project. Account data is retained while your account is active. You can request deletion at any time by emailing <a href="mailto:info@johnflavin.ie" style={{ color: "var(--primary)" }}>info@johnflavin.ie</a>.</p>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>Your rights</h2>
            <p>Under GDPR you have the right to access, correct, or delete the personal data we hold about you. To exercise any of these rights, contact us at <a href="mailto:info@johnflavin.ie" style={{ color: "var(--primary)" }}>info@johnflavin.ie</a>. We will respond within 30 days.</p>
            <p style={{ marginTop: "0.75rem" }}>You also have the right to lodge a complaint with the Data Protection Commission Ireland: <a href="https://www.dataprotection.ie" style={{ color: "var(--primary)" }} target="_blank" rel="noopener noreferrer">dataprotection.ie</a>.</p>

            <h2 style={{ fontSize: "var(--text-lg)", color: "var(--dark)", marginBottom: "0.75rem", marginTop: "2.5rem" }}>Changes to this policy</h2>
            <p>If we make changes, the updated date at the top of this page will reflect that. We will not reduce your rights without clear notice.</p>

          </div>
        </div>
      </section>
    </>
  );
}
