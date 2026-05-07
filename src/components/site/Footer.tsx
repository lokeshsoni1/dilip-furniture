import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="font-display text-2xl">Dilip <span className="text-accent">Furniture</span></div>
          <p className="text-sm text-muted-foreground mt-4 max-w-sm">
            Heirloom furniture, hand-finished in India. Built by master craftsmen for spaces that endure.
          </p>
          <div className="flex gap-3 mt-6 text-foreground/70">
            <a href="#" aria-label="Instagram" className="hover:text-accent"><Instagram className="size-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-accent"><Facebook className="size-4" /></a>
            <a href="#" aria-label="Youtube" className="hover:text-accent"><Youtube className="size-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sofas" className="hover:text-accent">Sofas</Link></li>
            <li><Link to="/beds" className="hover:text-accent">Beds</Link></li>
            <li><Link to="/dining-tables" className="hover:text-accent">Dining</Link></li>
            <li><Link to="/luxury-decor" className="hover:text-accent">Decor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><a href="#" className="hover:text-accent">Care Guide</a></li>
            <li><a href="#" className="hover:text-accent">Trade Program</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Dilip Furniture. Crafted with care.</span>
          <span>15–20 day delivery across India · Secure checkout</span>
        </div>
      </div>
    </footer>
  );
}
