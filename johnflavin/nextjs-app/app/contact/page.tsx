import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with John Flavin to arrange a free home consultation. Based in Duagh, Co. Kerry — covering Kerry and Munster.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="main--inner">
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow">Get in Touch</p>
          <h1 className="display--xl page-header__title">Contact Us</h1>
          <p className="page-header__sub">
            Call John to discuss your project. He&apos;ll visit your home, take measurements, and talk through your options.
          </p>
        </div>
      </header>
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
              <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Location</p>
              <p className="display--md" style={{ fontFamily: "var(--font-display)" }}>Duagh, Co. Kerry, Ireland</p>
            </div>
            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
              <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Phone</p>
              <a href="tel:0870632065" className="display--md" style={{ fontFamily: "var(--font-display)", color: "inherit", textDecoration: "none" }}>087 063 2065</a>
            </div>
            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
              <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Email</p>
              <a href="mailto:jfwoodinteriors@outlook.com" className="display--md" style={{ fontFamily: "var(--font-display)", color: "inherit", textDecoration: "none" }}>jfwoodinteriors@outlook.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
