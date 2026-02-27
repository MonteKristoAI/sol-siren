import type { Product } from "@/contexts/CartContext";

export type ProductCategory = "women" | "men" | "outerwear" | "accessories";

export interface ProductWithSlug extends Product {
  slug: string;
  description: string;
  images: string[];
  sizes: string[];
  category: ProductCategory;
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const products: ProductWithSlug[] = [
  {
    id: "1",
    name: "Linen Wrap Blouse",
    price: 78,
    image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&q=80&auto=format&fit=crop",
    variant: "Ivory · S–L",
    slug: "linen-wrap-blouse",
    description: "A breezy linen blouse with a flattering wrap silhouette. Effortlessly transitions from day to evening with understated elegance.",
    images: [
      "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M", "L"],
    category: "women",
  },
  {
    id: "2",
    name: "Wide-Leg Trousers",
    price: 92,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop",
    variant: "Sand · XS–M",
    slug: "wide-leg-trousers",
    description: "Relaxed wide-leg trousers in a warm sand tone. Crafted for movement and comfort without sacrificing a polished look.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["XS", "S", "M"],
    category: "men",
  },
  {
    id: "3",
    name: "Silk Camisole",
    price: 64,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop",
    variant: "Blush · One Size",
    slug: "silk-camisole",
    description: "A delicate silk camisole in a soft blush tone. The perfect layering piece or standalone statement.",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["One Size"],
    category: "women",
  },
  {
    id: "4",
    name: "Tailored Blazer",
    price: 145,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop",
    variant: "Charcoal · S–XL",
    slug: "tailored-blazer",
    description: "A sharp tailored blazer in deep charcoal. Clean lines and a structured shoulder create an effortlessly commanding silhouette.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "men",
  },
  {
    id: "5",
    name: "Midi Slip Dress",
    price: 110,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop",
    variant: "Champagne · XS–L",
    slug: "midi-slip-dress",
    description: "A fluid midi slip dress in champagne. Cut on the bias for a flattering drape that moves with you.",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "women",
  },
  {
    id: "6",
    name: "Vintage Knit Cardigan",
    price: 86,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&auto=format&fit=crop",
    variant: "Oat · S–M",
    slug: "vintage-knit-cardigan",
    description: "A cozy knit cardigan with vintage-inspired detailing. Soft, oversized, and endlessly versatile.",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M"],
    category: "outerwear",
  },
  {
    id: "7",
    name: "Silk Slip Dress",
    price: 128,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop",
    variant: "Black · XS–L",
    slug: "silk-slip-dress",
    description: "The quintessential silk slip dress in timeless black. Minimal, luxurious, and designed to be worn everywhere.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "men",
  },
  {
    id: "8",
    name: "Linen Wrap Dress",
    price: 98,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop",
    variant: "Ecru · S–XL",
    slug: "linen-wrap-dress",
    description: "An airy linen wrap dress in soft ecru. A warm-weather essential that feels both polished and relaxed.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "accessories",
  },
  {
    id: "9",
    name: "Vintage Denim Jacket",
    price: 135,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80&auto=format&fit=crop",
    variant: "Washed Blue · S–L",
    slug: "vintage-denim-jacket",
    description: "A perfectly worn-in denim jacket with authentic vintage character. The kind of piece that only gets better with time.",
    images: [
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M", "L"],
    category: "outerwear",
  },
  {
    id: "10",
    name: "Cashmere Cardigan",
    price: 165,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&auto=format&fit=crop",
    variant: "Camel · XS–M",
    slug: "cashmere-cardigan",
    description: "Pure cashmere in a rich camel tone. Luxuriously soft with a relaxed fit that layers beautifully.",
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["XS", "S", "M"],
    category: "outerwear",
  },
  {
    id: "11",
    name: "Pleated Midi Skirt",
    price: 88,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80&auto=format&fit=crop",
    variant: "Sage · S–L",
    slug: "pleated-midi-skirt",
    description: "A flowing pleated midi skirt in muted sage. Elegant movement and a timeless silhouette for any occasion.",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M", "L"],
    category: "accessories",
  },
  {
    id: "12",
    name: "Classic Trench Coat",
    price: 195,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&auto=format&fit=crop",
    variant: "Khaki · XS–XL",
    slug: "classic-trench-coat",
    description: "The definitive trench coat in classic khaki. A wardrobe staple with impeccable structure and timeless appeal.",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "accessories",
  },
];

export default products;
