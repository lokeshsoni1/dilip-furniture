import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, ShoppingBag, Truck, Shield, Award, Star, Minus, Plus } from "lucide-react";
import { getBySlug, formatINR, products } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Dilip Furniture` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-[60vh] grid place-items-center text-center px-6">
      <div>
        <h1 className="font-display text-4xl">Piece not found</h1>
        <p className="text-muted-foreground mt-2">This piece is no longer available.</p>
        <Link to="/sofas" className="inline-block mt-6 text-xs uppercase tracking-widest underline-gold">Browse collections</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => <div className="min-h-[60vh] grid place-items-center">{error.message}</div>,
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.has(product.slug));

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const handleAdd = () => {
    add(product, { size, color, quantity: qty });
    toast.success(`${product.name} added to cart`);
  };
  const handleBuy = () => {
    add(product, { size, color, quantity: qty });
    toast("Delivery available within 15–20 days at your doorstep.", { description: "Proceed to checkout to complete your order." });
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-8 lg:pt-12">
        <nav className="text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="capitalize">{product.category.replace("-", " ")}</span> / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="space-y-3">
            <div className="rounded-md overflow-hidden bg-secondary aspect-square">
              <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover" whileHover={{ scale: 1.04 }} transition={{ duration: 1 }} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="aspect-square bg-secondary rounded overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="size-3 fill-accent text-accent" />
              <span>{product.rating}</span>·<span>{product.reviews} reviews</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl mt-3">{product.name}</h1>
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-display">{formatINR(product.price)}</span>
              {product.mrp && <span className="text-base line-through text-muted-foreground">{formatINR(product.mrp)}</span>}
            </div>
            <p className="text-xs text-muted-foreground mt-1">EMI from {formatINR(Math.round(product.price / 12))}/mo · Inclusive of taxes</p>

            <p className="mt-8 text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Color */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c: string) => (
                  <button key={c} onClick={() => setColor(c)} className={`size-9 rounded-full ring-2 transition ${color === c ? "ring-foreground" : "ring-border"}`} style={{ background: c }} aria-label={`Color ${c}`} />
                ))}
              </div>
            </div>

            {/* Size */}
            {product.sizes && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s: string) => (
                    <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 text-sm border transition ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + buttons */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-11 grid place-items-center hover:bg-secondary"><Minus className="size-3.5" /></button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="size-11 grid place-items-center hover:bg-secondary"><Plus className="size-3.5" /></button>
              </div>
              <Button onClick={handleAdd} className="flex-1 h-11 rounded-none text-xs tracking-widest uppercase">
                <ShoppingBag className="size-4 mr-2" /> Add to Cart
              </Button>
            </div>

            <div className="mt-3 flex gap-3">
              <Button onClick={handleBuy} variant="outline" className="flex-1 h-11 rounded-none text-xs tracking-widest uppercase border-foreground">
                Buy Now
              </Button>
              <button onClick={() => toggleWish(product.slug)} aria-label="Wishlist" className="size-11 grid place-items-center border border-border hover:border-foreground transition">
                <Heart className={`size-4 ${wished ? "fill-accent text-accent" : ""}`} />
              </button>
            </div>

            <div className="mt-10 space-y-4 border-t border-border pt-8">
              <Detail icon={Truck} t="Delivery in 15–20 days" d="White-glove delivery and assembly across India, complimentary on every order." />
              <Detail icon={Shield} t="10-year structural warranty" d="Backed by our atelier — built to outlast trends." />
              <Detail icon={Award} t="Hand-finished" d="Each piece is finished by hand by master craftsmen." />
            </div>

            {/* Specs */}
            <div className="mt-10 border-t border-border pt-8">
              <h3 className="font-display text-xl mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <Spec k="Material" v={product.material} />
                <Spec k="Dimensions" v={product.dimensions} />
                <Spec k="Lead time" v="15–20 days" />
                <Spec k="Care" v="Wipe with soft dry cloth" />
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <section className="mt-24 border-t border-border pt-16">
          <h2 className="font-display text-3xl mb-10">What our clients say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "Karan S.", r: 5, t: "Better than the photographs. Truly heirloom quality." },
              { n: "Meera D.", r: 5, t: "Concierge experience start to finish." },
              { n: "Aditya P.", r: 5, t: "The finish on the wood is exquisite." },
            ].map((r, i) => (
              <div key={i} className="p-6 border border-border rounded-md">
                <div className="flex gap-0.5 mb-3">{Array.from({ length: r.r }).map((_, k) => <Star key={k} className="size-3 fill-accent text-accent" />)}</div>
                <p className="text-foreground/85 leading-relaxed">"{r.t}"</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">— {r.n}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-24">
          <h2 className="font-display text-3xl mb-10">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </>
  );
}

function Detail({ icon: Icon, t, d }: { icon: any; t: string; d: string }) {
  return (
    <div className="flex gap-4">
      <Icon className="size-5 text-accent shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-sm">{t}</p>
        <p className="text-xs text-muted-foreground">{d}</p>
      </div>
    </div>
  );
}
function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
      <dd className="mt-1 text-foreground">{v}</dd>
    </div>
  );
}
