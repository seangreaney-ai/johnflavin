import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/WIbJF_Long_Logo_AllWhite.png" alt="Wood Interiors by John Flavin" />
            </div>
            <p className="footer__tagline">
              Custom fitted furniture for Kerry and Munster homes — kitchens, wardrobes, living rooms, utility rooms and more.
            </p>
          </div>

          <div>
            <p className="footer__heading">Pages</p>
            <ul className="footer__links">
              <li><Link href="/showcase" className="footer__link">Our Work</Link></li>
              <li><Link href="/options" className="footer__link">Options</Link></li>
              <li><Link href="/about" className="footer__link">About</Link></li>
              <li><Link href="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer__heading">What We Make</p>
            <ul className="footer__links">
              <li><Link href="/showcase" className="footer__link">Kitchens</Link></li>
              <li><Link href="/showcase" className="footer__link">Bedrooms &amp; Wardrobes</Link></li>
              <li><Link href="/showcase" className="footer__link">Living Room Units</Link></li>
              <li><Link href="/showcase" className="footer__link">Utility Rooms</Link></li>
              <li><Link href="/showcase" className="footer__link">Bathroom Furniture</Link></li>
              <li><Link href="/showcase" className="footer__link">Wall Panels</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer__heading">Contact</p>
            <ul className="footer__links">
              <li><span className="footer__link">Duagh, Co. Kerry</span></li>
              <li><a href="tel:0870632065" className="footer__link">087 063 2065</a></li>
              <li><a href="mailto:info@johnflavin.ie" className="footer__link">info@johnflavin.ie</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Wood Interiors by John Flavin. All rights reserved.
          </p>
          <p className="footer__location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Duagh, Co. Kerry, Ireland
          </p>
        </div>
      </div>
    </footer>
  );
}
