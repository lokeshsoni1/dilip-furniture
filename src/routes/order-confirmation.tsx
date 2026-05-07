import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Dilip Furniture" },
      { name: "description", content: "Thank you for your order." },
      { property: "og:title", content: "Order Confirmed" },
      { property: "og:description", content: "Thank you for your order." },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const orderId = "DF-" + Math.random().toString(36).slice(2, 10).toUpperCase();
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="size-20 rounded-full bg-accent grid place-items-center mx-auto">
        <Check className="size-10 text-accent-foreground" strokeWidth={3} />
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-5xl mt-8">
        Thank you
      </motion.h1>
      <p className="text-muted-foreground mt-3">Your order is confirmed.</p>
      <div className="mt-8 inline-block border border-border rounded-md p-6 text-left">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Order ID</p>
        <p className="font-display text-2xl mt-1">{orderId}</p>
        <p className="text-xs text-muted-foreground mt-4">Delivery in 15–20 days at your doorstep. A confirmation has been sent to your email.</p>
      </div>
      <div className="mt-10 flex gap-3 justify-center">
        <Link to="/" className="bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition">Continue Shopping</Link>
        <button className="border border-border px-8 py-3 text-xs uppercase tracking-widest hover:border-foreground transition">Track Order</button>
      </div>
    </div>
  );
}
