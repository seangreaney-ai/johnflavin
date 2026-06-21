"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function checkLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  // Demo mode: check jf_session cookie
  if (document.cookie.split(";").some(c => c.trim().startsWith("jf_session="))) return true;
  // Supabase mode: check for sb- auth cookies
  if (document.cookie.split(";").some(c => c.trim().startsWith("sb-"))) return true;
  return false;
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProtected = ["/showcase", "/options", "/selection", "/account"].some((p) =>
    pathname.startsWith(p)
  );

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setLoggedIn(isProtected || checkLoggedIn());
  }, [pathname, isProtected]);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  // On home page: light (warm-white frosted) at top, scrolled (dark frosted) when scrolled.
  // On all other pages: always light.
  const isLight = !isHome || !scrolled;
  const isScrolled = isHome && scrolled;

  const navClass = ["nav", isLight ? "light" : "", isScrolled ? "scrolled" : ""]
    .filter(Boolean)
    .join(" ");

  const link = (href: string, label: string) => {
    const active = href === "/" ? pathname === href : pathname.startsWith(href);
    return (
      <li key={href}>
        <Link href={href} className={`nav__link${active ? " active" : ""}`}>
          {label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav className={navClass}>
        <div className="nav__inner">
          <Link href="/" className="nav__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-white" src="/logo/WIbJF_Long_Logo_AllWhite.png" alt="Wood Interiors by John Flavin" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-dark" src="/logo/WIbJF_Long_Logo.png" alt="Wood Interiors by John Flavin" />
          </Link>

          <ul className="nav__links">
            {loggedIn && link("/showcase", "Our Work")}
            {loggedIn && link("/options", "Options")}
            {link("/about", "About")}
            {loggedIn ? (
              <>
                {link("/selection", "My Selection")}
                <li>
                  <Link href="/account" className="nav__cta">Account</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="nav__signin">Sign In</Link>
                </li>
                <li>
                  <Link href="/contact" className="nav__cta">Get in Touch</Link>
                </li>
              </>
            )}
          </ul>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <nav className={`nav__mobile${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        {loggedIn && <Link href="/showcase" className="nav__mobile-link" onClick={closeMenu}>Our Work</Link>}
        {loggedIn && <Link href="/options" className="nav__mobile-link" onClick={closeMenu}>Options</Link>}
        <Link href="/about" className="nav__mobile-link" onClick={closeMenu}>About</Link>
        <Link href="/contact" className="nav__mobile-link" onClick={closeMenu}>Contact</Link>
        {loggedIn ? (
          <>
            <Link href="/selection" className="nav__mobile-link" onClick={closeMenu}>My Selection</Link>
            <Link href="/account" className="nav__mobile-link" onClick={closeMenu}>Account</Link>
          </>
        ) : (
          <>
            <Link href="/login" className="nav__mobile-link" onClick={closeMenu}>Sign in</Link>
            <Link href="/register" className="nav__mobile-link" onClick={closeMenu}>Create account</Link>
          </>
        )}
        <Link href="/contact" className="nav__mobile-cta" onClick={closeMenu}>Get in Touch →</Link>
      </nav>
    </>
  );
}
