import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/store";
import { formatINR } from "@/lib/products";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Dilip Furniture" },
      { name: "description", content: "Review your selections." },
      { property: "og:title", content: "Cart" },
      { property: "og:description", content: "Review your selections." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <Link to="/sofas" className="inline-block mt-8 bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest">Shop Collections</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <h1 className="font-display text-5xl mb-12">Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((i) => (
            <div key={i.product.slug} className="flex gap-6 pb-6 border-b border-border">
              <img src={i.product.image} alt={i.product.name} className="size-32 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-display text-xl">{i.product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{formatINR(i.product.price)}</p>
                <div className="mt-4 flex items-center gap-3">
                  <button onClick={() => setQty(i.product.slug, i.quantity - 1)} className="size-8 grid place-items-center border border-border"><Minus className="size-3" /></button>
                  <span className="w-6 text-center text-sm">{i.quantity}</span>
                  <button onClick={() => setQty(i.product.slug, i.quantity + 1)} className="size-8 grid place-items-center border border-border"><Plus className="size-3" /></button>
                  <button onClick={() => remove(i.product.slug)} className="ml-4 text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                </div>
              </div>
              <p className="font-medium">{formatINR(i.product.price * i.quantity)}</p>
            </div>
          ))}
        </div>
        <aside className="border border-border p-8 h-fit space-y-4">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="flex justify-between text-sm pt-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatINR(total())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span>Complimentary</span>
          </div>
          <div className="flex justify-between font-medium pt-4 border-t border-border">
            <span>Total</span>
            <span className="text-xl font-display">{formatINR(total())}</span>
          </div>
          <p className="text-xs text-muted-foreground">Delivery in 15–20 days at your doorstep.</p>
          <Link to="/checkout" className="block text-center bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
