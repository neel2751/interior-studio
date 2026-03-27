"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "Home", href: "/", dropdown: null },
  {
    name: "Residential",
    href: "/services/residential-interior-design",
    dropdown: [
      { label: "Bedroom Interior Design",        href: "/services/residential-interior-design" },
      { label: "Master Bedroom",                 href: "/services/residential-interior-design" },
      { label: "Home Library",                   href: "/services/residential-interior-design" },
      { label: "Landscape Design",               href: "/services/residential-interior-design" },
      { label: "Kitchen Interior",               href: "/services/residential-interior-design" },
      { label: "Home Furniture",                 href: "/services/residential-interior-design" },
      { label: "Bungalow",                       href: "/services/residential-interior-design" },
      { label: "Chilekotha",                     href: "/services/residential-interior-design" },
      { label: "3-Bedroom Flat Interior Design", href: "/services/residential-interior-design" },
      { label: "Condo Design",                   href: "/services/residential-interior-design" },
      { label: "Home Gym Design",                href: "/services/residential-interior-design" },
      { label: "Small Bedroom",                  href: "/services/residential-interior-design" },
      { label: "Bedroom Wall",                   href: "/services/residential-interior-design" },
      { label: "Wooden House",                   href: "/services/residential-interior-design" },
      { label: "Loft Interior Design",           href: "/services/residential-interior-design" },
      { label: "Home Decor Products",            href: "/services/residential-interior-design" },
      { label: "Studio Apartment",               href: "/services/residential-interior-design" },
      { label: "Apartment Exterior Design",      href: "/services/residential-interior-design" },
      { label: "Villa Exterior Design",          href: "/services/residential-interior-design" },
      { label: "Drawing Room",                   href: "/services/residential-interior-design" },
      { label: "Child Bedroom",                  href: "/services/residential-interior-design" },
      { label: "Living Room",                    href: "/services/residential-interior-design" },
      { label: "Apartment",                      href: "/services/residential-interior-design" },
      { label: "Villa Design",                   href: "/services/residential-interior-design" },
      { label: "Living Space Design",            href: "/services/residential-interior-design" },
      { label: "Duplex Interior",                href: "/services/residential-interior-design" },
      { label: "Dining Room",                    href: "/services/residential-interior-design" },
      { label: "Study Unit",                     href: "/services/residential-interior-design" },
      { label: "Bathroom",                       href: "/services/residential-interior-design" },
      { label: "Village House",                  href: "/services/residential-interior-design" },
      { label: "Wall Cabinet",                   href: "/services/residential-interior-design" },
      { label: "Virtual",                        href: "/services/residential-interior-design" },
      { label: "Gaming Room",                    href: "/services/residential-interior-design" },
      { label: "Kids Furniture Design",          href: "/services/residential-interior-design" },
      { label: "Bedroom Wall Paint",             href: "/services/residential-interior-design" },
      { label: "Building Design",                href: "/services/residential-interior-design" },
    ],
  },
  {
    name: "Commercial",
    href: "/services/commercial-interior-design",
    dropdown: [
      { label: "Showroom",                       href: "/services/commercial-interior-design" },
      { label: "Restaurant Design & Decoration", href: "/services/commercial-interior-design" },
      { label: "Music Shop",                     href: "/services/commercial-interior-design" },
      { label: "Cake Shop",                      href: "/services/commercial-interior-design" },
      { label: "Exhibition Design",              href: "/services/commercial-interior-design" },
      { label: "Warehouse",                      href: "/services/commercial-interior-design" },
      { label: "Classroom Design",               href: "/services/commercial-interior-design" },
      { label: "Dormitory",                      href: "/services/commercial-interior-design" },
      { label: "Grocery Shop Design",            href: "/services/commercial-interior-design" },
      { label: "Super Shop",                     href: "/services/commercial-interior-design" },
      { label: "Small Shop",                     href: "/services/commercial-interior-design" },
      { label: "Call Center",                    href: "/services/commercial-interior-design" },
      { label: "Bakery",                         href: "/services/commercial-interior-design" },
      { label: "Cloud Kitchen",                  href: "/services/commercial-interior-design" },
      { label: "Daycare Center",                 href: "/services/commercial-interior-design" },
      { label: "Cottage",                        href: "/services/commercial-interior-design" },
      { label: "Gaming Cafe",                    href: "/services/commercial-interior-design" },
      { label: "Gents Parlour",                  href: "/services/commercial-interior-design" },
      { label: "Steel Structure Fabrication",    href: "/services/commercial-interior-design" },
      { label: "Public Restroom",                href: "/services/commercial-interior-design" },
      { label: "Training Center",                href: "/services/commercial-interior-design" },
      { label: "Pop Up Store",                   href: "/services/commercial-interior-design" },
      { label: "Clinic",                         href: "/services/commercial-interior-design" },
      { label: "Lobby",                          href: "/services/commercial-interior-design" },
      { label: "Hospital Interior",              href: "/services/commercial-interior-design" },
      { label: "Pharmacy",                       href: "/services/commercial-interior-design" },
      { label: "Buying House",                   href: "/services/commercial-interior-design" },
      { label: "Dental Clinic",                  href: "/services/commercial-interior-design" },
      { label: "Spa And Beauty Parlor",          href: "/services/commercial-interior-design" },
      { label: "Law Firm",                       href: "/services/commercial-interior-design" },
      { label: "Bank Interior",                  href: "/services/commercial-interior-design" },
      { label: "ATM Booth",                      href: "/services/commercial-interior-design" },
      { label: "Coffee Shop",                    href: "/services/commercial-interior-design" },
      { label: "Jewelry Shop",                   href: "/services/commercial-interior-design" },
      { label: "Cafeteria",                      href: "/services/commercial-interior-design" },
      { label: "Diagnostics Center",             href: "/services/commercial-interior-design" },
      { label: "Doctors Chamber",                href: "/services/commercial-interior-design" },
      { label: "IT Office",                      href: "/services/commercial-interior-design" },
      { label: "News Room",                      href: "/services/commercial-interior-design" },
      { label: "Automobile Showroom",            href: "/services/commercial-interior-design" },
      { label: "Food Court",                     href: "/services/commercial-interior-design" },
      { label: "Lawn Garden",                    href: "/services/commercial-interior-design" },
      { label: "Waiting Room",                   href: "/services/commercial-interior-design" },
      { label: "Healthcare Center",              href: "/services/commercial-interior-design" },
      { label: "Media Center",                   href: "/services/commercial-interior-design" },
      { label: "Officers Club",                  href: "/services/commercial-interior-design" },
      { label: "Turnkey Project",                href: "/services/commercial-interior-design" },
      { label: "Rehabilitation Center",          href: "/services/commercial-interior-design" },
    ],
  },
  {
    name: "Office Interior",
    href: "/services/office-interior",
    dropdown: [
      { label: "Reception Desk",       href: "/services/office-interior" },
      { label: "Conference Room",      href: "/services/office-interior" },
      { label: "CEO Desk",             href: "/services/office-interior" },
      { label: "Modular Workstation",  href: "/services/office-interior" },
      { label: "Ceiling Design",       href: "/services/office-interior" },
      { label: "Modular Storage",      href: "/services/office-interior" },
      { label: "Corporate Office",     href: "/services/office-interior" },
      { label: "Office Furniture",     href: "/services/office-interior" },
      { label: "Office Reinstatement", href: "/services/office-interior" },
      { label: "Office Decoration",    href: "/services/office-interior" },
      { label: "MD Room",              href: "/services/office-interior" },
      { label: "Meeting Room",         href: "/services/office-interior" },
      { label: "Coworking Space",      href: "/services/office-interior" },
    ],
  },
  {
    name: "Hospitality",
    href: "/services/hospitality-space",
    dropdown: [
      { label: "Hospitality Space Planning",      href: "/services/hospitality-space" },
      { label: "Lighting Setup",                  href: "/services/hospitality-space" },
      { label: "Kids Zone",                       href: "/services/hospitality-space" },
      { label: "Floor Covering",                  href: "/services/hospitality-space" },
      { label: "Branding Design",                 href: "/services/hospitality-space" },
      { label: "Hospitality Space Wall Cladding", href: "/services/hospitality-space" },
      { label: "Resort Interior Design",          href: "/services/hospitality-space" },
      { label: "Indoor Swimming Pool Interior",   href: "/services/hospitality-space" },
      { label: "Hotel Interior",                  href: "/services/hospitality-space" },
      { label: "Rooftop Garden Design",           href: "/services/hospitality-space" },
      { label: "Community Center",                href: "/services/hospitality-space" },
      { label: "Auditorium",                      href: "/services/hospitality-space" },
      { label: "Houseboat",                       href: "/services/hospitality-space" },
      { label: "Dining Hall Interior",            href: "/services/hospitality-space" },
      { label: "Theme Park Design",               href: "/services/hospitality-space" },
    ],
  },
  {
    name: "Architecture",
    href: "/services/commercial-interior-design",
    dropdown: [
      { label: "Building Planning", href: "/services/commercial-interior-design" },
    ],
  },
  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { label: "Meet The Team",         href: "/about" },
      { label: "Reviews",               href: "/about" },
      { label: "Awards & Affiliations", href: "/about" },
      { label: "Careers",               href: "/about" },
      { label: "Completed Jobs",        href: "/about" },
      { label: "Blog",                  href: "/about" },
      { label: "Hours And Location",    href: "/about" },
      { label: "Our Clients",           href: "/about" },
      { label: "Design Gallery",        href: "/about" },
      { label: "Contact Us",            href: "/contact" },
    ],
  },
];

const PANEL_WIDTH = 700;
const NAVBAR_H    = 56;

const NavItem = ({ item }: { item: (typeof NAV_ITEMS)[number] }) => {
  const [open,   setOpen]   = useState(false);
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const [left,   setLeft]   = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calcLeft = useCallback(() => {
    if (!ref.current) return;
    const rect      = ref.current.getBoundingClientRect();
    const vw        = window.innerWidth;
    const itemCenter = rect.left + rect.width / 2;
    const ideal      = itemCenter - PANEL_WIDTH / 2;
    const clamped    = Math.min(ideal, vw - PANEL_WIDTH - 8);
    setLeft(Math.max(0, clamped));
  }, []);

  const enter = () => { if (timer.current) clearTimeout(timer.current); calcLeft(); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 130); };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const rows = item.dropdown
    ? Array.from({ length: Math.ceil(item.dropdown.length / 3) })
    : [];

  return (
    <div
      ref={ref}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{ position: "relative", display: "flex", alignItems: "stretch" }}
    >
      <Link
        href={item.href}
        suppressHydrationWarning
        style={{
          display:         "flex",
          alignItems:      "center",
          gap:             5,
          padding:         "0 14px",
          color:           "#ffffff",
          fontSize:        13,
          fontWeight:      600,
          letterSpacing:   "0.06em",
          textTransform:   "uppercase",
          textDecoration:  "none",
          whiteSpace:      "nowrap",
          borderRight:     "1px solid rgba(255,255,255,0.15)",
          backgroundColor: open ? "rgba(255,255,255,0.1)" : "transparent",
          transition:      "background-color 0.18s",
          cursor:          "pointer",
          height:          "100%",
          boxSizing:       "border-box",
          fontFamily:      "'Jost', sans-serif",
          textShadow:      "0 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        <span suppressHydrationWarning>{item.name}</span>
        {item.dropdown && (
          <svg
            width="10" height="10" viewBox="0 0 12 12" fill="none"
            style={{
              flexShrink: 0, opacity: 0.85, transition: "transform 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path d="M2 4l4 4 4-4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Link>

      {item.dropdown && (
        <div
          style={{
            position:      "fixed",
            top:           NAVBAR_H,
            left:          left,
            width:         PANEL_WIDTH,
            zIndex:        99999,
            opacity:       open ? 1 : 0,
            transform:     open ? "translateY(0px)" : "translateY(-6px)",
            pointerEvents: open ? "auto" : "none",
            transition:    "opacity 0.17s ease, transform 0.17s ease",
          }}
          onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); }}
          onMouseLeave={leave}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border:          "1px solid #d0d0d0",
              borderRadius:    "0px",
              boxShadow:       "0 8px 32px rgba(0,0,0,0.18)",
              overflowY:       "auto",
              maxHeight:       "calc(100vh - 70px)",
              fontFamily:      "'Jost', sans-serif",
            }}
          >
            <div
              suppressHydrationWarning
              style={{
                display:         "block",
                padding:         "8px 18px 7px",
                fontSize:        11,
                fontWeight:      700,
                letterSpacing:   "0.13em",
                textTransform:   "uppercase",
                color:           "#9a7b3c",
                backgroundColor: "#ffffff",
                borderBottom:    "1px solid #e0e0e0",
                fontFamily:      "'Jost', sans-serif",
              }}
            >
              {item.name}
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <tbody>
                {rows.map((_, ri) => {
                  const slice   = item.dropdown!.slice(ri * 3, ri * 3 + 3);
                  const empties = 3 - slice.length;
                  const rowBg   = ri % 2 === 0 ? "#ffffff" : "#f2f2f2";
                  return (
                    <tr key={ri} style={{ backgroundColor: rowBg, borderBottom: "1px solid #e8e8e8" }}>
                      {slice.map((d, ci) => {
                        const idx = ri * 3 + ci;
                        return (
                          <td key={ci} style={{ padding: 0, width: "33.333%", verticalAlign: "middle" }}>
                            <Link
                              href={d.href}
                              suppressHydrationWarning
                              onMouseEnter={() => setHovIdx(idx)}
                              onMouseLeave={() => setHovIdx(null)}
                              style={{
                                display:        "block",
                                padding:        "10px 18px",
                                color:          "#1a1a1a",
                                fontSize:       13.5,
                                fontWeight:     hovIdx === idx ? 700 : 400,
                                textDecoration: "none",
                                lineHeight:     1.4,
                                whiteSpace:     "nowrap",
                                overflow:       "hidden",
                                textOverflow:   "ellipsis",
                                fontFamily:     "'Jost', sans-serif",
                              }}
                            >
                              <span suppressHydrationWarning>{d.label}</span>
                            </Link>
                          </td>
                        );
                      })}
                      {empties > 0 &&
                        Array.from({ length: empties }).map((_, i) => (
                          <td key={`e-${i}`} style={{ width: "33.333%", backgroundColor: rowBg }} />
                        ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  useEffect(() => {
    const clean = () =>
      document.querySelectorAll(".whatsapp-fab").forEach((el) => {
        if (!el.getAttribute("style")?.includes("display: none")) el.remove();
      });
    clean();
    const t = setInterval(clean, 100);
    return () => clearInterval(t);
  }, []);

  return (
    <nav
      suppressHydrationWarning
      style={{
        position:   "fixed",
        top:        0,
        left:       0,
        right:      0,
        zIndex:     1000,
        backgroundColor: "transparent",
        backgroundImage: "none",
        backdropFilter:  "none",
        borderBottom:    "none",
        boxShadow:       "none",
        transition:      "background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center", height: NAVBAR_H, padding: "0" }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;