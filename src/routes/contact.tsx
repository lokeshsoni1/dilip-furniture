import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dilip Furniture" },
      { name: "description", content: "Speak with our concierge. We'd love to hear from you." },
      { property: "og:title", content: "Contact Dilip Furniture" },
      { property: "og:description", content: "Speak with our concierge." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Get in touch</p>
        <h1 className="font-display text-5xl md:text-6xl">We'd love to hear from you</h1>
        <p className="mt-6 text-muted-foreground">Our concierge will reply within one business day.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mt-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thank you. We'll be in touch shortly.");
            (e.target as HTMLFormElement).reset();
          }}
          className="space-y-5"
        >
          <Field label="Name" name="name" />
          <Field label="Email" name="email" type="email" />
          <Field label="Phone" name="phone" />
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea name="message" rows={5} required className="w-full mt-2 bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm" />
          </div>
          <Button type="submit" className="h-12 px-10 text-xs uppercase tracking-widest rounded-none">Send Message</Button>
        </form>

        <div className="space-y-8">
          <Info icon={MapPin} t="Atelier" d="42 Heritage Lane, Jodhpur 342001, Rajasthan, India" />
          <Info icon={Phone} t="Phone" d="+91 99999 99999" />
          <Info icon={Mail} t="Email" d="concierge@dilipfurniture.com" />
          <div className="rounded-md overflow-hidden border border-border aspect-[4/3] gradient-warm grid place-items-center">
            <span className="text-muted-foreground text-sm">Map preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input name={name} type={type} required className="w-full mt-2 bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm" />
    </div>
  );
}
function Info({ icon: Icon, t, d }: { icon: any; t: string; d: string }) {
  return (
    <div className="flex gap-4">
      <Icon className="size-5 text-accent mt-0.5" />
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{t}</p>
        <p className="mt-1">{d}</p>
      </div>
    </div>
  );
}
