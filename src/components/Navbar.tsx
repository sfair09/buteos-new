'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar(): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Close menu on any scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`navbar ${isVisible ? 'visible' : ''}`}>
      <div className="navbar-container">
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="navbar-title">
          <span><Link href="/">Buteos Systems</Link></span>
        </div>
        <div className="navbar-subtitle">
          <span><Link href="/download">Free E-Book!</Link></span>
        </div>
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/tarsus">Tarsus</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/book">Book an Appointment!</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}