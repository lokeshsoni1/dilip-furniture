import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/store";
import { formatINR } from "@/lib/products";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { open, setOpen, items, setQty, remove, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[70]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-background z-[71] flex flex-col shadow-luxury"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-border">
              <h2 className="font-display text-xl">Your Cart ({items.length})</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="size-5" /></button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <p className="font-display text-2xl mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-6">Curate your space with timeless pieces.</p>
                <Button onClick={() => setOpen(false)} asChild>
                  <Link to="/sofas">Shop Collections</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((i) => (
                    <div key={i.product.slug} className="flex gap-4 pb-4 border-b border-border">
                      <img src={i.product.image} alt={i.product.name} className="size-24 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-snug">{i.product.name}</h3>
                        <p className="text-xs text-muted-foreground">{formatINR(i.product.price)}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={() => setQty(i.product.slug, i.quantity - 1)} className="size-7 grid place-items-center border border-border hover:bg-secondary"><Minus className="size-3" /></button>
                          <span className="text-sm w-6 text-center">{i.quantity}</span>
                          <button onClick={() => setQty(i.product.slug, i.quantity + 1)} className="size-7 grid place-items-center border border-border hover:bg-secondary"><Plus className="size-3" /></button>
                          <button onClick={() => remove(i.product.slug)} aria-label="Remove" className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-6 py-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatINR(total())}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Delivery in 15–20 days at your doorstep.</p>
                  <Button asChild className="w-full h-12 text-xs tracking-widest uppercase" onClick={() => setOpen(false)}>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
