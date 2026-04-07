"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
  icon?: string;
}

interface NavItem {
  name: string;
  href: string;
  dropdown: DropdownItem[] | null;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Home",
    href: "/",
    dropdown: null,
  },

  {
    name: "Residential",
    href: "/services/residential-interior-design",
    dropdown: [
      { label: "Residential Interior Design", href: "/services/residential-interior-design" },
      { label: "Bedroom Interior Design",      href: "/services/residential-interior-design/bedroom-interior-design" },
      { label: "Master Bedroom",               href: "/services/residential-interior-design/master-bedroom" },
      { label: "Living Room",                  href: "/services/residential-interior-design/living-room" },
      { label: "Drawing Room",                 href: "/services/residential-interior-design/drawing-room" },
      { label: "Dining Room",                  href: "/services/residential-interior-design/dining-room" },
      { label: "Kitchen Interior",             href: "/services/residential-interior-design/kitchen-interior" },
      { label: "Bathroom",                     href: "/services/residential-interior-design/bathroom" },
      { label: "Child Bedroom",                href: "/services/residential-interior-design/child-bedroom" },
      { label: "Home Library",                 href: "/services/residential-interior-design/home-library" },
      { label: "Home Gym Design",              href: "/services/residential-interior-design/home-gym-design" },
      { label: "Gaming Room",                  href: "/services/residential-interior-design/gaming-room" },
      { label: "Study Unit",                   href: "/services/residential-interior-design/study-unit" },
      { label: "Dressing Room",                href: "/services/residential-interior-design/dressing-room" },
      { label: "Wall Cabinet",                 href: "/services/residential-interior-design/wall-cabinet" },
      { label: "Apartment",                    href: "/services/residential-interior-design/apartment" },
      { label: "Studio Apartment",             href: "/services/residential-interior-design/studio-apartment" },
      { label: "Duplex Interior",              href: "/services/residential-interior-design/duplex-interior" },
      { label: "Villa Design",                 href: "/services/residential-interior-design/villa-design" },
      { label: "Bungalow",                     href: "/services/residential-interior-design/bungalow" },
      { label: "Loft Interior Design",         href: "/services/residential-interior-design/loft-interior-design" },
      { label: "Wooden House",                 href: "/services/residential-interior-design/wooden-house" },
      { label: "Village House",                href: "/services/residential-interior-design/village-house" },
      { label: "Landscape Design",             href: "/services/residential-interior-design/landscape-design" },
      { label: "Apartment Exterior Design",    href: "/services/residential-interior-design/apartment-exterior-design" },
      { label: "Villa Exterior Design",        href: "/services/residential-interior-design/villa-exterior-design" },
      { label: "Home Furniture",               href: "/services/residential-interior-design/home-furniture" },
      { label: "Kids Furniture Design",        href: "/services/residential-interior-design/kids-furniture-design" },
      { label: "Home Decor Products",          href: "/services/residential-interior-design/home-decor-products" },
      { label: "Bedroom Wall",                 href: "/services/residential-interior-design/bedroom-wall" },
      { label: "Bedroom Wall Paint",           href: "/services/residential-interior-design/bedroom-wall-paint" },
      { label: "Small Bedroom",                href: "/services/residential-interior-design/small-bedroom" },
      { label: "3-Bedroom Flat Interior",      href: "/services/residential-interior-design/3-bedroom-flat" },
      { label: "Condo Design",                 href: "/services/residential-interior-design/condo-design" },
      { label: "Chilekotha",                   href: "/services/residential-interior-design/chilekotha" },
      { label: "Building Design",              href: "/services/residential-interior-design/building-design" },
      { label: "Virtual Tour",                 href: "/services/residential-interior-design/virtual-tour" },
      { label: "Living Space Design",          href: "/services/residential-interior-design/living-space-design" },
    ],
  },

  {
    name: "Commercial",
    href: "/services/commercial-interior-design",
    dropdown: [
      { label: "Commercial Interior Design",  href: "/services/commercial-interior-design" },
      { label: "Showroom",                    href: "/services/commercial-interior-design/showroom" },
      { label: "Restaurant Design",           href: "/services/commercial-interior-design/restaurant-design" },
      { label: "Coffee Shop",                 href: "/services/commercial-interior-design/coffee-shop" },
      { label: "Bakery",                      href: "/services/commercial-interior-design/bakery" },
      { label: "Cafeteria",                   href: "/services/commercial-interior-design/cafeteria" },
      { label: "Cloud Kitchen",               href: "/services/commercial-interior-design/cloud-kitchen" },
      { label: "Food Court",                  href: "/services/commercial-interior-design/food-court" },
      { label: "Cake Shop",                   href: "/services/commercial-interior-design/cake-shop" },
      { label: "Jewelry Shop",                href: "/services/commercial-interior-design/jewelry-shop" },
      { label: "Grocery Shop Design",         href: "/services/commercial-interior-design/grocery-shop" },
      { label: "Super Shop",                  href: "/services/commercial-interior-design/super-shop" },
      { label: "Small Shop",                  href: "/services/commercial-interior-design/small-shop" },
      { label: "Music Shop",                  href: "/services/commercial-interior-design/music-shop" },
      { label: "Pop Up Store",                href: "/services/commercial-interior-design/pop-up-store" },
      { label: "Automobile Showroom",         href: "/services/commercial-interior-design/automobile-showroom" },
      { label: "Clinic",                      href: "/services/commercial-interior-design/clinic" },
      { label: "Dental Clinic",               href: "/services/commercial-interior-design/dental-clinic" },
      { label: "Hospital Interior",           href: "/services/commercial-interior-design/hospital-interior" },
      { label: "Pharmacy",                    href: "/services/commercial-interior-design/pharmacy" },
      { label: "Diagnostics Center",          href: "/services/commercial-interior-design/diagnostics-center" },
      { label: "Doctors Chamber",             href: "/services/commercial-interior-design/doctors-chamber" },
      { label: "Healthcare Center",           href: "/services/commercial-interior-design/healthcare-center" },
      { label: "Spa & Beauty Parlour",        href: "/services/commercial-interior-design/spa-beauty-parlour" },
      { label: "Gents Parlour",               href: "/services/commercial-interior-design/gents-parlour" },
      { label: "Bank Interior",               href: "/services/commercial-interior-design/bank-interior" },
      { label: "ATM Booth",                   href: "/services/commercial-interior-design/atm-booth" },
      { label: "Law Firm",                    href: "/services/commercial-interior-design/law-firm" },
      { label: "Call Center",                 href: "/services/call-center" },
      { label: "IT Office",                   href: "/services/commercial-interior-design/it-office" },
      { label: "News Room",                   href: "/services/commercial-interior-design/news-room" },
      { label: "Training Center",             href: "/services/commercial-interior-design/training-center" },
      { label: "Classroom Design",            href: "/services/commercial-interior-design/classroom-design" },
      { label: "Daycare Center",              href: "/services/commercial-interior-design/daycare-center" },
      { label: "Rehabilitation Center",       href: "/services/commercial-interior-design/rehabilitation-center" },
      { label: "Exhibition Design",           href: "/services/commercial-interior-design/exhibition-design" },
      { label: "Lobby",                       href: "/services/commercial-interior-design/lobby" },
      { label: "Waiting Room",                href: "/services/commercial-interior-design/waiting-room" },
      { label: "Dormitory",                   href: "/services/commercial-interior-design/dormitory" },
      { label: "Warehouse",                   href: "/services/commercial-interior-design/warehouse" },
      { label: "Gaming Cafe",                 href: "/services/commercial-interior-design/gaming-cafe" },
      { label: "Buying House",                href: "/services/commercial-interior-design/buying-house" },
      { label: "Officers Club",               href: "/services/commercial-interior-design/officers-club" },
      { label: "Media Center",                href: "/services/commercial-interior-design/media-center" },
      { label: "Cottage",                     href: "/services/commercial-interior-design/cottage" },
      { label: "Public Restroom",             href: "/services/commercial-interior-design/public-restroom" },
      { label: "Steel Structure Fabrication", href: "/services/commercial-interior-design/steel-structure" },
      { label: "Turnkey Project",             href: "/services/commercial-interior-design/turnkey-project" },
    ],
  },

  {
    name: "Office Interior",
    href: "/services/office-interior",
    dropdown: [
      { label: "Office Interior Design",  href: "/services/office-interior" },
      { label: "Reception Desk",          href: "/services/office-interior/reception-desk" },
      { label: "Conference Room",         href: "/services/office-interior/conference-room" },
      { label: "Meeting Room",            href: "/services/office-interior/meeting-room" },
      { label: "CEO Desk",                href: "/services/office-interior/ceo-desk" },
      { label: "MD Room",                 href: "/services/office-interior/md-room" },
      { label: "Modular Workstation",     href: "/services/office-interior/modular-workstation" },
      { label: "Coworking Space",         href: "/services/office-interior/coworking-space" },
      { label: "Corporate Office",        href: "/services/office-interior/corporate-office" },
      { label: "Ceiling Design",          href: "/services/office-interior/ceiling-design" },
      { label: "Modular Storage",         href: "/services/office-interior/modular-storage" },
      { label: "Office Furniture",        href: "/services/office-interior/office-furniture" },
      { label: "Office Decoration",       href: "/services/office-interior/office-decoration" },
      { label: "Office Reinstatement",    href: "/services/office-interior/office-reinstatement" },
    ],
  },

  {
    name: "Hospitality",
    href: "/services/hospitality-space",
    dropdown: [
      { label: "Hospitality Space Design",        href: "/services/hospitality-space" },
      { label: "Hotel Interior",                  href: "/services/hospitality-space/hotel-interior" },
      { label: "Resort Interior Design",          href: "/services/hospitality-space/resort-interior" },
      { label: "Boutique Hotel",                  href: "/services/hospitality-space/boutique-hotel" },
      { label: "Houseboat",                       href: "/services/hospitality-space/houseboat" },
      { label: "Dining Hall Interior",            href: "/services/hospitality-space/dining-hall" },
      { label: "Rooftop Garden Design",           href: "/services/hospitality-space/rooftop-garden" },
      { label: "Indoor Swimming Pool Interior",   href: "/services/hospitality-space/indoor-swimming-pool" },
      { label: "Community Center",                href: "/services/hospitality-space/community-center" },
      { label: "Auditorium",                      href: "/services/hospitality-space/auditorium" },
      { label: "Theme Park Design",               href: "/services/hospitality-space/theme-park" },
      { label: "Kids Zone",                       href: "/services/hospitality-space/kids-zone" },
      { label: "Hospitality Space Planning",      href: "/services/hospitality-space/space-planning" },
      { label: "Lighting Setup",                  href: "/services/hospitality-space/lighting-setup" },
      { label: "Floor Covering",                  href: "/services/hospitality-space/floor-covering" },
      { label: "Branding Design",                 href: "/services/hospitality-space/branding-design" },
      { label: "Hospitality Wall Cladding",       href: "/services/hospitality-space/wall-cladding" },
    ],
  },

  {
    name: "Projects",
    href: "/projects",
    dropdown: [
      { label: "All Projects",             href: "/projects" },
      { label: "Residential Projects",     href: "/projects?category=residential" },
      { label: "Commercial Projects",      href: "/projects?category=commercial" },
      { label: "Modern Villa – Ahmedabad", href: "/projects/modern-villa-ahmedabad" },
      { label: "Tech Office – Bangalore",  href: "/projects/tech-office-bangalore" },
      { label: "Sky Penthouse – Mumbai",   href: "/projects/sky-penthouse-mumbai" },
      { label: "Boutique Hotel – Goa",     href: "/projects/boutique-hotel-goa" },
      { label: "Heritage Bungalow – Pune", href: "/projects/heritage-bungalow-pune" },
      { label: "Luxury Restaurant – Delhi",href: "/projects/restaurant-delhi" },
    ],
  },

  {
    name: "Our Process",
    href: "/process",
    dropdown: [
      { label: "Our Design Process",        href: "/process" },
      { label: "Stage 1 – Consultation",    href: "/process#consultation" },
      { label: "Stage 2 – Concept",         href: "/process#concept" },
      { label: "Stage 3 – Planning",        href: "/process#planning" },
      { label: "Stage 4 – Materials",       href: "/process#materials" },
      { label: "Stage 5 – Execution",       href: "/process#execution" },
      { label: "Stage 6 – Handover",        href: "/process#handover" },
    ],
  },

  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { label: "About Interior Studio",  href: "/about" },
      { label: "Meet the Team",          href: "/about#team" },
      { label: "Awards & Affiliations",  href: "/about#awards" },
      { label: "Our Clients",            href: "/about#clients" },
      { label: "Design Gallery",         href: "/about#gallery" },
      { label: "Completed Jobs",         href: "/about#completed-jobs" },
      { label: "Careers",                href: "/about#careers" },
      { label: "Blog",                   href: "/about#blog" },
      { label: "Reviews",                href: "/about#reviews" },
      { label: "Hours & Location",       href: "/about#location" },
      { label: "Contact Us",             href: "/contact" },
    ],
  },

  {
    name: "Contact",
    href: "/contact",
    dropdown: null,
  },
];

const PANEL_WIDTH = 700;
const NAVBAR_H    = 56;

const FONT = "var(--font-body, 'Montserrat', sans-serif)";

const NavItem = ({ item }: { item: NavItem }) => {
  const [open,   setOpen]   = useState(false);
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const [left,   setLeft]   = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calcLeft = useCallback(() => {
    if (!ref.current) return;
    const rect       = ref.current.getBoundingClientRect();
    const vw         = window.innerWidth;
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
          fontSize:        18,
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
          fontFamily:      FONT,
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
          suppressHydrationWarning
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
            suppressHydrationWarning
            style={{
              backgroundColor: "#ffffff",
              border:          "1px solid #d0d0d0",
              borderRadius:    "0px",
              boxShadow:       "0 8px 32px rgba(0,0,0,0.18)",
              overflowY:       "auto",
              maxHeight:       "calc(100vh - 70px)",
              fontFamily:      FONT,
            }}
          >
            <div
              suppressHydrationWarning
              style={{
                display:         "block",
                padding:         "8px 18px 7px",
                fontSize:        15,
                fontWeight:      700,
                letterSpacing:   "0.13em",
                textTransform:   "uppercase",
                color:           "#9a7b3c",
                backgroundColor: "#ffffff",
                borderBottom:    "1px solid #e0e0e0",
                fontFamily:      FONT,
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
                    <tr key={ri} style={{ backgroundColor: rowBg, borderBottom: "1px solid #e8e8e8" }} suppressHydrationWarning>
                      {slice.map((d, ci) => {
                        const idx = ri * 3 + ci;
                        return (
                          <td key={ci} style={{ padding: 0, width: "33.333%", verticalAlign: "middle" }} suppressHydrationWarning>
                            <Link
                              href={d.href}
                              suppressHydrationWarning
                              onMouseEnter={() => setHovIdx(idx)}
                              onMouseLeave={() => setHovIdx(null)}
                              style={{
                                display:        "flex",
                                alignItems:     "center",
                                gap:            "12px",
                                padding:        "10px 18px",
                                color:          hovIdx === idx ? "#9a7b3c" : "#1a1a1a",
                                fontSize:       15,
                                fontWeight:     hovIdx === idx ? 700 : 400,
                                textDecoration: "none",
                                lineHeight:     1.4,
                                whiteSpace:     "nowrap",
                                overflow:       "hidden",
                                textOverflow:   "ellipsis",
                                fontFamily:     FONT,
                                transition:     "color 0.15s, font-weight 0.15s",
                              }}
                            >
                              {d.icon && (
                                <img
                                  src={d.icon}
                                  alt=""
                                  style={{ width: "16px", height: "16px", flexShrink: 0, opacity: 0.7 }}
                                />
                              )}
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
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          1000,
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