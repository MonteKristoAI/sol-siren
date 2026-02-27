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
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80&auto=format&fit=crop",
    variant: "Ivory · S–L",
    slug: "linen-wrap-blouse",
    description: "A breezy linen blouse with a flattering wrap silhouette. Effortlessly transitions from day to evening with understated elegance.",
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["S", "M", "L"],
    category: "women",
  },
  {
    id: "2",
    name: "Male Jeans",
    price: 92,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop",
    variant: "Sand · XS–M",
    slug: "male-jeans",
    description: "Relaxed fit jeans in a warm sand tone. Crafted for movement and comfort without sacrificing a polished look.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop&blur=2",
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
    name: "Classic Polo Shirt",
    price: 128,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80&auto=format&fit=crop",
    variant: "Black · XS–L",
    slug: "classic-polo-shirt",
    description: "A refined polo shirt in timeless black. Minimal, versatile, and designed for everyday wear.",
    images: [
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "men",
  },
  {
    id: "8",
    name: "Gold Chain Necklace",
    price: 98,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop",
    variant: "Gold · One Size",
    slug: "gold-chain-necklace",
    description: "A delicate gold chain necklace with timeless appeal. The perfect finishing touch for any outfit.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["One Size"],
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
    name: "Leather Crossbody Bag",
    price: 88,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop",
    variant: "Tan · One Size",
    slug: "leather-crossbody-bag",
    description: "A compact leather crossbody bag in warm tan. Functional elegance for everyday essentials.",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["One Size"],
    category: "accessories",
  },
  {
    id: "12",
    name: "Vintage Sunglasses",
    price: 195,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format&fit=crop",
    variant: "Tortoise · One Size",
    slug: "vintage-sunglasses",
    description: "Retro-inspired sunglasses in classic tortoise. UV protection with unmistakable vintage character.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format&fit=crop&sat=-100",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format&fit=crop&blur=2",
    ],
    sizes: ["One Size"],
    category: "accessories",
  },
];

export default products;
