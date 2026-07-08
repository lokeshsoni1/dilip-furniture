import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, Calendar } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Atelier Journal — Dilip Furniture" },
      { name: "description", content: "Explore expert insights on heirloom bed engineering, Camel upholstery styling guides, and sustainable teak wood lifecycles." },
    ],
  }),
  component: ArticlesPage,
});

const articlesData = [
  {
    slug: "geometry-of-rest",
    title: "The Geometry of Rest: How Master Craftsmen Engine the Perfect Royal Bed Structure",
    category: "Master Craftsmanship",
    date: "July 8, 2026",
    readTime: "8 min read",
    image: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504425/Master_suite_lounge_with_chairs_202607081522_myy2a5.jpg",
    excerpt: "Behind the comfort of a royal bed lies a complex system of load distribution, structural joints, and selected hardwood. We detail the engineering processes that go into crafting a wobble-free heirloom frame.",
    content: [
      {
        type: "paragraph",
        text: "The pursuit of restful sleep is often discussed in terms of mattress density, thread count, and ambient lighting. However, for master carpenters, sleep is a challenge of structural geometry and physics. A bed frame must sustain dynamic load shifts while maintaining absolute silence and stability over decades. In our Jodhpur atelier, engineering the perfect royal bed frame begins with select kiln-dried solid walnut and teak, where timber pieces are chosen for matching density and moisture index."
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg",
        caption: "Bespoke solid wood framing undergoing dry assembly at our Jodhpur atelier."
      },
      {
        type: "paragraph",
        text: "Modern commercial beds rely heavily on metal brackets, wood screws, and low-grade particle board. Under regular usage, these materials bend, strips strip, and wood fibers tear, leading to creaks. Dilip Furniture's craftsmen reject quick metal fasteners, using traditional mortise-and-tenon joinery instead. This ancient connection slot matches a tongue (tenon) perfectly into a corresponding hole (mortise). The result is a solid wood connection that becomes more secure under weight, distributing stress across the entire frame."
      },
      {
        type: "paragraph",
        text: "Furthermore, the royal headboard is engineered as a primary anchor, rather than an aesthetic add-on. We anchor headboard pillars deep into the base rail using double-blind tenons, braced with Rajasthan timber pegs. This custom interlocking setup ensures that whether you rest against the tufted velvet headboard or adjust your position, there is zero flex. Every platform slat is hand-planed and dry-fitted to ensure micro-ventilation beneath the mattress, preventing mold and keeping the sleep environment pristine."
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504422/Lounge_area_with_couches_and_202607081522_w0ux6v.jpg",
        caption: "Heirloom craftsmanship balancing heavy solid headboards with elegant silhouettes."
      },
      {
        type: "paragraph",
        text: "Finally, the finishing notes are added with eco-friendly natural waxes and hand-rubbed oil coats. Unlike toxic polyurethane lacquers that choke the wood grain, natural oils soak deep, protecting the timber while allowing it to breathe. The final structural checks require testing the assembled bed under heavy weight metrics to certify that it maintains absolute rigidity. This meticulous geometry is why our beds outlast trends, standing as family heirlooms."
      }
    ]
  },
  {
    slug: "living-spaces-2026",
    title: "Living Spaces in 2026: Balancing Warm Camel Upholstery with Modernist Architectural Lines",
    category: "Luxury Styling Guide",
    date: "July 1, 2026",
    readTime: "6 min read",
    image: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg",
    excerpt: "Interiors in 2026 pivot away from cold, stark minimalism toward rich textures and grounding tones. Read our luxury styling guide on how to integrate Camel tones without cluttering modern architecture.",
    content: [
      {
        type: "paragraph",
        text: "The interior design landscape of the mid-2020s marked a distinct shift away from cold, sterile grays and stark white minimalism. Today, high-end residential architects and stylists prioritize warmth, texture, and organic grounding tones. At the center of this revival is camel upholstery—a rich, versatile color category that bridges classic elegance and contemporary luxury. However, styling camel-toned furniture requires a deliberate balancing act with the surrounding architectural lines."
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Lounge_area_with_couches_and_202607081521_yhkceu.jpg",
        caption: "A modern open-plan living room styled with warm camel upholstery and geometric solid wood details."
      },
      {
        type: "paragraph",
        text: "When styled incorrectly, camel tones can make a room feel crowded or dated. To keep the aesthetic modern, we recommend juxtaposing camel sofas against clean, industrial raw materials. A camel leather sofa, for instance, finds its perfect match alongside cast concrete fireplaces, brushed steel window frames, and cold-toned travertine floors. This tension between warm organic textures and cool industrial structures creates a layered, sophisticated atmosphere."
      },
      {
        type: "paragraph",
        text: "Lighting also plays a critical role in how camel tones interact with a room. Under warm, golden hour light, camel tones expand and radiate, whereas cool morning light accentuates the leather's texture and grain. By utilizing expansive glass windows alongside concealed warm LED strips, you can transition the space smoothly from a bright, active daylight lounge into a cozy, intimate evening sanctuary."
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504425/Master_suite_lounge_with_chairs_202607081522_myy2a5.jpg",
        caption: "Combining natural light and warm wood grains to create visual depth."
      },
      {
        type: "paragraph",
        text: "Finally, consider the power of accent colors. Rather than relying on simple neutrals, complement camel upholstery with deep forest greens, matte blacks, or solid brushed brass details. These accents highlight the warm undercurrents of the leather, establishing a balanced composition that feels deliberate, premium, and designed to inspire."
      }
    ]
  },
  {
    slug: "logging-to-polish",
    title: "From Logging to Polish: The Lifecycle of Sustainable Premium Teak Wood in Heirloom Furniture",
    category: "Design Philosophy",
    date: "June 24, 2026",
    readTime: "9 min read",
    image: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Dining_room_with_wood_theme_202607081523_dcjga6.jpg",
    excerpt: "Explore the step-by-step journey of sustainable Grade-A teak. From government-controlled forests to the multi-stage kiln drying and hand-rubbed oil polish finishes.",
    content: [
      {
        type: "paragraph",
        text: "Teak wood (Tectona grandis) has long been celebrated as the gold standard for premium furniture, prized for its exceptional oil content, tight grain pattern, and natural resistance to rot. Yet, in an era of rapid mass-production, the sourcing and curing of this luxury material are often compromised. At Dilip Furniture, we believe that the lifecycle of teak wood is sacred, dictating the stability, weight, and value of the final heirloom piece."
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Dining_room_with_wood_theme_202607081523_dcjga6.jpg",
        caption: "Grade-A sustainable teak logs seasoned and sliced at our Jodhpur lumber yard."
      },
      {
        type: "paragraph",
        text: "The journey begins in government-monitored, sustainable teak plantations. We select only mature trees that have stood for at least 30 to 40 years, ensuring the wood fibers are dense and packed with natural protective oils. Once felling is complete, the logs travel to our Jodhpur yard where they are sliced into thick slabs. Before any chisel touches the timber, the raw slabs must undergo a strict multi-month seasoning and kiln-drying process, reducing moisture levels down to a stable 8% to 12%."
      },
      {
        type: "paragraph",
        text: "Seasoning prevents the wood from warping, shrinking, or splitting when it encounters different climates across India. After drying, master craftsmen sort the timber by color and grain structure, aligning slabs manually so that table tops show a seamless, matching flow. Hand-cut joineries are then shaped, allowing the wood to expand and contract naturally with seasonal humidity changes."
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg",
        caption: "Applying natural oil finishes to preserve the natural grain patterns."
      },
      {
        type: "paragraph",
        text: "The final step is the polishing process. We avoid artificial lacquers, using hand-rubbed linseed oil and beeswax instead. This oil penetrates deep, enhancing the golden-brown color while protecting the surface from moisture. Hand-rubbing requires hours of physical labor, but it ensures that the surface remains natural, smooth, and ready to gain character over decades of home gatherings."
      }
    ]
  }
];

function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articlesData[0] | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-2xl mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Editorial</p>
              <h1 className="font-display text-5xl md:text-6xl">Atelier Journal</h1>
              <p className="mt-6 text-muted-foreground font-light leading-relaxed">
                Stories on heritage design, premium styling rules, and master-craftsmanship.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articlesData.map((article, i) => (
                <article
                  key={article.slug}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer flex flex-col h-full bg-secondary/10 rounded-lg overflow-hidden border border-border/30 hover:border-border transition-all duration-350"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform transition duration-700 group-hover:scale-103"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-background/95 backdrop-blur-[2px] text-foreground text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-medium border border-border/20">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 font-medium">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h2 className="font-display text-2xl group-hover:text-accent transition duration-300 mb-3 leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {article.excerpt}
                      </p>
                    </div>
                    <button className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mt-auto">
                      Read Article <BookOpen className="size-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition mb-10"
            >
              <ArrowLeft className="size-3.5" /> Back to Journal
            </button>

            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              {selectedArticle.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl mt-3 mb-6 leading-[1.15] text-balance">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-12 pb-6 border-b border-border/50">
              <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {selectedArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {selectedArticle.readTime}</span>
            </div>

            <div className="space-y-8 text-foreground/90 text-base leading-relaxed">
              {selectedArticle.content.map((block, i) => {
                if (block.type === "paragraph") {
                  return <p key={i}>{block.text}</p>;
                } else {
                  return (
                    <figure key={i} className="my-10 space-y-2.5">
                      <img
                        src={block.url}
                        alt={block.caption}
                        className="w-full aspect-[16/9] object-cover rounded bg-secondary"
                      />
                      <figcaption className="text-xs text-muted-foreground text-center font-light">
                        {block.caption}
                      </figcaption>
                    </figure>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
