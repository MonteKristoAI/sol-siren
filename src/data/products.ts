import type { Product } from "@/contexts/CartContext";

export type ProductCategory = "fur" | "leather" | "penny-lane-afghan" | "overcoat" | "apres-ski";

export interface SizeFit {
  modernSize: string;
  measurements: {
    shoulder: string;
    bust: string;
    sleeve: string;
    length: string;
  };
  fitDescription: string;
}

export interface ProductDetails {
  material?: string;
  color?: string;
  lining?: string;
  closure?: string;
  length?: string;
  era?: string;
  fit?: string;
}

export interface ProductWithSlug extends Product {
  slug: string;
  description: string;
  images: string[];
  sizes: string[];
  category: ProductCategory;
  sizeFit: SizeFit;
  careInstructions: string[];
  productDetails: ProductDetails;
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
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1970s`,
      material: `Fox`,
      lining: `Satin`,
      closure: `Traditional hidden furrier hook-and-eye closures set along a soft suede placket for a clean, seamless front`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
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
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1980s`,
      material: `Faux fur`,
      color: `Soft ivory with silver tipping`,
      lining: `Satin`,
      closure: `Hidden hook-and-eye closures`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
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
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `mid 1970s`,
      material: `Acrylic pile faux with cotton backing`,
      color: `Mink brown`,
      lining: `Satin`,
      closure: `Open front`,
      length: `Mid-thigh`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
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
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1970s`,
      material: `Acrylic faux mink`,
      color: `Warm mink brown`,
      lining: `Satin`,
      closure: `Button + hook closures`,
      length: `Mid-calf`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
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
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1960s`,
      material: `Acrylic faux fur`,
      color: `Taupe mink tone`,
      lining: `Satin`,
      closure: `Open front`,
      length: `Mid-calf`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "madge",
    name: "MADGE",
    variant: "Vintage 1960s Monterey Ridge White Faux Fur Coat - The Madge",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("madge"),
    description: `A dreamy vintage faux fur coat in the softest icy silver tone, made by Intrigue for Monterey Mills. This piece has all the drama of classic fur styling with the practicality of a luxury synthetic fabric, creating a look that feels both glamorous and easy to wear.

The faux fur has beautiful tonal variation throughout, blending pale silver, dove gray, and soft pearl hues for a dimensional finish. Cut in a hip-length silhouette, it features a plush, sculptural shape with a full, cozy feel through the body and sleeves. The front is finished with hidden closures for a clean, seamless look, while the interior is lined in a silky branded satin.

A striking vintage statement coat that feels equal parts après-ski, old Hollywood, and 1970s winter glamour.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s-Early 1970s 

• Material: Faux fur 

• Color: Icy silver tone/white. 

• Lining: Satin 

• Length: Hip

• Closure: Hidden eye-hook closures along front

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s-Early 1970s`,
      material: `Faux fur`,
      color: `Icy silver tone/white.`,
      lining: `Satin`,
      closure: `Hidden eye-hook closures along front`,
      length: `Hip`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "lucy",
    name: "LUCY",
    variant: "Vintage 1960s London Faux Fur & Suede Swing Coat by Lilli Ann – The Lucy",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("lucy"),
    description: `A striking vintage coat from the London line of the iconic Lilli Ann label, crafted in England during the late 1960s.

This piece combines supple suede with plush faux fur panels that run vertically through the body, creating a beautiful texture and movement when worn. The wide fur collar frames the neckline while the soft swing silhouette gives the coat an effortless drape.

A coordinating suede belt threads through metal ring hardware, allowing the coat to be worn open and relaxed or softly cinched at the waist. The interior is finished with a smooth satin lining for comfortable layering.

A perfect example of the mod-influenced London outerwear that defined the era.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1960s 

• Material: Suede leather 

• Color: Camel suede with honey faux suede

• Lining: Satin 

• Length: Above the knee

• Closure: Metal ring belt closures.

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1960s`,
      material: `Suede leather`,
      color: `Camel suede with honey faux suede`,
      lining: `Satin`,
      closure: `Metal ring belt closures.`,
      length: `Above the knee`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "roberta",
    name: "ROBERTA",
    variant: "Vintage 1960s Ivory Mink Fur Coat with Leather Belt – The Roberta",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("roberta"),
    description: `A luminous vintage mink coat in a soft ivory hue, featuring a sweeping shawl collar and elegant belted silhouette. The coat is crafted from supple mink pelts that create a smooth, velvety surface and graceful drape through the body.

An original leather belt cinches the waist, allowing the coat to be worn tied for a more defined shape or left open for an effortless, relaxed look. The dramatic shawl collar frames the neckline beautifully and adds a touch of classic mid-century glamour.

Inside, the satin lining carries a delicate embroidery reading Roberta Rossi, the name of the coat's original owner — a charming detail that reflects the tradition of custom fur salon pieces.

A timeless winter coat that captures the elegance of vintage luxury.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1960s

• Material: Mink 

• Color: Ivory

• Lining: Satin lining with custom monogram for the original owner, Roberta Rossi. 

• Closure: Multiple hidden classic hook-and-eye closures along the front as well as original removable ivory leather belt.

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1960s`,
      material: `Mink`,
      color: `Ivory`,
      lining: `Satin lining with custom monogram for the original owner, Roberta Rossi.`,
      closure: `Multiple hidden classic hook-and-eye closures along the front as well as original removable ivory leather belt.`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "nk",
    name: "N.K.",
    variant: "Vintage 1960s Ivory Curly Lamb Fur Jacket – The Nova",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("nk"),
    description: `A striking piece from the late 1960s, this vintage jacket is crafted from soft ivory curly lamb fur, known for its romantic ringlet texture and cloud-like movement. The dense curls create beautiful natural volume, giving the coat an unmistakably glamorous silhouette.

The silhouette falls at an easy hip length, making it a versatile piece that pairs effortlessly with denim, dresses or tailored trousers.

At the front, the coat fastens with faux horn toggle closures, subtly tucked within the curls of the lamb fur.

Inside, the coat is finished with a satin lining and retains its original label.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1960s

• Material: Ivory curly lamb fur 

• Lining: Satin 

• Closure: Faux horn toggles 

• Length: Mid-thigh

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1960s`,
      material: `Ivory curly lamb fur`,
      lining: `Satin`,
      closure: `Faux horn toggles`,
      length: `Mid-thigh`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "carol",
    name: "CAROL",
    variant: "Vintage 1970s Blonde Fox Fur & Leather Panel Coat – The Carol",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("carol"),
    description: `A striking vintage fox fur coat in a soft blonde champagne tone, designed with leather panel construction that adds beautiful movement and shape to the silhouette. The plush shawl collar frames the neckline, while the wrap-style leather waist tie allows the coat to be worn loosely draped or cinched for a more defined look.

Alternating fur and leather panels create subtle vertical texture and fluidity, resulting in a piece that feels both glamorous and effortless.

Inside, the satin lining is embroidered with the name Carol, a charming detail from the coat's original owner.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1970s

• Material: Fox fur, leather panel construction 

• Color: Blonde/champagne fur, saddle brown leather paneling 

• Lining: Satin lining with custom monogram 

• Length: Above the knee 

• Closure: Removable leather wrap-style waist tie

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1970s`,
      material: `Fox fur, leather panel construction`,
      color: `Blonde/champagne fur, saddle brown leather paneling`,
      lining: `Satin lining with custom monogram`,
      closure: `Removable leather wrap-style waist tie`,
      length: `Above the knee`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "roxanne",
    name: "ROXANNE",
    variant: "Vintage 1970s Suede & Fur Belted Penny Lane Coat – The Roxanne",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("roxanne"),
    description: `A striking 1970s suede coat by Dan Di Modes, designed with a sculpted silhouette and dramatic fur trim that captures the effortless glamour of the era.

Cut from supple tobacco brown suede, the coat features an oversized shawl collar and hem trimmed in plush fur that adds warmth, movement, and texture. The tailored body is shaped with princess seams for a flattering fit, while a matching suede belt cinches the waist.

Suede-covered buttons run down the front beneath the sweeping collar, maintaining the coat's clean lines.

A timeless vintage coat with unmistakable seventies attitude.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s – Early 1970s 

• Material: Fur trim shawl collar & hem trim. Suede outer shell 

• Color: Tobacco brown 

• Lining: Satin 

• Closure: Buttons + waist belt 

• Length: Mid-thigh-knee length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s – Early 1970s`,
      material: `Fur trim shawl collar & hem trim. Suede outer shell`,
      color: `Tobacco brown`,
      lining: `Satin`,
      closure: `Buttons + waist belt`,
      length: `Mid-thigh-knee length`,
    },
    careInstructions: [
      "Professional suede specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a suede brush to maintain nap and remove surface dust",
      "Specialist suede cleaning recommended for stains or wear",
    ],
    category: "penny-lane-afghan",
  },
  {
    id: "sybil",
    name: "SYBIL",
    variant: "Vintage Penny Lane Style Faux Suede Shearling Coat – The Sybil",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("sybil"),
    description: `A modern revival of an iconic 1970s silhouette.

This Penny Lane–inspired coat is crafted in soft camel microfiber faux suede and finished with plush cream faux shearling trim along the oversized shawl collar and hem.

Princess seams shape the body, while the original belt cinches the waist.

Inspired by the legendary coats worn by rock-and-roll muses of the 1970s.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s – Early 1970s 

• Material: Faux suede + faux shearling 

• Color: Camel with cream shearling 

• Lining: Satin 

• Closure: Belt 

• Length: Mid-thigh

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s – Early 1970s`,
      material: `Faux suede + faux shearling`,
      color: `Camel with cream shearling`,
      lining: `Satin`,
      closure: `Belt`,
      length: `Mid-thigh`,
    },
    careInstructions: [
      "Professional suede specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a suede brush to maintain nap and remove surface dust",
      "Specialist suede cleaning recommended for stains or wear",
    ],
    category: "penny-lane-afghan",
  },
  {
    id: "frankie",
    name: "FRANKIE",
    variant: "Vintage 1970s Suede Penny Lane Coat with Shearling Trim – The Frankie",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("frankie"),
    description: `A striking vintage suede coat in a rich earthy brown tone, capturing the effortless spirit of 1970s outerwear.

The exterior is crafted from supple suede with curly lamb shearling trim along the front opening and hemline.

The front closes with corded loop closures, a classic vintage detail.

Simple, timeless, and endlessly wearable.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s – Early 1970s 

• Material: Suede + shearling trim 

• Color: Tobacco brown 

• Lining: Satin 

• Closure: Loop closures 

• Length: Knee length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s – Early 1970s`,
      material: `Suede + shearling trim`,
      color: `Tobacco brown`,
      lining: `Satin`,
      closure: `Loop closures`,
      length: `Knee length`,
    },
    careInstructions: [
      "Professional suede specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a suede brush to maintain nap and remove surface dust",
      "Specialist suede cleaning recommended for stains or wear",
    ],
    category: "penny-lane-afghan",
  },
  {
    id: "kate",
    name: "KATE",
    variant: "Vintage 1960s Penny Lane Coat with Shearling Trim – The Kate",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("kate"),
    description: `A striking vintage suede coat inspired by iconic Penny Lane silhouettes.

Crafted in warm golden suede and framed with plush shearling trim.

The dramatic shawl collar flows into a full shearling front panel, creating texture and warmth.

A true statement coat.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s – Early 1970s 

• Material: Suede + shearling 

• Color: Golden suede with cream shearling 

• Lining: Satin 

• Closure: Hook-and-eye 

• Length: Knee length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s – Early 1970s`,
      material: `Suede + shearling`,
      color: `Golden suede with cream shearling`,
      lining: `Satin`,
      closure: `Hook-and-eye`,
      length: `Knee length`,
    },
    careInstructions: [
      "Professional suede specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a suede brush to maintain nap and remove surface dust",
      "Specialist suede cleaning recommended for stains or wear",
    ],
    category: "penny-lane-afghan",
  },
  {
    id: "topanga",
    name: "TOPANGA",
    variant: "Vintage 1960s Penny Lane Coat with Shearling Trim – The Topanga",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("topanga"),
    description: `A striking vintage suede coat inspired by the iconic Penny Lane silhouettes of the late 1960s and early 1970s.

The dramatic shawl collar flows into a full shearling front panel.

The coat is designed to wear open or lightly closed with hidden hook and eye closures.

A true statement vintage piece.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s – Early 1970s 

• Material: Suede + shearling 

• Color: Golden suede 

• Lining: Satin 

• Closure: Hook closures 

• Length: Knee length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s – Early 1970s`,
      material: `Suede + shearling`,
      color: `Golden suede`,
      lining: `Satin`,
      closure: `Hook closures`,
      length: `Knee length`,
    },
    careInstructions: [
      "Professional suede specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a suede brush to maintain nap and remove surface dust",
      "Specialist suede cleaning recommended for stains or wear",
    ],
    category: "penny-lane-afghan",
  },
  {
    id: "emmylou",
    name: "EMMYLOU",
    variant: "Vintage 1970s Suede Leather Coat – The Emmylou",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("emmylou"),
    description: `A beautifully tailored vintage suede leather coat from Split End Ltd., capturing the rich textures and Western-inspired styling that defined late-1970s fashion.

Crafted from soft saddle-tan suede, the coat is framed with deep chocolate leather trim along the collar, front placket, cuffs, and pockets. A sculpted Western-style yoke sweeps across the shoulders and chest.

The wide collar creates a dramatic neckline, while the original self belt allows the waist to be cinched or worn loose.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1970s 

• Material: 100% leather 

• Color: Saddle tan with chocolate trim 

• Lining: Satin 

• Closure: Belt 

• Length: Hip-length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1970s`,
      material: `100% leather`,
      color: `Saddle tan with chocolate trim`,
      lining: `Satin`,
      closure: `Belt`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional leather specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Condition leather periodically with a quality leather conditioner",
      "Specialist leather cleaning recommended for stains or wear",
    ],
    category: "leather",
  },
  {
    id: "stevie",
    name: "STEVIE",
    variant: "Vintage 1990s Black Leather Fringe Jacket – The Stevie",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("stevie"),
    description: `A striking black leather fringe jacket by Wilsons Leather Maxima, designed with dramatic movement and unmistakable western spirit.

Crafted from soft suede leather, the jacket features sweeping fringe that cascades from the collar and along the front opening.

Additional fringe at the hem and sleeves enhances the silhouette, giving the piece a bold vintage presence.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1990s 

• Material: Genuine leather 

• Color: Black 

• Lining: Satin 

• Closure: Hidden hook closure 

• Length: Hip-length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "S/M",
      measurements: {
        shoulder: `16"`,
        bust: `36"`,
        sleeve: `24"`,
        length: `28"`,
      },
      fitDescription: "Cut in a lightly tailored silhouette designed to follow the shape of the body without feeling restrictive. The open neckline creates a dramatic V shape, while the fringe detailing adds movement and visual texture. Marked size Small.",
    },
    productDetails: {
      era: `Late 1990s`,
      material: `Genuine leather`,
      color: `Black`,
      lining: `Satin`,
      closure: `Hidden hook closure`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional leather specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Condition leather periodically with a quality leather conditioner",
      "Specialist leather cleaning recommended for stains or wear",
    ],
    category: "leather",
  },
  {
    id: "sierra",
    name: "SIERRA",
    variant: "Vintage 1970s Frontier Fringe Suede Jacket – The Sierra",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("sierra"),
    description: `A true piece of classic American Western style.

This vintage suede jacket by Sears Western Wear captures the rugged frontier spirit of the 1970s.

Crafted from rich brown suede and trimmed with dramatic fringe across the chest, back, sleeves, and hem.

Features a removable faux shearling lining for added warmth.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1970s 

• Material: Genuine leather 

• Color: Medium brown 

• Lining: Removable shearling lining 

• Closure: Button 

• Length: Hip-length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M-L (oversized fit) / Men's M",
      measurements: {
        shoulder: `24"`,
        bust: `44"`,
        sleeve: `24"`,
        length: `24"`,
      },
      fitDescription: "Originally designed as a men's Western jacket, this piece translates beautifully today as a relaxed, slightly oversized silhouette when worn by women. Vintage tagged 42 Regular.",
    },
    productDetails: {
      era: `1970s`,
      material: `Genuine leather`,
      color: `Medium brown`,
      lining: `Removable shearling lining`,
      closure: `Button`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional leather specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Condition leather periodically with a quality leather conditioner",
      "Specialist leather cleaning recommended for stains or wear",
    ],
    category: "leather",
  },
  {
    id: "vixen",
    name: "VIXEN",
    variant: "Vintage 1980s Bearskin Fringe Leather Jacket – The Vixen",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("vixen"),
    description: `A striking vintage leather jacket crafted from sueded boarskin, featuring bold black-on-black design and dramatic fringe along the sleeves.

The sculptural leather panels create strong visual impact, while long fringe adds movement and texture.

Finished with a zip front closure and elasticized waistband.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1980s 

• Material: Leather 

• Color: Black 

• Lining: Unlined 

• Closure: Zip 

• Length: Hip-length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1980s`,
      material: `Leather`,
      color: `Black`,
      lining: `Unlined`,
      closure: `Zip`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional leather specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Condition leather periodically with a quality leather conditioner",
      "Specialist leather cleaning recommended for stains or wear",
    ],
    category: "leather",
  },
  {
    id: "cleo",
    name: "CLEO",
    variant: "Vintage 1970s Long Leather Wrap Coat – The Cleo",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("cleo"),
    description: `A striking vintage 1970s leather wrap coat in a rich shade of golden caramel.

Crafted from supple leather that drapes beautifully, this piece ties at the waist with its original belt.

A wide shawl collar frames the neckline, while oversized curved patch pockets add both function and style.

The leather has developed a beautiful patina over time.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1970s 

• Material: Genuine leather 

• Color: Golden caramel 

• Lining: Satin 

• Closure: Wrap belt 

• Length: Full-length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1970s`,
      material: `Genuine leather`,
      color: `Golden caramel`,
      lining: `Satin`,
      closure: `Wrap belt`,
      length: `Full-length`,
    },
    careInstructions: [
      "Professional leather specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Condition leather periodically with a quality leather conditioner",
      "Specialist leather cleaning recommended for stains or wear",
    ],
    category: "leather",
  },
  {
    id: "candace",
    name: "CANDACE",
    variant: "Vintage 1970s Short Plaid Fur Trim Coat – The Candace",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("candace"),
    description: `A beautiful hooded vintage plaid coat that captures the cozy spirit of 1970s winter style.

Crafted in a rich earth-tone plaid of camel, rust, navy, and chocolate, this piece blends classic American outerwear with dramatic faux fur trim along the hood and cuffs.

The coat offers warmth while maintaining a bold vintage aesthetic, making it a standout winter layering piece.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1970s 

• Material: Wool blend with faux fur trim 

• Color: Multi-tone earth plaid 

• Lining: Satin 

• Closure: Front button 

• Length: Short coat

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1970s`,
      material: `Wool blend with faux fur trim`,
      color: `Multi-tone earth plaid`,
      lining: `Satin`,
      closure: `Front button`,
      length: `Short coat`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a lint roller or soft brush to remove surface dust",
      "Specialist cleaning recommended where applicable",
    ],
    category: "overcoat",
  },
  {
    id: "aspen",
    name: "ASPEN",
    variant: "Vintage 1970s Suede & Shearling Ranch Coat – The Aspen",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("aspen"),
    description: `A striking vintage suede Ranch Coat from the late 1960s to early 1970s, featuring a dramatic shearling-style collar and plush interior lining.

Crafted in rich chocolate brown suede, this full-length coat features an oversized shawl collar trimmed in thick shearling-style pile.

The interior is lined in dense mouton-style faux fur, creating a soft and cozy feel.

Western-inspired detailing adds contrast and character.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s-Early 1970s 

• Material: Suede leather exterior, faux fur lining 

• Color: Chocolate brown 

• Lining: Faux fur 

• Closure: Belt 

• Length: Full-length

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s-Early 1970s`,
      material: `Suede leather exterior, faux fur lining`,
      color: `Chocolate brown`,
      lining: `Faux fur`,
      closure: `Belt`,
      length: `Full-length`,
    },
    careInstructions: [
      "Professional suede specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Use a suede brush to maintain nap and remove surface dust",
      "Specialist suede cleaning recommended for stains or wear",
    ],
    category: "penny-lane-afghan",
  },
  {
    id: "simone",
    name: "SIMONE",
    variant: "Vintage 1940s Silver Fox Evening Stole – The Simone",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("simone"),
    description: `A striking vintage fox fur stole from the late 1940s-early 1950s, crafted in beautifully full silver fox fur.

Designed to drape elegantly around the shoulders, this piece creates a sculptural silhouette with incredible softness and volume.

Originally intended for evening wear, it can also be layered over coats for added drama and warmth.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: 1950s 

• Material: Silver fox 

• Color: Silver taupe 

• Closure: Hook 

• Fit: One size

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `1950s`,
      material: `Silver fox`,
      color: `Silver taupe`,
      closure: `Hook`,
      fit: `One size`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "margaux",
    name: "MARGAUX",
    variant: "Vintage 1950s Mink Capelet – The Margaux",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("margaux"),
    description: `A luminous vintage mink capelet crafted by Leafgren Fine Furs.

Cut in a graceful shoulder-length silhouette, this piece drapes elegantly across the upper body.

The mink is arranged in classic horizontal pelts, producing a soft, tiered texture.

A timeless vintage accessory that elevates any look.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1950s 

• Material: Mink 

• Color: Golden honey 

• Lining: Satin 

• Closure: Hook 

• Fit: One size

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["One Size"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1950s`,
      material: `Mink`,
      color: `Golden honey`,
      lining: `Satin`,
      closure: `Hook`,
      fit: `One size`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
  {
    id: "janis",
    name: "JANIS",
    variant: "Vintage 1970s Tibetan Lamb Fur Jacket – The Janis",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("janis"),
    description: `A dreamy 1970s curly Tibetan/Mongolian lamb jacket in a beautiful natural tonal variation.

The airy corkscrew curls create softness and dramatic texture, while the cropped silhouette gives it a modern feel.

The open front design allows the curls to frame the body naturally.

A timeless vintage piece that feels both bohemian and luxurious.

A garment with a past—ready for its next chapter.

• Authentic vintage 

• Estimated era: Late 1960s – Early 1970s 

• Material: Tibetan/Mongolian lamb 

• Color: Ivory with champagne tones 

• Lining: Satin 

• Closure: Hook closures 

• Length: Cropped

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "TBD",
      measurements: {
        shoulder: "TBD",
        bust: "TBD",
        sleeve: "TBD",
        length: "TBD",
      },
      fitDescription: "TBD",
    },
    productDetails: {
      era: `Late 1960s – Early 1970s`,
      material: `Tibetan/Mongolian lamb`,
      color: `Ivory with champagne tones`,
      lining: `Satin`,
      closure: `Hook closures`,
      length: `Cropped`,
    },
    careInstructions: [
      "Professional fur specialist dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
      "Do not crush or compress — allow fur to breathe",
      "Specialist fur cold storage recommended during off-season",
    ],
    category: "fur",
  },
];

export default products;
