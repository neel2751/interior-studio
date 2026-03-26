"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import "./Navbar.css";

const NAV_ITEMS = [
  { name: "HOME", href: "/", dropdown: null, direction: "right" },
  {
    name: "RESIDENTIAL",
    href: "/services/residential-interior-design",
    direction: "right",
    dropdown: [
      { label: "Bedroom Interior Design", href: "/services/residential-interior-design" },
      { label: "Master Bedroom", href: "/services/residential-interior-design" },
      { label: "Home Library", href: "/services/residential-interior-design" },
      { label: "Landscape Design", href: "/services/residential-interior-design" },
      { label: "Kitchen Interior", href: "/services/residential-interior-design" },
      { label: "Home Furniture", href: "/services/residential-interior-design" },
      { label: "Bungalow", href: "/services/residential-interior-design" },
      { label: "Chilekotha", href: "/services/residential-interior-design" },
      { label: "3-Bedroom Flat Interior Design", href: "/services/residential-interior-design" },
      { label: "Condo Design", href: "/services/residential-interior-design" },
      { label: "Home Gym Design", href: "/services/residential-interior-design" },
      { label: "Small Bedroom", href: "/services/residential-interior-design" },
      { label: "Bedroom Wall", href: "/services/residential-interior-design" },
      { label: "Wooden House", href: "/services/residential-interior-design" },
      { label: "Loft Interior Design", href: "/services/residential-interior-design" },
      { label: "Home Decor Products", href: "/services/residential-interior-design" },
      { label: "Studio Apartment", href: "/services/residential-interior-design" },
      { label: "Apartment Exterior Design", href: "/services/residential-interior-design" },
      { label: "Villa Exterior Design", href: "/services/residential-interior-design" },
      { label: "Drawing Room", href: "/services/residential-interior-design" },
      { label: "Child Bedroom", href: "/services/residential-interior-design" },
      { label: "Living Room", href: "/services/residential-interior-design" },
      { label: "Apartment", href: "/services/residential-interior-design" },
      { label: "Villa Design", href: "/services/residential-interior-design" },
      { label: "Living Space Design", href: "/services/residential-interior-design" },
      { label: "Duplex Interior", href: "/services/residential-interior-design" },
      { label: "Dining Room", href: "/services/residential-interior-design" },
      { label: "Study Unit", href: "/services/residential-interior-design" },
      { label: "Bathroom", href: "/services/residential-interior-design" },
      { label: "Village House", href: "/services/residential-interior-design" },
      { label: "Wall Cabinet", href: "/services/residential-interior-design" },
      { label: "Virtual", href: "/services/residential-interior-design" },
      { label: "Gaming Room", href: "/services/residential-interior-design" },
      { label: "Kids Furniture Design", href: "/services/residential-interior-design" },
      { label: "Bedroom Wall Paint", href: "/services/residential-interior-design" },
      { label: "Building Design", href: "/services/residential-interior-design" },
    ],
  },
  {
    name: "COMMERCIAL",
    href: "/services/commercial-interior-design",
    direction: "right",
    dropdown: [
      { label: "Showroom", href: "/services/commercial-interior-design" },
      { label: "Restaurant Design & Decoration", href: "/services/commercial-interior-design" },
      { label: "Music Shop", href: "/services/commercial-interior-design" },
      { label: "Cake Shop", href: "/services/commercial-interior-design" },
      { label: "Exhibition Design", href: "/services/commercial-interior-design" },
      { label: "Warehouse", href: "/services/commercial-interior-design" },
      { label: "Classroom Design", href: "/services/commercial-interior-design" },
      { label: "Dormitory", href: "/services/commercial-interior-design" },
      { label: "Grocery Shop Design", href: "/services/commercial-interior-design" },
      { label: "Super Shop", href: "/services/commercial-interior-design" },
      { label: "Small Shop", href: "/services/commercial-interior-design" },
      { label: "Call Center", href: "/services/commercial-interior-design" },
      { label: "Bakery", href: "/services/commercial-interior-design" },
      { label: "Cloud Kitchen", href: "/services/commercial-interior-design" },
      { label: "Daycare Center", href: "/services/commercial-interior-design" },
      { label: "Cottage", href: "/services/commercial-interior-design" },
      { label: "Gaming Cafe", href: "/services/commercial-interior-design" },
      { label: "Gents Parlour", href: "/services/commercial-interior-design" },
      { label: "Steel Structure Fabrication", href: "/services/commercial-interior-design" },
      { label: "Public Restroom", href: "/services/commercial-interior-design" },
      { label: "Training Center", href: "/services/commercial-interior-design" },
      { label: "Pop Up Store", href: "/services/commercial-interior-design" },
      { label: "Clinic", href: "/services/commercial-interior-design" },
      { label: "Lobby", href: "/services/commercial-interior-design" },
      { label: "Hospital Interior", href: "/services/commercial-interior-design" },
      { label: "Pharmacy", href: "/services/commercial-interior-design" },
      { label: "Buying House", href: "/services/commercial-interior-design" },
      { label: "Dental Clinic", href: "/services/commercial-interior-design" },
      { label: "Spa And Beauty Parlor", href: "/services/commercial-interior-design" },
      { label: "Law Firm", href: "/services/commercial-interior-design" },
      { label: "Bank Interior", href: "/services/commercial-interior-design" },
      { label: "ATM Booth", href: "/services/commercial-interior-design" },
      { label: "Coffee Shop", href: "/services/commercial-interior-design" },
      { label: "Jewelry Shop", href: "/services/commercial-interior-design" },
      { label: "Cafeteria", href: "/services/commercial-interior-design" },
      { label: "Diagnostics Center", href: "/services/commercial-interior-design" },
      { label: "Doctors Chamber", href: "/services/commercial-interior-design" },
      { label: "IT Office", href: "/services/commercial-interior-design" },
      { label: "News Room", href: "/services/commercial-interior-design" },
      { label: "Automobile Showroom", href: "/services/commercial-interior-design" },
      { label: "Food Court", href: "/services/commercial-interior-design" },
      { label: "Lawn Garden", href: "/services/commercial-interior-design" },
      { label: "Waiting Room", href: "/services/commercial-interior-design" },
      { label: "Healthcare Center", href: "/services/commercial-interior-design" },
      { label: "Media Center", href: "/services/commercial-interior-design" },
      { label: "Officers Club", href: "/services/commercial-interior-design" },
      { label: "Turnkey Project", href: "/services/commercial-interior-design" },
      { label: "Rehabilitation Center", href: "/services/commercial-interior-design" },
    ],
  },
  {
    name: "OFFICE INTERIOR",
    href: "/services/office-interior",
    direction: "right",
    dropdown: [
      { label: "Reception Desk", href: "/services/office-interior" },
      { label: "Conference Room", href: "/services/office-interior" },
      { label: "CEO Desk", href: "/services/office-interior" },
      { label: "Modular Workstation", href: "/services/office-interior" },
      { label: "Ceiling Design", href: "/services/office-interior" },
      { label: "Modular Storage", href: "/services/office-interior" },
      { label: "Corporate Office", href: "/services/office-interior" },
      { label: "Office Furniture", href: "/services/office-interior" },
      { label: "Office Reinstatement", href: "/services/office-interior" },
      { label: "Office Decoration", href: "/services/office-interior" },
      { label: "MD Room", href: "/services/office-interior" },
      { label: "Meeting Room", href: "/services/office-interior" },
      { label: "Coworking Space", href: "/services/office-interior" },
    ],
  },
  {
    name: "HOSPITALITY",
    href: "/services/hospitality-space",
    direction: "left",
    dropdown: [
      { label: "Hospitality Space Planning", href: "/services/hospitality-space" },
      { label: "Lighting Setup", href: "/services/hospitality-space" },
      { label: "Kids Zone", href: "/services/hospitality-space" },
      { label: "Floor Covering", href: "/services/hospitality-space" },
      { label: "Branding Design", href: "/services/hospitality-space" },
      { label: "Hospitality Space Wall Cladding", href: "/services/hospitality-space" },
      { label: "Resort Interior Design", href: "/services/hospitality-space" },
      { label: "Indoor Swimming Pool Interior", href: "/services/hospitality-space" },
      { label: "Hotel Interior", href: "/services/hospitality-space" },
      { label: "Rooftop Garden Design", href: "/services/hospitality-space" },
      { label: "Community Center", href: "/services/hospitality-space" },
      { label: "Auditorium", href: "/services/hospitality-space" },
      { label: "Houseboat", href: "/services/hospitality-space" },
      { label: "Dining Hall Interior", href: "/services/hospitality-space" },
      { label: "Theme Park Design", href: "/services/hospitality-space" },
    ],
  },
  {
    name: "ARCHITECTURE",
    href: "/services/commercial-interior-design",
    direction: "left",
    dropdown: [
      { label: "Building Planning", href: "/services/commercial-interior-design" },
    ],
  },
  {
    name: "ABOUT US",
    href: "/about",
    direction: "left",
    dropdown: [
      { label: "Meet The Team", href: "/about" },
      { label: "Reviews", href: "/about" },
      { label: "Awards & Affiliations", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Completed Jobs", href: "/about" },
      { label: "Blog", href: "/about" },
      { label: "Hours And Location", href: "/about" },
      { label: "Our Clients", href: "/about" },
      { label: "Design Gallery", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const NavItem = ({ item }: { item: typeof NAV_ITEMS[number] }) => {
  return (
    <div className="nav-item">
      <Link href={item.href} className="nav-link" suppressHydrationWarning>
        {item.name}
        {item.dropdown && <span className="nav-chevron" suppressHydrationWarning>▾</span>}
      </Link>

      {item.dropdown && (
        <div className={`dropdown-menu dropdown-${item.direction}`}>
          <div className="dropdown-bridge" />
          <div className="dropdown-header">
            <span className="dropdown-title">{item.name}</span>
            <span className="dropdown-divider" />
          </div>
          <div className="dropdown-grid">
            {item.dropdown.map((dropdownItem, index) => (
              <Link key={index} href={dropdownItem.href} className="dropdown-card">
                <span className="dropdown-label">{dropdownItem.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Remove WhatsApp FAB added by browser extensions
  useEffect(() => {
    const removeFAB = () => {
      const fabs = document.querySelectorAll('.whatsapp-fab');
      fabs.forEach(fab => {
        if (fab !== document.querySelector('.whatsapp-fab[style*="display: none"]')) {
          fab.remove();
        }
      });
    };
    removeFAB();
    const interval = setInterval(removeFAB, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className={isScrolled ? "navbar scrolled" : "navbar"} suppressHydrationWarning>
        <div className="nav-full">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;