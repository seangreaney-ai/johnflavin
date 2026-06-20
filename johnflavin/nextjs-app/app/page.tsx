"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FEATURED_WORK } from "@/lib/data/work";

const LS_KEY = "jf_wishlist";

function checkLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  if (document.cookie.split(";").some(c => c.trim().startsWith("jf_session="))) return true;
  if (document.cookie.split(";").some(c => c.trim().startsWith("sb-"))) return true;
  return false;
}

function getSelectionCount(): number {
  try {
    const items = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    return Array.isArray(items) ? items.length : 0;
  } catch { return 0; }
}

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);

  // Hero entrance animation
  useEffect(() => {
    const bg = document.querySelector(".hero__bg") as HTMLElement | null;
    const eyebrow = document.querySelector(".hero__eyebrow") as HTMLElement | null;
    const lines = document.querySelectorAll<HTMLElement>(".hero__title .line-inner");
    const sub = document.querySelector(".hero__sub") as HTMLElement | null;
    const actions = document.querySelector(".hero__actions") as HTMLElement | null;

    if (bg) setTimeout(() => bg.classList.add("loaded"), 80);
    if (eyebrow) setTimeout(() => eyebrow.classList.add("visible"), 200);
    lines.forEach((line, i) => setTimeout(() => line.classList.add("visible"), 280 + i * 90));
    if (sub) setTimeout(() => sub.classList.add("visible"), 550);
    if (actions) setTimeout(() => actions.classList.add("visible"), 700);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auth + selection state
  useEffect(() => {
    const loggedInState = checkLoggedIn();
    setLoggedIn(loggedInState);
    if (loggedInState) setSelectionCount(getSelectionCount());
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero__bg-video"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">
            Wood Interiors by John Flavin &nbsp;·&nbsp; Duagh, Co. Kerry
          </p>
          <h1 className="hero__title">
            <span className="line"><span className="line-inner">Custom Fitted</span></span>
            <span className="line"><span className="line-inner"><em>Furniture,</em></span></span>
            <span className="line"><span className="line-inner">Made to Last</span></span>
          </h1>
          <p className="hero__sub">
            Handcrafted kitchens, wardrobes, living room units and more — designed around your home, built to your exact specifications.
          </p>
          <div className="hero__actions">
            <Link href="/showcase" className="btn btn--primary">See Our Work</Link>
            <Link href="/contact" className="btn btn--ghost">Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="intro section--lg">
        <div className="container">
          <div className="intro__inner">
            <div className="intro__text">
              <p className="eyebrow reveal">Kerry&apos;s Custom Furniture Makers</p>
              <h2 className="display--xl reveal reveal--delay-1">Built for Kerry Homes</h2>
              <p className="intro__body reveal reveal--delay-2">
                At Wood Interiors by John Flavin, we design and build custom fitted furniture for homes across Kerry and Munster. Every piece is made to measure — from kitchens and wardrobes to utility rooms and living room units. We work closely with each customer to get the details right, from door style and colour to handles and worktops.
              </p>
              <p className="intro__body reveal reveal--delay-3" style={{ marginTop: 0 }}>
                John visits your home, listens to what you need, and designs a solution that works for your space and your lifestyle. Whether it&apos;s a full kitchen fit-out, a run of bedroom wardrobes, or a bespoke TV unit, the same care and attention goes into every job.
              </p>
              <div className="intro__stat reveal reveal--delay-4">
                <div className="intro__stat-item">
                  <div className="intro__stat-number">10+</div>
                  <div className="intro__stat-label">Years Experience</div>
                </div>
                <div className="intro__stat-item">
                  <div className="intro__stat-number">6</div>
                  <div className="intro__stat-label">Room Types</div>
                </div>
                <div className="intro__stat-item">
                  <div className="intro__stat-number">100+</div>
                  <div className="intro__stat-label">Happy Homes</div>
                </div>
              </div>
            </div>
            <div className="intro__image reveal reveal--delay-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/calaway-sitting-room-01.jpg"
                alt="Calaway Sitting Room Unit — Graphite Grey"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow reveal">What We Make</p>
            <h2 className="display--lg reveal reveal--delay-1">Every Room in Your Home</h2>
          </div>
          <div className="services__grid reveal reveal--delay-2">
            <Link href="/showcase" className="service-card">
              <span className="service-card__number">01</span>
              <h3 className="service-card__title">Custom Kitchens</h3>
              <p className="service-card__text">From classic shaker styles to sleek contemporary designs — made to measure, finished to your exact taste, and fully installed by John himself.</p>
              <span className="service-card__link">Learn more →</span>
            </Link>
            <Link href="/showcase" className="service-card">
              <span className="service-card__number">02</span>
              <h3 className="service-card__title">Bedrooms &amp; Wardrobes</h3>
              <p className="service-card__text">Hinged wardrobes, sliderobe systems, and walk-in wardrobes — made to fit your room exactly, with soft-close hardware throughout.</p>
              <span className="service-card__link">Learn more →</span>
            </Link>
            <Link href="/showcase" className="service-card">
              <span className="service-card__number">03</span>
              <h3 className="service-card__title">Living Room Units</h3>
              <p className="service-card__text">TV units, display shelving, and full-wall storage solutions — designed around your room, with optional integrated strip lighting.</p>
              <span className="service-card__link">Learn more →</span>
            </Link>
            <Link href="/showcase" className="service-card">
              <span className="service-card__number">04</span>
              <h3 className="service-card__title">Utility Rooms</h3>
              <p className="service-card__text">Practical, storage-focused utility rooms with raised appliance platforms, pull-out shelves, coat storage, and overhead presses.</p>
              <span className="service-card__link">Learn more →</span>
            </Link>
            <Link href="/showcase" className="service-card">
              <span className="service-card__number">05</span>
              <h3 className="service-card__title">Bathroom Furniture</h3>
              <p className="service-card__text">Vanity units, linen presses, and fitted bathroom storage — water-resistant finishes available, made to measure for any layout.</p>
              <span className="service-card__link">Learn more →</span>
            </Link>
            <Link href="/showcase" className="service-card">
              <span className="service-card__number">06</span>
              <h3 className="service-card__title">Wall Panels</h3>
              <p className="service-card__text">Classic and contemporary panel styles for hallways, bedrooms and sitting rooms — available in any painted colour.</p>
              <span className="service-card__link">Learn more →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects (teaser) ── */}
      <section className="projects section">
        <div className="container">
          <div
            className="section-header"
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}
          >
            <div>
              <p className="eyebrow reveal">Recent Projects</p>
              <h2 className="display--lg reveal reveal--delay-1">Our Work</h2>
              <p className="lead reveal reveal--delay-2" style={{ marginTop: "1rem" }}>
                A selection of recently completed kitchens, bedrooms, sitting rooms and more.
              </p>
            </div>
            {loggedIn && (
              <Link href="/showcase" className="btn btn--ghost-dark reveal" style={{ flexShrink: 0 }}>
                View All Projects
              </Link>
            )}
          </div>

          <div className="projects__grid">
            {FEATURED_WORK.map((item, i) => (
              <Link
                key={item.title}
                href={loggedIn ? "/showcase" : "/login"}
                className={`project-card reveal${i > 0 ? ` reveal--delay-${i}` : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="project-card__img" src={item.images[0]} alt={item.title} loading="lazy" />
                <div className="project-card__overlay" />
                <div className="project-card__info">
                  <p className="project-card__tag">{item.roomLabel}</p>
                  <p className="project-card__title">{item.title}</p>
                </div>
                <div className="project-card__label">
                  <p className="project-card__tag">{item.roomLabel}</p>
                  <p className="project-card__title">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unlock block / Logged-in CTAs ── */}
      <section className="options-teaser section">
        <div className="container">
          <div className="options-teaser__inner">
            <div className="options-teaser__images reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="options-teaser__img options-teaser__img--main"
                src="/images/shaker-door-smooth-dove-grey.jpg"
                alt="Shaker door in Dove Grey"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="options-teaser__img options-teaser__img--accent"
                src="/images/calaway-oak-door-clear-laquer.jpg"
                alt="Calaway oak door"
                loading="lazy"
              />
            </div>

            {loggedIn ? (
              /* ── Logged-in state ── */
              <div className="options-teaser__text">
                <p className="eyebrow reveal">Your Selection</p>
                <h2 className="display--lg reveal reveal--delay-1">Browse Everything, Build Your Selection</h2>
                <p className="lead reveal reveal--delay-2" style={{ marginTop: "1.5rem" }}>
                  Browse the full catalogue — every door, finish, colour, handle and worktop — and heart anything you like. John gathers the real samples and calls you to talk it through.
                </p>
                <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }} className="reveal reveal--delay-3">
                  <Link href="/options" className="btn btn--primary">Browse the full catalogue</Link>
                  <Link href="/selection" className="btn btn--ghost-dark">
                    {selectionCount > 0 ? `Your selection (${selectionCount})` : "Start your selection"}
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Logged-out state ── */
              <div className="options-teaser__text">
                <p className="eyebrow reveal">Explore the Options</p>
                <h2 className="display--lg reveal reveal--delay-1">Your Style, Your Choice</h2>
                <p className="lead reveal reveal--delay-2" style={{ marginTop: "1.5rem" }}>
                  You&apos;re seeing a handful of John&apos;s pieces. Log in to see his full portfolio of finished customer builds — and to browse every door, finish and colour and put together your own selection.
                </p>
                <ul className="options-teaser__list reveal reveal--delay-3">
                  <li className="options-teaser__item">20+ door styles — smooth, grained, painted and natural oak</li>
                  <li className="options-teaser__item">Farrow &amp; Ball, Colortrend and custom paint colours</li>
                  <li className="options-teaser__item">Quality hardware from Häfele and Hendel &amp; Hendel</li>
                  <li className="options-teaser__item">Quartz, solid oak, and laminate worktops</li>
                  <li className="options-teaser__item">Wide range of MFC board colours and finishes</li>
                </ul>
                <div style={{ marginTop: "2.5rem" }} className="reveal reveal--delay-4">
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                    <Link href="/login" className="btn btn--primary">Log in to see everything</Link>
                    <Link href="/register" className="btn btn--ghost-dark">Create an account</Link>
                  </div>
                  <p style={{ marginTop: "0.875rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                    Free. Takes a minute.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Personal promise ── */}
      <section className="cta-section section">
        <div className="container" style={{ textAlign: "center" }}>
          <p className="eyebrow eyebrow--light reveal" style={{ justifyContent: "center" }}>
            How it works
          </p>
          <h2 className="display--lg reveal reveal--delay-1" style={{ color: "var(--warm-white)", marginTop: "1rem" }}>
            John Rings You Personally
          </h2>
          <p className="lead lead--light reveal reveal--delay-2" style={{ margin: "1.5rem auto 2.5rem", maxWidth: "600px" }}>
            Log in, browse everything, and put together your own selection. John will gather the real samples — the actual doors, finishes and colours you chose — and give you a call to talk it through. No showroom queue. Just a conversation about your project.
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            className="reveal reveal--delay-3"
          >
            {loggedIn ? (
              <>
                <Link href="/options" className="btn btn--light">Browse the full catalogue</Link>
                <Link href="/selection" className="btn btn--ghost">
                  {selectionCount > 0 ? `Your selection (${selectionCount})` : "Start your selection"}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn--light">Log in to see everything</Link>
                <Link href="/contact" className="btn btn--ghost">Free Consultation</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
