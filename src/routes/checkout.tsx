import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/store";
import { formatINR } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Lock, Check } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Dilip Furniture" },
      { name: "description", content: "Secure checkout. Delivery in 15–20 days." },
      { property: "og:title", content: "Checkout" },
      { property: "og:description", content: "Secure checkout." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState("upi");
  const { items, total, clear } = useCart();
  const nav = useNavigate();

  const placeOrder = () => {
    clear();
    nav({ to: "/order-confirmation" });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
      <div className="flex items-center gap-3 mb-10 text-xs uppercase tracking-widest text-muted-foreground">
        <Lock className="size-4" /> 100% Secure Checkout
      </div>

      <div className="flex items-center gap-4 mb-12">
        {["Shipping", "Payment", "Review"].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`size-8 grid place-items-center rounded-full text-xs ${step > i ? "bg-foreground text-background" : step === i + 1 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
              {step > i + 1 ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={`text-xs uppercase tracking-widest ${step === i + 1 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < 2 && <div className="w-12 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">Shipping address</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Full name" />
                <Input label="Phone" />
                <Input label="Email" type="email" />
                <Input label="Pincode" />
                <div className="md:col-span-2"><Input label="Address" /></div>
                <Input label="City" />
                <Input label="State" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">Payment method</h2>
              <div className="space-y-3">
                {[
                  { id: "upi", t: "UPI", d: "Google Pay, PhonePe, BHIM" },
                  { id: "card", t: "Credit / Debit Card", d: "Visa, Mastercard, Amex, Rupay" },
                  { id: "netbanking", t: "Net Banking", d: "All major Indian banks" },
                  { id: "razorpay", t: "Razorpay", d: "Wallets and EMI options" },
                ].map((p) => (
                  <button key={p.id} onClick={() => setPay(p.id)} className={`w-full text-left flex items-center justify-between border p-5 transition ${pay === p.id ? "border-foreground bg-secondary/50" : "border-border"}`}>
                    <div>
                      <p className="font-medium">{p.t}</p>
                      <p className="text-xs text-muted-foreground">{p.d}</p>
                    </div>
                    <div className={`size-4 rounded-full border-2 ${pay === p.id ? "border-foreground bg-foreground" : "border-border"}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">Review your order</h2>
              {items.map((i) => (
                <div key={i.product.slug} className="flex gap-4 pb-4 border-b border-border">
                  <img src={i.product.image} alt={i.product.name} className="size-20 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                  </div>
                  <p>{formatINR(i.product.price * i.quantity)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-none">Back</Button>
            )}
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)} className="ml-auto h-12 px-10 rounded-none text-xs uppercase tracking-widest">Continue</Button>
            ) : (
              <Button onClick={placeOrder} className="ml-auto h-12 px-10 rounded-none text-xs uppercase tracking-widest">Place Order</Button>
            )}
          </div>
        </motion.div>

        <aside className="border border-border p-8 h-fit space-y-4 gradient-warm">
          <h2 className="font-display text-xl">Order summary</h2>
          <div className="space-y-3 pt-4">
            {items.map((i) => (
              <div key={i.product.slug} className="flex justify-between text-sm">
                <span className="truncate pr-2">{i.product.name} × {i.quantity}</span>
                <span>{formatINR(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span className="font-display text-xl">{formatINR(total())}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Lock className="size-3" /> Secured by 256-bit encryption
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input type={type} className="w-full mt-2 bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm" />
    </div>
  );
}
