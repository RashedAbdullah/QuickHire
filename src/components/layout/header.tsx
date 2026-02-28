"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // scrolling down
        setIsVisible(false);
      } else {
        // scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full top-0 ${
        isVisible
          ? "translate-y-0 bg-transparent"
          : "-translate-y-full bg-transparent"
      } z-50 transition-all duration-300`}
    >
      <nav className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full">
                <img height={50} width={50} src="/logo.png" alt="Logo" />
              </div>
              <span className="text-lg font-bold text-foreground">
                QuickHire
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/jobs"
                className={`text-sm font-medium ${pathname.includes("/jobs") ? "text-foreground" : "text-muted-foreground"} hover:text-primary`}
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className={`text-sm font-medium ${pathname.includes("/companies") ? "text-foreground" : "text-muted-foreground"} hover:text-primary`}
              >
                Browse Companies
              </Link>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" className="text-primary">
              Login
            </Button>
            <div className="h-full w-full flex-1 border-l-2 border-primary/20 text-transparent">
              _
            </div>
            <Button size="sm">Sign Up</Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground"
            >
              Find Jobs
            </Link>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground"
            >
              Browse Companies
            </Link>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground"
            >
              Admin
            </Link>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                Login
              </Button>
              <Button size="sm" className="flex-1">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
