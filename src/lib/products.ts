import { create } from "zustand";
import { persist } from "zustand/middleware";
import sofa from "@/assets/sofa.jpg";
import bed from "@/assets/bed.jpg";
import coffee from "@/assets/coffee.jpg";
import dining from "@/assets/dining.jpg";
import chair from "@/assets/chair.jpg";
import wardrobe from "@/assets/wardrobe.jpg";
import tv from "@/assets/tv.jpg";
import study from "@/assets/study.jpg";
import office from "@/assets/office.jpg";
import decor from "@/assets/decor.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp?: number;
  image: string;
  colors: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  material: string;
  description: string;
  dimensions: string;
  bestseller?: boolean;
  trending?: boolean;
};

export const categoryMeta: Record<string, { title: string; tagline: string; image: string }> = {
  sofas: { title: "Sofas", tagline: "Sculpted comfort. Heirloom craftsmanship.", image: sofa },
  chairs: { title: "Chairs", tagline: "Sit in considered silence.", image: chair },
  "dining-tables": { title: "Dining Tables", tagline: "Tables that gather generations.", image: dining },
  "coffee-tables": { title: "Coffee Tables", tagline: "Centerpieces of the everyday.", image: coffee },
  beds: { title: "Beds", tagline: "An ode to restful nights.", image: bed },
  wardrobes: { title: "Wardrobes", tagline: "Architecture for your wardrobe.", image: wardrobe },
  "tv-units": { title: "TV Units", tagline: "Storage, refined.", image: tv },
  "study-tables": { title: "Study Tables", tagline: "Spaces that hold your focus.", image: study },
  "office-furniture": { title: "Office Furniture", tagline: "Executive presence, quiet authority.", image: office },
  "luxury-decor": { title: "Luxury Decor", tagline: "The finishing notes.", image: decor },
};

export const initialProducts: Product[] = [
  { slug: "walnut-symphony-sofa", name: "Walnut Symphony Sofa", category: "sofas", price: 184000, mrp: 219000, image: sofa, colors: ["#e9dcc4", "#3a2a1c", "#5a4133"], sizes: ["2 Seater", "3 Seater", "L-Shape"], rating: 4.9, reviews: 142, material: "Solid walnut frame, Italian boucle upholstery", description: "A sculptural silhouette balanced on hand-finished walnut legs. Down-wrapped cushions invite long evenings.", dimensions: "W 220 × D 92 × H 84 cm", bestseller: true, trending: true },
  { slug: "ivory-cloud-sectional", name: "Ivory Cloud Modular Sectional", category: "sofas", price: 312000, image: sofa, colors: ["#f0e6d2", "#c9a87a"], sizes: ["L-Shape", "U-Shape"], rating: 4.8, reviews: 96, material: "Belgian linen, kiln-dried ash", description: "Modular geometry meets cloud-like comfort. Reconfigure as your space evolves.", dimensions: "W 320 × D 180 × H 78 cm", bestseller: true },

  { slug: "umbra-lounge-chair", name: "Umbra Leather Lounge Chair", category: "chairs", price: 86000, image: chair, colors: ["#9a4b2a", "#1a1a1a"], rating: 4.9, reviews: 211, material: "Full-grain Italian leather, brushed brass", description: "A modern shell chair with a presence that anchors any room.", dimensions: "W 78 × D 80 × H 82 cm", bestseller: true, trending: true },
  { slug: "noir-accent-chair", name: "Noir Velvet Accent Chair", category: "chairs", price: 64000, image: chair, colors: ["#1a1a1a", "#2d4a3a"], rating: 4.7, reviews: 88, material: "Cotton velvet, walnut legs", description: "Quiet drama in a single seat.", dimensions: "W 72 × D 76 × H 80 cm" },

  { slug: "monolith-dining-table", name: "Monolith Teak Dining Table", category: "dining-tables", price: 168000, mrp: 195000, image: dining, colors: ["#5a3a22"], sizes: ["6 Seater", "8 Seater"], rating: 4.9, reviews: 174, material: "Solid teak, hand-rubbed oil finish", description: "A single slab of solid teak, finished by hand and built to last lifetimes.", dimensions: "L 240 × W 100 × H 76 cm", bestseller: true },
  { slug: "marble-elegance-dining", name: "Marble Elegance Dining Table", category: "dining-tables", price: 224000, image: dining, colors: ["#f5f1ea", "#1a1a1a"], sizes: ["6 Seater"], rating: 4.8, reviews: 67, material: "Carrara marble, brushed brass", description: "A breathtaking marble top above a sculptural metal base.", dimensions: "L 220 × W 100 × H 76 cm", trending: true },

  { slug: "minimalist-marble-coffee-table", name: "Minimalist Marble Coffee Table", category: "coffee-tables", price: 58000, image: coffee, colors: ["#f5f1ea"], rating: 4.8, reviews: 128, material: "Italian marble, brass inlay", description: "Pared back to essentials. Stone, light, balance.", dimensions: "Ø 100 × H 38 cm", bestseller: true, trending: true },
  { slug: "walnut-orbit-coffee-table", name: "Walnut Orbit Coffee Table", category: "coffee-tables", price: 42000, image: coffee, colors: ["#3a2a1c"], rating: 4.7, reviews: 54, material: "Solid walnut", description: "An understated centerpiece in turned walnut.", dimensions: "Ø 90 × H 36 cm" },

  { slug: "emperor-king-bed-velvet", name: "Emperor King Bed in Velvet", category: "beds", price: 198000, mrp: 245000, image: bed, colors: ["#1c4f3d", "#1a1a1a", "#5a3a22"], sizes: ["Queen", "King", "Super King"], rating: 4.9, reviews: 233, material: "Italian velvet, solid walnut frame", description: "Hand-tufted velvet headboard on a solid walnut platform.", dimensions: "W 210 × L 220 × H 130 cm", bestseller: true, trending: true },
  { slug: "linen-sanctuary-bed", name: "Linen Sanctuary Platform Bed", category: "beds", price: 142000, image: bed, colors: ["#e9dcc4", "#9a8a72"], sizes: ["Queen", "King"], rating: 4.7, reviews: 119, material: "Belgian linen, ash frame", description: "An understated platform bed in heavyweight linen.", dimensions: "W 200 × L 220 × H 110 cm" },

  { slug: "atelier-walnut-wardrobe", name: "Atelier Walnut Wardrobe", category: "wardrobes", price: 238000, image: wardrobe, colors: ["#3a2a1c"], sizes: ["3 Door", "4 Door"], rating: 4.8, reviews: 76, material: "Solid walnut, fluted glass", description: "A wardrobe with the presence of a bespoke joinery commission.", dimensions: "W 240 × D 65 × H 230 cm", bestseller: true },
  { slug: "noir-fluted-wardrobe", name: "Noir Fluted Wardrobe", category: "wardrobes", price: 184000, image: wardrobe, colors: ["#1a1a1a"], sizes: ["3 Door"], rating: 4.6, reviews: 41, material: "Fluted oak, matte black", description: "Matte black fluted detailing for the modern bedroom.", dimensions: "W 200 × D 60 × H 220 cm" },

  { slug: "horizon-walnut-tv-unit", name: "Horizon Walnut TV Unit", category: "tv-units", price: 72000, image: tv, colors: ["#3a2a1c"], rating: 4.7, reviews: 92, material: "Solid walnut, brass pulls", description: "A low-slung media console with cable management built in.", dimensions: "W 220 × D 45 × H 45 cm", bestseller: true },
  { slug: "noir-floating-media-console", name: "Noir Floating Media Console", category: "tv-units", price: 64000, image: tv, colors: ["#1a1a1a"], rating: 4.6, reviews: 58, material: "Lacquered oak", description: "A floating silhouette that gives your room back its floor.", dimensions: "W 200 × D 40 × H 38 cm" },

  { slug: "scholar-walnut-study-desk", name: "Scholar Walnut Study Desk", category: "study-tables", price: 86000, image: study, colors: ["#3a2a1c"], rating: 4.8, reviews: 73, material: "Solid walnut, leather inlay", description: "A writer's desk with a hand-set leather inlay top.", dimensions: "W 160 × D 70 × H 76 cm", bestseller: true, trending: true },
  { slug: "atelier-compact-desk", name: "Atelier Compact Desk", category: "study-tables", price: 54000, image: study, colors: ["#5a3a22", "#1a1a1a"], rating: 4.5, reviews: 38, material: "Ash, powder-coated steel", description: "A compact, considered desk for focused work.", dimensions: "W 130 × D 60 × H 75 cm" },

  { slug: "executive-walnut-desk", name: "Executive Walnut Office Desk", category: "office-furniture", price: 198000, image: office, colors: ["#3a2a1c"], rating: 4.9, reviews: 51, material: "Solid walnut, integrated storage", description: "An executive desk built around the rituals of deep work.", dimensions: "W 200 × D 90 × H 76 cm", bestseller: true },
  { slug: "boardroom-conference-table", name: "Boardroom Conference Table", category: "office-furniture", price: 384000, image: office, colors: ["#3a2a1c"], rating: 4.8, reviews: 22, material: "Solid walnut, leather details", description: "A statement conference table for serious decisions.", dimensions: "L 360 × W 120 × H 76 cm" },

  { slug: "brass-candelabra-set", name: "Aurelius Brass Candelabra Set", category: "luxury-decor", price: 18400, image: decor, colors: ["#c9a84c"], rating: 4.8, reviews: 142, material: "Solid brushed brass", description: "A trio of candelabras in solid brass.", dimensions: "Tallest H 42 cm", trending: true },
  { slug: "ceramic-vessel-collection", name: "Ceramic Vessel Collection", category: "luxury-decor", price: 12800, image: decor, colors: ["#f5f1ea", "#9a8a72"], rating: 4.7, reviews: 88, material: "Hand-thrown stoneware", description: "A curated set of three hand-thrown ceramic vessels.", dimensions: "Set of three" },
];

export interface ProductsState {
  products: Product[];
  updateProductImage: (slug: string, newImage: string) => void;
  resetProducts: () => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: initialProducts,
      updateProductImage: (slug, newImage) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.slug === slug ? { ...p, image: newImage } : p
          ),
        })),
      resetProducts: () => set({ products: initialProducts }),
    }),
    { name: "dilip-products" }
  )
);

// Helper functions that access the latest Zustand store state
export const products: Product[] = initialProducts; // for legacy static fallback if needed

export const getByCategory = (category: string) =>
  useProductsStore.getState().products.filter((p) => p.category === category);

export const getBySlug = (slug: string) =>
  useProductsStore.getState().products.find((p) => p.slug === slug);

export const bestsellers = () =>
  useProductsStore.getState().products.filter((p) => p.bestseller).slice(0, 8);

export const trending = () =>
  useProductsStore.getState().products.filter((p) => p.trending).slice(0, 6);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

