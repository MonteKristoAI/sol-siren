import type { Product } from "@/contexts/CartContext";

export type ProductCategory = "fur" | "leather" | "penny-lane-afghan" | "overcoat" | "apres-ski";

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
    id: "faye",
    name: "FAYE",
    variant: "Vintage 1970s Blonde Fox Fur Coat – The Faye",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("faye"),
    description: `A striking vintage fox fur coat from the 1970s in soft blonde tones with subtle darker tipping throughout the guard hairs. Designed with a dramatic shawl collar and full vertical pelts, the coat has a beautiful natural movement and plush texture that captures the glamour of the era.

The interior features traditional furrier hook-and-eye closures set along a reinforced suede placket, allowing the coat to close smoothly while maintaining a clean, elegant front. 

Fully lined in a light satin lining for comfortable wear.

An effortlessly luxurious vintage piece with timeless presence.

A garment with a past—ready for its next chapter.

• Vintage items may show minor wear consistent with age.

• Authentic vintage 

• Estimated era: 1970s

• Material: Fox 

• Lining: Satin 

• Closure: Traditional hidden furrier hook-and-eye closures set along a soft suede placket for a clean, seamless front 

• Length: Hip-length

Vintage items show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    category: "fur",
  },
  {
    id: "maggie",
    name: "MAGGIE",
    variant: "Vintage 1980s Faux Fur Coat – The Maggie",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("maggie"),
    description: `A beautifully textured vintage faux fur jacket in a luminous ivory tone with soft silver tipping throughout the pile, creating a subtle frosted effect that catches the light. The plush faux fur has a smooth, mink-like finish while remaining lightweight and easy to wear.

Designed with a classic shawl collar and an elegant hip-length silhouette, the coat drapes effortlessly when worn. Hidden furrier hook-and-eye closures along the front maintain a clean, uninterrupted line, allowing the texture of the faux fur to take center stage.

Fully lined in satin and crafted in the United States, this piece captures the quiet glamour of late 1980s eveningwear while remaining timeless enough for modern styling.

Vintage faux fur coats like this offer the look and warmth of classic fur while remaining soft, comfortable, and versatile.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1980s 

• Material: Faux fur 

• Color: Soft ivory with silver tipping 

• Lining: Satin 

• Closure: Hidden hook-and-eye closures 

• Length: Hip-length

Vintage garments may show minor wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    category: "fur",
  },
  {
    id: "annette",
    name: "ANNETTE",
    variant: "Vintage 1970s Tissavel Luxury Faux Mink Coat – The Annette",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("annette"),
    description: `A striking vintage luxury faux fur coat by Tissavel, the renowned French maker celebrated for producing some of the finest faux furs of the late 1960s and early 1970s. Crafted in a deep espresso faux mink with a soft, luminous pile, this piece captures the effortless glamour of the era.

Designed with a sculptural shawl collar and an elegant open front, the coat drapes beautifully through the body, creating a relaxed yet refined silhouette. The interior is finished with a satin jacquard lining woven with subtle florals and the original Tissavel label reading "Genuine Simulation – France French Fur."

Timeless, tactile, and quietly dramatic.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: mid 1970s 

• Material: Acrylic pile faux with cotton backing 

• Color: Mink brown 

• Lining: Satin 

• Closure: Open front 

• Length: Mid-thigh

Vintage items show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    category: "fur",
  },
  {
    id: "renate",
    name: "RENATE",
    variant: "Vintage 1970s Tissavel Luxury Faux Mink Coat – The Renate",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("renate"),
    description: `A beautifully tailored vintage faux mink coat crafted from luxurious Tissavel material. Designed in New York and made in the USA, this piece reflects the elegance of late-1960s outerwear with its soft swing silhouette and sculptural shawl collar.

The plush acrylic pile mimics the look and feel of mink while offering a lightweight, cruelty-free alternative. Inside, the coat is finished with a golden floral jacquard lining.

A single statement button at the neckline and discreet interior hook closures allow the coat to drape effortlessly.

Timeless, polished, and endlessly wearable.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1970s 

• Material: Acrylic faux mink 

• Color: Warm mink brown 

• Lining: Satin 

• Closure: Button + hook closures 

• Length: Mid-calf

Vintage garments show minor wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    category: "fur",
  },
  {
    id: "margaret",
    name: "MARGARET",
    variant: "Vintage 1970s Tissavel Luxury Faux Fur Shawl Collar Coat – The Margaret",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("margaret"),
    description: `A luxurious faux fur coat crafted with Tissavel fabric, one of France's most renowned producers of high quality synthetic fur.

Designed in a soft taupe mink tone, the plush acrylic pile creates the texture of natural fur while maintaining lightweight comfort. The coat features a dramatic shawl collar that frames the neckline and adds volume through the shoulders.

Cut in a long, clean silhouette, the coat drapes beautifully when worn open or closed. The satin lining allows it to layer effortlessly over knits or tailoring, making it a versatile cold-weather statement piece.

A striking example of late 1960s glamour and early faux-fur innovation.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1960s 

• Material: Acrylic faux fur 

• Color: Taupe mink tone 

• Lining: Satin 

• Closure: Open front 

• Length: Mid-calf

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    category: "fur",
  },
];

export default products;
