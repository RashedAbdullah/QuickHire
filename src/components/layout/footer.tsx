import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center">
                <img src="/logo.png" alt="" />
              </div>
              <span className="text-lg font-bold text-primary-foreground">
                QuickHire
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-primary-foreground">
              About
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Companies",
                "Pricing",
                "Terms",
                "Advice",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-primary-foreground">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-primary-foreground">
              Get job notifications
            </h4>
            <p className="mb-4 text-sm">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Email Address" className="bg-white" />
              <Button size="default">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 md:flex-row">
          <p className="text-sm">2025 @ QuickHire. All rights reserved.</p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-footer-foreground/10 transition-colors hover:bg-footer-foreground/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
