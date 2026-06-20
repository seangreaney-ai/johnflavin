import Link from "next/link";

export default function SelectionSentPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow">Selection Sent</p>
          <h1 className="display--xl page-header__title">On Its Way to John</h1>
        </div>
      </header>

      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container" style={{ maxWidth: "640px" }}>
          <div style={{ padding: "3rem 0" }}>
            <p style={{ fontSize: "var(--text-lg)", lineHeight: 1.7, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
              Your selection&apos;s on its way to John. He&apos;ll gather the real samples — the actual doors, finishes and colours you picked — and give you a call to talk it through.
            </p>
            <p style={{ fontSize: "var(--text-base)", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "3rem" }}>
              No forms, no showroom queue. Just a conversation about your project.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/showcase" className="btn btn--primary">See More Work</Link>
              <Link href="/options" className="btn btn--ghost-dark">Back to Options</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
