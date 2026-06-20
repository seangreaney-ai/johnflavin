export default function AboutPage() {
  return (
    <div className="main--inner">
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow">About</p>
          <h1 className="display--xl page-header__title">John Flavin</h1>
          <p className="page-header__sub">
            Custom fitted furniture maker based in Duagh, Co. Kerry — serving homes across Kerry and Munster for over 10 years.
          </p>
        </div>
      </header>
      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <p className="lead" style={{ marginBottom: "2rem" }}>
            At Wood Interiors by John Flavin, every piece of furniture is designed around your home and built to your exact specifications. From the first consultation to final installation, John works directly with each customer to make sure the result is exactly right.
          </p>
          <p className="lead">
            Based in Duagh, Co. Kerry, we cover all of Kerry and throughout Munster. Get in touch to arrange a free home consultation.
          </p>
        </div>
      </section>
    </div>
  );
}
