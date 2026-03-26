import type { Product } from "@/contexts/CartContext";
import fayeFront from "@/assets/products/faye/faye-front.png";
import fayeCollar from "@/assets/products/faye/faye-collar.png";
import fayeClosure from "@/assets/products/faye/faye-closure.png";
import fayeDetail from "@/assets/products/faye/faye-detail.png";
import fayeBack from "@/assets/products/faye/faye-back.png";
import fayeShoulder from "@/assets/products/faye/faye-shoulder.png";
import roccoFront from "@/assets/products/rocco-front.webp";
import roccoBack from "@/assets/products/rocco-back.webp";
import roccoDetails from "@/assets/products/rocco-details.webp";
import roccoLogo from "@/assets/products/rocco-logo.webp";
import roccoLabel from "@/assets/products/rocco-label.webp";
import sloaneFront from "@/assets/products/sloane-front.webp";
import sloaneDetails from "@/assets/products/sloane-details.webp";
import sloaneHanger from "@/assets/products/sloane-hanger.webp";
import romyFront from "@/assets/products/romy-front.webp";
import romyDetails from "@/assets/products/romy-details.webp";
import romyBack from "@/assets/products/romy-back.webp";
import romyPocket from "@/assets/products/romy-pocket.webp";
import andieFront from "@/assets/products/andie-front.webp";
import andieLabel from "@/assets/products/andie-label.webp";
import annetteFront from "@/assets/products/annette/annette-front.png";
import annetteBack from "@/assets/products/annette/annette-back.png";
import annetteCollar from "@/assets/products/annette/annette-collar.png";
import renateFront from "@/assets/products/renate/renate-front.png";
import renateBack from "@/assets/products/renate/renate-back.png";
import renateCollar from "@/assets/products/renate/renate-collar.png";
import renateShoulder from "@/assets/products/renate/renate-shoulder.png";
import renateLining from "@/assets/products/renate/renate-lining.png";
import renateLabel from "@/assets/products/renate/renate-label.png";
import margaretFront from "@/assets/products/margaret/margaret-front.png";
import margaretBack from "@/assets/products/margaret/margaret-back.png";
import margaretCollar from "@/assets/products/margaret/margaret-collar.png";
import margaretLabel from "@/assets/products/margaret/margaret-label.png";
import margaretLining from "@/assets/products/margaret/margaret-lining.png";
import madgeFront from "@/assets/products/madge/madge-front.png";
import madgeBack from "@/assets/products/madge/madge-back.jpeg";
import carolFront from "@/assets/products/carol/carol-front.png";
import carolCollar from "@/assets/products/carol/carol-collar.png";
import lucyFront from "@/assets/products/lucy/lucy-front.png";
import lucyBack from "@/assets/products/lucy/lucy-back.png";
import lucyCollar from "@/assets/products/lucy/lucy-collar.png";
import lucyBackDetail from "@/assets/products/lucy/lucy-back-detail.png";
import lucyBeltDetail from "@/assets/products/lucy/lucy-belt-detail.png";
import lucyAltFront from "@/assets/products/lucy/lucy-alt-front.png";
import robertaFront from "@/assets/products/roberta/roberta-front.png";
import robertaAngle from "@/assets/products/roberta/roberta-angle.png";
import robertaShoulderDetail from "@/assets/products/roberta/roberta-shoulder-detail.png";
import robertaBeltDetail from "@/assets/products/roberta/roberta-belt-detail.png";
import robertaAltBelt from "@/assets/products/roberta/roberta-alt-belt.png";
import maggieFront from "@/assets/products/maggie/maggie-front.png";
import maggieBack from "@/assets/products/maggie/maggie-back.png";
import maggieAngleLeft from "@/assets/products/maggie/maggie-angle-left.png";
import maggieAngleRight from "@/assets/products/maggie/maggie-angle-right.png";
import maggieShoulderDetail from "@/assets/products/maggie/maggie-shoulder-detail.png";
import maggieFrontDetail from "@/assets/products/maggie/maggie-front-detail.png";
import andieDetails from "@/assets/products/andie-details.webp";
import andieBack from "@/assets/products/andie-back.webp";
import andieVest from "@/assets/products/andie-vest.webp";
import andieVestDetails from "@/assets/products/andie-vest-details.webp";
import moniqueFrontJacket from "@/assets/products/monique-front-jacket.webp";
import moniqueBackVest from "@/assets/products/monique-back-vest.webp";
import moniqueSideVest from "@/assets/products/monique-side-vest.webp";
import moniqueBackJacket from "@/assets/products/monique-back-jacket.webp";
import moniqueSideJacketClose from "@/assets/products/monique-side-jacket-close.webp";
import moniqueAngleJacket from "@/assets/products/monique-angle-jacket.webp";
import auroraVest from "@/assets/products/aurora-vest.webp";
import auroraLining from "@/assets/products/aurora-lining.webp";
import auroraDetails from "@/assets/products/aurora-details.webp";
import auroraJacket from "@/assets/products/aurora-jacket.webp";
import auroraFront from "@/assets/products/aurora-front.webp";
import auroraCollar from "@/assets/products/aurora-collar.webp";
import madelineFront from "@/assets/products/madeline/madeline-front.png";
import madelineBack from "@/assets/products/madeline/madeline-back.png";
import madelineBack2 from "@/assets/products/madeline/madeline-back-2.png";
import madelineCollar from "@/assets/products/madeline/madeline-collar.png";
import madelineLabel from "@/assets/products/madeline/madeline-label.png";
import madelineTag from "@/assets/products/madeline/madeline-tag.png";

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
    image: fayeFront,
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
    images: [fayeFront, fayeBack, fayeCollar, fayeDetail, fayeClosure, fayeShoulder],
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
    image: maggieFront,
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
    images: [maggieFront, maggieBack, maggieAngleLeft, maggieAngleRight, maggieShoulderDetail, maggieFrontDetail],
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
    image: annetteFront,
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
    images: [annetteFront, annetteBack, annetteCollar],
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
    image: renateFront,
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
    images: [renateFront, renateBack, renateCollar, renateShoulder, renateLining, renateLabel],
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
    image: margaretFront,
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
    images: [margaretFront, margaretBack, margaretCollar, margaretLabel, margaretLining],
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
    image: madgeFront,
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
    images: [madgeFront, madgeBack],
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
    image: lucyFront,
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
    images: [lucyFront, lucyBack, lucyCollar, lucyBackDetail, lucyBeltDetail, lucyAltFront],
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
    image: robertaFront,
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
    images: [robertaFront, robertaAngle, robertaShoulderDetail, robertaBeltDetail, robertaAltBelt],
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
    image: carolFront,
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
    images: [carolFront, carolCollar],
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
      modernSize: "Women's L (oversized fit) / Men's M",
      measurements: {
        shoulder: `20"`,
        bust: `46"`,
        sleeve: `24"`,
        length: `24"`,
      },
      fitDescription: "Originally labeled a Men's Jacket, this piece can easily be styled as an oversized or relaxed fit. Features structured shoulders, room through the body for layering, and an elasticized waist creating a subtle blouson shape.",
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
      modernSize: "Women's L/XL",
      measurements: {
        shoulder: `20"`,
        bust: `40"`,
        sleeve: `24"`,
        length: `46"`,
      },
      fitDescription: "Designed with a relaxed wrap silhouette that allows the fit to be adjusted with the belt.",
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
      modernSize: "S (US 4-6)",
      measurements: {
        shoulder: `16"`,
        bust: `36"`,
        sleeve: `22"`,
        length: `38"`,
      },
      fitDescription: "Designed with a fitted waist and gently flared skirt for a classic feminine silhouette. The sleeves allow room for layering while the belt defines the waist.",
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
  {
    id: "elvira",
    name: "ELVIRA",
    variant: "Vintage 1970s Lilli Ann Faux Fur & Leather Belted Coat – The Elvira",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("elvira"),
    description: `A striking vintage coat from legendary San Francisco fashion house Lilli Ann, known for producing some of the most beautifully tailored outerwear of the mid-century era.

This piece blends plush faux sheared mink with smooth white leather panels, creating a sculptural silhouette that feels both luxurious and modern. The dramatic faux fox fur shawl collar frames the neckline and adds rich texture, while the leather belt defines the waist for an elegant shape.

The contrast of soft fur against sleek leather makes this coat particularly special — a design detail seen in higher-end coats of the late 1960s and early 1970s.

Fully lined in satin, this coat is warm yet refined, designed to be both functional and statement-making.

This coat is in pristine condition.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1970s

• Material: Luxury plush faux fur with leather paneling

• Lining: Satin

• Length: Mid-thigh

• Closure: Leather wrap belt

• Tags read: Lilli Ann San Francisco

• Made in England

Vintage items may show minor wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "XS/S (US 2-4)",
      measurements: {
        shoulder: `17"`,
        bust: `34"`,
        sleeve: `22"`,
        length: `30"`,
      },
      fitDescription: "Designed with a softly structured silhouette that follows the body while allowing comfortable layering underneath. The wide shawl collar frames the shoulders beautifully, while the belt allows the waist to be cinched or worn open for a relaxed drape.",
    },
    productDetails: {
      era: `1970s`,
      material: `Luxury plush faux fur with leather paneling`,
      lining: `Satin`,
      closure: `Leather wrap belt`,
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
    id: "collette",
    name: "COLLETTE",
    variant: "Vintage 1970s English Suede & Lamb Fur Penny Lane Belted Coat – The Collette",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("collette"),
    description: `A beautifully tailored vintage suede coat crafted in England, featuring a dramatic oversized lamb fur collar that frames the neckline with soft volume and warmth. The body is cut from supple dyed suede in a warm sand-taupe tone, accented with subtle honey-toned leather piping that traces the seams and pockets for a refined, textural contrast.

The silhouette is softly structured with princess seaming through the back and a matching suede belt that cinches the waist for a flattering shape. Patch pockets with decorative tab details and adjustable cuff straps add thoughtful finishing touches.

The interior is lined in smooth rayon satin for comfortable layering.

The generous fur shawl collar gives the coat its unmistakable 1970s presence — both elegant and effortlessly relaxed.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1970s

• Material: Suede lamb exterior with lamb fur shawl collar. Honey leather piping trim.

• Color: Warm golden suede. Buttercream shearling.

• Lining: Rayon satin

• Closure: Belted waist with original suede tie

• Adjustable cuff straps

• Length: Mid-thigh

• Made in England

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Small (US 4-6)",
      measurements: {
        shoulder: `17"`,
        bust: `36"`,
        sleeve: `28"`,
        length: `34"`,
      },
      fitDescription: "Designed to be worn with light layering and cinched at the waist with the original belt.",
    },
    productDetails: {
      era: `1970s`,
      material: `Suede lamb exterior with lamb fur shawl collar. Honey leather piping trim.`,
      color: `Warm golden suede. Buttercream shearling.`,
      lining: `Rayon satin`,
      closure: `Belted waist with original suede tie`,
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
    id: "rhiannon",
    name: "RHIANNON",
    variant: "Vintage 1970s Short Suede Coat with Afghan Fur Collar – The Rhiannon",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("rhiannon"),
    description: `A warm desert-toned suede coat with unmistakable 1970s spirit.

This vintage suede jacket features a soft sand-colored leather body paired with a dramatic shag collar that frames the neckline beautifully. The coat's paneled construction and slightly flared hem give it that effortless Penny Lane / bohemian silhouette that defined so much of 70s outerwear.

Two large front patch pockets add both practicality and character, while the plush collar creates a cozy statement moment. The suede has developed a gentle vintage patina that gives the coat depth and personality.

The interior tag notes 100% leather with nylon lining and an original juniors size 5/6, a classic sizing system used in the 1970s.

This is the kind of piece that feels equally at home on a crisp autumn walk, layered over denim and boots, or styled as a statement vintage jacket.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1970s

• Material: Suede lamb exterior with faux plush lamb fur shawl collar

• Color: Warm desert sand suede paired with a honey-blonde shag collar

• Lining: Nylon satin

• Closure: The original belt and loops have been removed, creating a clean open-front silhouette

• Notable Wear: The original belt and loops have been removed, creating a clean open-front silhouette that drapes effortlessly when worn.

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "XS/S",
      measurements: {
        shoulder: `17"`,
        bust: `34"`,
        sleeve: `24"`,
        length: `28"`,
      },
      fitDescription: "Hip-length silhouette with structured shoulders. The original belt and loops have been removed, creating a clean open-front silhouette that drapes effortlessly when worn. Vintage juniors size 5/6, best suited for a modern XS (0–2) depending on desired fit.",
    },
    productDetails: {
      era: `1970s`,
      material: `Suede lamb exterior with faux plush lamb fur shawl collar`,
      color: `Warm desert sand suede paired with a honey-blonde shag collar`,
      lining: `Nylon satin`,
      closure: `Open front (original belt removed)`,
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
    id: "diana",
    name: "DIANA",
    variant: "Vintage 1970s Hooded Long Plaid Fur Trim Coat – The Diana",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("diana"),
    description: `A dramatic vintage hooded plaid coat that feels straight out of a winter lodge in the 1970s.

Cut in a long, belted silhouette, this piece is crafted from a soft brushed wool-blend plaid in warm tones of rust, dusty blue, cream, and golden beige. The coat is finished with plush shaggy faux fur trim along the hood and cuffs, creating a striking contrast against the classic plaid pattern.

The design features a tailored front with statement buttons and two decorative flap chest pockets that add structure to the look. A matching belt cinches the waist for shape, while the long length gives the coat a bold, elegant presence.

Inside, the coat is lined in a vibrant red satin that adds a beautiful pop of color when worn open.

This is the kind of vintage piece that instantly creates an outfit — dramatic, cozy, and unmistakably 70s.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1970s

• Material: Wool or wool-blend plaid exterior

• Color: Rust, dusty blue, cream, and warm beige plaid with ivory faux fur trim

• Lining: Red satin

• Closure: Button front closure with matching wrap belt

• Length: Full-length

• Made in USA

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "S (US 4-6)",
      measurements: {
        shoulder: `20"`,
        bust: `18"`,
        sleeve: `26"`,
        length: `45"`,
      },
      fitDescription: "Designed with a long, belted silhouette that can be worn cinched at the waist or left slightly relaxed. The structured shoulders and straight sleeves create a flattering tailored shape, while the length adds a dramatic vintage feel. The coat allows room for layering over sweaters or light knits.",
    },
    productDetails: {
      era: `1970s`,
      material: `Wool or wool-blend plaid exterior`,
      color: `Rust, dusty blue, cream, and warm beige plaid with ivory faux fur trim`,
      lining: `Red satin`,
      closure: `Button front closure with matching wrap belt`,
      length: `Full-length`,
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
    id: "bianca",
    name: "BIANCA",
    variant: "Vintage 1970s Long Wool Overcoat with Oversized Plush Faux Fur Collar – The Bianca",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("bianca"),
    description: `The Bianca winter coat is a beautifully dramatic vintage piece that captures the quiet glamour of cold-weather dressing in decades past.

Made by Youthcraft, a beloved American outerwear label known for its elegant wool coats throughout the 1960s through the 1980s, this piece reflects the brand's reputation for creating winter coats that were both practical and striking.

Cut in a long, graceful silhouette, the coat drapes smoothly from the shoulders before gathering softly at the waist with a self-tie belt. The oversized shawl collar is trimmed in plush ivory faux fur, creating a dramatic frame around the neckline and adding a touch of vintage winter glamour.

The exterior is crafted from a soft wool-blend fabric in a warm champagne oatmeal tone. Inside, a smooth blush champagne satin lining allows the coat to slip easily over layers while adding a subtle hint of vintage elegance.

Thoughtful details like fold-back cuffs, hidden front buttons, and the adjustable waist tie complete the design, creating a silhouette that can be worn cinched for a defined waist or relaxed for a softer drape.

Timeless, feminine, and unmistakably vintage.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s

• Material: Wool-blend exterior. Faux fur shawl collar

• Color: Blush champagne/Oatmeal exterior with ivory faux fur collar

• Lining: Satin

• Closure: Button front closure with matching wrap belt

• Length: Full-length

• Tags read: Youthcraft

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "S (US 4-6)",
      measurements: {
        shoulder: `18"`,
        bust: `36"`,
        sleeve: `26"`,
        length: `45"`,
      },
      fitDescription: "Designed with a belted waist and relaxed fit through the body, allowing room for layering while maintaining an elegant silhouette.",
    },
    productDetails: {
      era: `Late 1970s`,
      material: `Wool-blend exterior. Faux fur shawl collar`,
      color: `Blush champagne/Oatmeal exterior with ivory faux fur collar`,
      lining: `Satin`,
      closure: `Button front closure with matching wrap belt`,
      length: `Full-length`,
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
    id: "nico",
    name: "NICO",
    variant: "Vintage 1970s Burnt Orange Fur Trim Wool Coat – August Maxx – The Nico",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("nico"),
    description: `A striking vintage wool coat by August Max, rendered in a rich burnt orange tone reminiscent of autumn leaves and alpine sunsets. This beautifully tailored piece blends classic American wool craftsmanship with dramatic winter styling.

The coat is cut from all-pure wool fabric made in the USA, offering warmth and structure while maintaining a soft drape. A luxurious fur collar sweeps along the neckline, complemented by matching fur cuffs at the sleeves, creating a bold winter silhouette.

The interior is finished with smooth satin lining, allowing the coat to layer comfortably over sweaters or dresses.

The front closes with hidden buttons beneath a clean placket, while the original self-tie belt allows the waist to be cinched for a more defined shape or worn loosely for an effortless, relaxed look.

With its warm burnt orange hue and dramatic fur trim, this coat captures the spirit of vintage mountain lodge glamour — equal parts cozy and striking.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s–Early 1980s

• Material: Pure wool

• Color: Burnt Orange / Autumn Orange

• Lining: Satin

• Closure: Hidden button front closure with matching wrap belt

• Length: Full-length

• Tags read: August Max. The American Way With Wool

• Made in USA

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "S (US 4-6)",
      measurements: {
        shoulder: `18"`,
        bust: `36"`,
        sleeve: `26"`,
        length: `45"`,
      },
      fitDescription: "Cut with a structured shoulder and tailored body that creates a classic, feminine silhouette. The belt allows for flexibility in fit. The coat allows room for layering over sweaters or light knits.",
    },
    productDetails: {
      era: `Late 1970s–Early 1980s`,
      material: `Pure wool`,
      color: `Burnt Orange / Autumn Orange`,
      lining: `Satin`,
      closure: `Hidden button front closure with matching wrap belt`,
      length: `Full-length`,
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
    id: "roan",
    name: "ROAN",
    variant: "Vintage 1950s Oversized Wool Overcoat by Scot Isle – The Roan",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("roan"),
    description: `A beautifully tailored vintage overcoat crafted from 100% virgin wool by Scot-Isle. The fabric features a refined salt-and-pepper weave in charcoal and cream with subtle blue flecks, creating depth and texture while remaining timeless and versatile.

Cut in a classic mid-century silhouette, the coat features structured notched lapels, a single-breasted front, and a long straight fit designed to layer easily over sweaters or tailoring. A chest welt pocket and distinctive seam-set pockets with button detail add subtle character while maintaining the coat's clean, tailored look.

Inside, the coat is fully lined in smooth satin with an interior pocket for practicality.

The result is an effortless vintage staple — the kind of oversized coat that feels equally at home thrown over denim and boots or layered over more formal pieces.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1950s–Early 1960s

• Material: Pure wool

• Color: Charcoal, ivory, and soft blue salt-and-pepper weave

• Lining: Satin

• Closure: Three front buttons

• Length: Full-length

• Tags read: Scot-Isle

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's XL / Oversized fit (12-14) / Men's Large",
      measurements: {
        shoulder: `18"`,
        bust: `44"`,
        sleeve: `24"`,
        length: `43"`,
      },
      fitDescription: "Designed with a classic straight overcoat silhouette intended for layering. The shoulders have structure while the body falls cleanly through the length for an easy, tailored drape.",
    },
    productDetails: {
      era: `Late 1950s–Early 1960s`,
      material: `Pure wool`,
      color: `Charcoal, ivory, and soft blue salt-and-pepper weave`,
      lining: `Satin`,
      closure: `Three front buttons`,
      length: `Full-length`,
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
    id: "valentina",
    name: "VALENTINA",
    variant: "Vintage 1970s Brittany Bay Red Velvet Long Overcoat – The Valentina",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("valentina"),
    description: `A striking vintage 1970s velvet coat in a saturated ruby red, designed for dramatic entrances and unforgettable color.

This elegant piece was created by Brittany Bay for Bernarch Casuals of Vancouver, Canada, a label known for producing sophisticated outerwear with thoughtful construction and luxurious fabrics.

The coat is crafted from De Ball "Brilliant Velvet," a richly textured velvet developed for outerwear. The fabric has a deep, luminous finish that catches the light beautifully while also being treated to be water repellent and durable.

The silhouette is long and fluid, featuring a sweeping wrap front that ties at the waist with its original self-belt. A wide shawl collar frames the neckline and adds sculptural drama, while the matching red satin lining gives the interior the same luxurious presence as the exterior.

Bold in color yet timeless in design.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s–Early 1980s

• Material: DE BALL Brilliant Velvet

• Color: Rich ruby / scarlet red

• Lining: Satin

• Closure: Matching wrap-style belt with internal satin tie

• Length: Full-length

• Tags read: Brittany Bay all weather coats by Bernarch Casuals, Vancouver Canada

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's S (US 4-6)",
      measurements: {
        shoulder: `18"`,
        bust: `36"`,
        sleeve: `26"`,
        length: `38"`,
      },
      fitDescription: "Cut in a long, elegant silhouette designed to drape beautifully when worn. The wrap-style front allows for flexibility in fit, while the self-tie belt can be cinched for shape or worn loosely for a relaxed, flowing look.",
    },
    productDetails: {
      era: `Late 1970s–Early 1980s`,
      material: `DE BALL Brilliant Velvet`,
      color: `Rich ruby / scarlet red`,
      lining: `Satin`,
      closure: `Matching wrap-style belt with internal satin tie`,
      length: `Full-length`,
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
    id: "penelope",
    name: "PENELOPE",
    variant: "Vintage 1960s Purple Velvet Opera Coat – The Penelope",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("penelope"),
    description: `A striking vintage velvet coat from Dublin boutique Christine, Duke Street, rendered in a rich violet tone that feels both regal and quietly dramatic. The coat features a sculptural high collar and a line of delicate hand-covered velvet buttons cascading down the front, creating a soft, elegant opening.

The silhouette is long and fluid, with gentle gathers at the shoulders that give the sleeves subtle volume while maintaining a refined shape. The velvet has a luminous depth of color that shifts slightly with movement, revealing the richness of the fabric.

Fully lined in smooth satin, this piece moves beautifully and carries the charm of small-batch boutique craftsmanship from Ireland's fashion scene.

An effortlessly theatrical vintage layer — perfect worn open over a slip dress, denim, or styled as a statement evening coat.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1960s–Early 1970s

• Material: Velvet

• Color: Amethyst purple

• Lining: Satin

• Closure: Covered velvet buttons down the front

• High stand collar

• Gathered shoulder detail

• Length: Full-length

• Tags read: Christine, Duke Street

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's XS/S (US 0-2)",
      measurements: {
        shoulder: `14"`,
        bust: `30"`,
        sleeve: `23"`,
        length: `54"`,
      },
      fitDescription: "A slim, tailored fit through the shoulders and body with a long, dramatic length.",
    },
    productDetails: {
      era: `Late 1960s–Early 1970s`,
      material: `Velvet`,
      color: `Amethyst purple`,
      lining: `Satin`,
      closure: `Covered velvet buttons down the front`,
      length: `Full-length`,
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
    id: "vivienne",
    name: "VIVIENNE",
    variant: "Vintage 1960s Scarlet Red Wool Leopard Calf Hair Collar Coat – The Vivienne",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("vivienne"),
    description: `A striking mid-century wool coat from New York department store label Franklin Simon, likely dating to the early–mid 1960s.

Tailored in a vivid scarlet wool, the coat features elegant princess seaming and a structured silhouette that falls in a clean, refined line typical of the era's sophisticated city coats. Fabric-covered dome buttons form a classic double-breasted closure, while flap pockets at the hips keep the design balanced and understated.

The standout feature is the beautifully spotted leopard-style calf hair collar. The natural hair-on hide creates a soft, slightly textured surface with bold dark spotting against warm ivory tones — a popular luxury accent used in the late 1950s and 1960s.

Inside, the coat is finished with a smooth red satin lining and carries an ILGWU union label, confirming its American mid-century manufacture.

The result is a coat that feels both elegant and a little wild — a true vintage statement piece.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Early to mid-1960s

• Material: Wool exterior. Calf hair collar

• Color: Scarlet red

• Lining: Satin

• Closure: Double-breasted fabric-covered buttons

• Length: Calf-length

• Tags read: Franklin Simon New York

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M-L",
      measurements: {
        shoulder: `16"`,
        bust: `40"`,
        sleeve: `21"`,
        length: `37"`,
      },
      fitDescription: "Designed with the structured tailoring typical of 1960s coats, this piece fits close through the shoulders with a clean, slightly A-line shape through the body.",
    },
    productDetails: {
      era: `Early to mid-1960s`,
      material: `Wool exterior. Calf hair collar`,
      color: `Scarlet red`,
      lining: `Satin`,
      closure: `Double-breasted fabric-covered buttons`,
      length: `Calf-length`,
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
    id: "kendra",
    name: "KENDRA",
    variant: "Vintage 1950s Kenny for Sportowne Long Leopard Coat – The Kendra",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("kendra"),
    description: `A bold mid-century statement piece, this coat channels the effortless glamour of late 1950s and early 1960s fashion. Crafted in plush leopard print faux fur, this coat delivers that iconic vintage leopard look — dramatic, playful, and unmistakably chic.

Designed by Kenny for Sportowne, the coat features a classic double-breasted silhouette with fabric-covered buttons, wide lapels, and soft structure that drapes beautifully when worn open or closed. Two front flap pockets add functionality while maintaining the clean mid-century tailoring.

A particularly special detail is the half-belt across the back, finished with matching covered buttons. This subtle shaping element gives the coat dimension and a flattering vintage profile without sacrificing its relaxed swing.

The interior is lined in smooth satin and bears the original label noting Fabric by La France, a hallmark of quality mid-century textiles.

This piece embodies the timeless allure of vintage leopard outerwear — bold, glamorous, and endlessly wearable.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1950s–early 1960s

• Material: Leopard print faux fur (Fabric by La France)

• Color: Leopard print

• Lining: Satin

• Closure: Double-breasted fabric-covered buttons

• Length: Calf-length

• Tags read: Kenny for Sportowne

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's L-XL (also fits well oversized on smaller frames)",
      measurements: {
        shoulder: `15"`,
        bust: `22"`,
        sleeve: `22"`,
        length: `36"`,
      },
      fitDescription: "This coat has a classic mid-century swing coat silhouette, designed to layer comfortably over clothing. The cut is slightly relaxed through the body with structured shoulders and a long, elegant line. The double-breasted closure allows flexibility in how it can be worn.",
    },
    productDetails: {
      era: `Late 1950s–early 1960s`,
      material: `Leopard print faux fur (Fabric by La France)`,
      color: `Leopard print`,
      lining: `Satin`,
      closure: `Double-breasted fabric-covered buttons`,
      length: `Calf-length`,
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
    id: "blair",
    name: "BLAIR",
    variant: "Vintage White Stag Action Sports Navy Ski Puffer Jacket – The Blair",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("blair"),
    description: `A striking vintage White Stag Action Sports ski puffer with unmistakable retro alpine energy. Done in deep navy with cream piping and bold red sleeve stripes, this jacket captures the graphic, athletic look of late-1970s and early-1980s winter sport design.

The piece features a sculptural high padded funnel collar, zip front, and angled zip pockets. Chevron quilting across the body and back creates movement and dimension while providing warmth and structure. The slightly cropped silhouette and elasticized hem keep the fit sporty and flattering, while the racing-inspired sleeve striping gives it that classic vintage ski aesthetic.

A standout cold-weather layer that feels equally at home on the slopes, in a mountain town, or styled into modern streetwear.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s to early 1980s

• Material: Nylon outer shell with insulated synthetic fill

• Color: Navy blue with cream and red accents

• Lining: Light ivory nylon lining

• Closure: Front zipper closure with zip pockets

• Length: Hip-length

• Tags read: White Stag Action Sports, Size M

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M-L",
      measurements: {
        shoulder: `18"`,
        bust: `40"`,
        sleeve: `24"`,
        length: `23"`,
      },
      fitDescription: "Vintage ski jackets tend to have a structured shoulder and slightly fitted body with a cropped sport silhouette that sits around the hip.",
    },
    productDetails: {
      era: `Late 1970s to early 1980s`,
      material: `Nylon outer shell with insulated synthetic fill`,
      color: `Navy blue with cream and red accents`,
      lining: `Light ivory nylon lining`,
      closure: `Front zipper closure with zip pockets`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "sunny",
    name: "SUNNY",
    variant: "Vintage 1970s Ski West Cobalt Blue with Rainbow Stripe Alpine Puffer – The Sunny",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("sunny"),
    description: `A joyful burst of retro alpine energy. This vintage Ski West puffer jacket captures the playful spirit of late-70s ski culture with its bold cobalt blue shell and vibrant rainbow racing stripes sweeping across the shoulders.

The chevron stripe detail wraps from front to back, giving the jacket a sporty silhouette that feels straight out of a classic mountain lodge scene. A tall stand collar keeps the cold out while the quilted insulated body adds warmth without bulk.

Equal parts nostalgic and effortlessly cool, this piece feels just as at home layered over denim in the city as it would have on the slopes decades ago.

For lovers of vintage ski style, bright color, and statement outerwear.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s–early 1980s

• Material: Nylon shell with insulated quilted puffer construction

• Color: Bright cobalt blue nylon shell. Multicolor rainbow knit shoulder stripe

• Lining: Satin

• Closure: Front zipper closure

• Length: Hip-length

• Tags read: Ski West

Vintage items may show wear consistent with age.`,
    images: ["/placeholder.svg"],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M-L",
      measurements: {
        shoulder: `18"`,
        bust: `42"`,
        sleeve: `24"`,
        length: `24"`,
      },
      fitDescription: "Designed with a classic vintage ski silhouette — slightly boxy, athletic cut with room in the shoulders. Can be styled fitted or slightly oversized for a cozy, off-duty ski vibe.",
    },
    productDetails: {
      era: `Late 1970s–early 1980s`,
      material: `Nylon shell with insulated quilted puffer construction`,
      color: `Bright cobalt blue nylon shell. Multicolor rainbow knit shoulder stripe`,
      lining: `Satin`,
      closure: `Front zipper closure`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "rocco",
    name: "ROCCO",
    variant: "Vintage 1970s Topher Down Alpine Ski Jacket — Red White Blue Colorblock Puffer – The Rocco",
    price: 0,
    image: roccoFront,
    slug: toSlug("rocco"),
    description: `A vintage alpine ski jacket by Topher Down, made in Canada during the golden era of mountain wear. Cut in a bold red, white, and cobalt blue colorblock, this piece carries the unmistakable energy of late-70s to early-80s ski culture — functional, graphic, and built for cold air and motion.

The silhouette is structured yet easy, with a high padded collar, quilted insulation, and a durable nylon shell designed to hold warmth. Details like the front zip closure, zippered pockets, and snap tab at the hem reflect its original purpose on the slopes, while the saturated color palette keeps it visually sharp decades later.

Inside, the original tag is marked with a handwritten name and phone number from a previous owner — a small, human detail that anchors the piece in real use.

A piece for those drawn to garments with history, character, and a sense of where they've been.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s–early 1980s

• Material: Nylon shell with polyester fill

• Color: Red, white, and cobalt blue color blocking

• Closure: Front zipper with snap tab at hem

• Length: Hip-length

• Tags read: Topher Down

• Notable Wear: Handwritten name/number of previous owner on tag (R. Massey)

Vintage items may show wear consistent with age.`,
    images: [roccoFront, roccoBack, roccoDetails, roccoLogo, roccoLabel],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Men's S or Women's M (relaxed, slightly oversized fit)",
      measurements: {
        shoulder: `20"`,
        bust: `21"`,
        sleeve: `25"`,
        length: `24"`,
      },
      fitDescription: "Designed with a classic vintage alpine cut — structured through the shoulders with a slightly tapered body and a softly cropped, hip-length finish. The quilted construction gives it a padded, dimensional shape without feeling bulky.",
    },
    productDetails: {
      era: `Late 1970s–early 1980s`,
      material: `Nylon shell with polyester fill`,
      color: `Red, white, and cobalt blue color blocking`,
      closure: `Front zipper with snap tab at hem`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "sloane",
    name: "SLOANE",
    variant: "Vintage 1970s Nalley Colorblock Ski Puffer Jacket – The Sloane",
    price: 0,
    image: sloaneFront,
    slug: toSlug("sloane"),
    sold: true,
    description: `A striking vintage ski jacket by Nalley, a Pacific Northwest outdoor label based in Seattle. This piece captures the bold alpine style of late-70s and early-80s ski culture with its sculptural color blocking and cropped bomber silhouette.

The nylon shell features dynamic panels of khaki, navy, and burnt orange that sweep across the body and sleeves, creating a graphic, sporty look that feels just as modern today. A tall stand collar and insulated construction were designed for mountain weather, while the elastic ribbed waistband gives the jacket its classic ski-bomber shape.

Finished with a front zip closure and zippered hand pockets, it's both functional and visually striking — an ideal layering piece for cold weather or statement vintage styling.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s–early 1980s

• Material: Nylon shell with synthetic insulation

• Color: Khaki / navy / burnt orange color block

• Closure: Front zipper closure. Zippered side pocket

• Length: Hip-length

• Tags read: Nalley Seattle USA

• Made in USA

Vintage items may show wear consistent with age.`,
    images: [sloaneFront, sloaneDetails, sloaneHanger],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's XS-S",
      measurements: {
        shoulder: `22"`,
        bust: `36"`,
        sleeve: `15"`,
        length: `20"`,
      },
      fitDescription: "Designed with a cropped, ski-bomber silhouette that sits at the high hip. The ribbed waistband pulls it in for a cinched effect. Tagged M (most likely junior sizing).",
    },
    productDetails: {
      era: `Late 1970s–early 1980s`,
      material: `Nylon shell with synthetic insulation`,
      color: `Khaki / navy / burnt orange color block`,
      closure: `Front zipper closure. Zippered side pocket`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "romy",
    name: "ROMY",
    variant: "Vintage 1980s Convertible Colorblock Ski Jacket — Zip-Off Sleeves / Pastel Chevron – The Romy",
    price: 0,
    image: romyFront,
    slug: toSlug("romy"),
    description: `A standout vintage ski jacket with a playful, graphic edge — designed with zip-off sleeves that transform it effortlessly into a vest. The bold chevron colorblocking across the chest and back gives it that unmistakable retro alpine feel, softened by a pastel palette that reads fresh and modern.

The nylon shell has that classic lightly glossy finish, paired with a softly insulated body for warmth without bulk. Ribbed hem adds structure, while the high collar and full zip front keep it functional. When worn as a vest, the silhouette shifts into something more relaxed and streetwear-leaning — perfect for transitional layering.

An easy statement piece that balances sporty nostalgia with everyday wearability.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1980s–early 1990s

• Material: Nylon shell with light synthetic fill

• Color: Teal, cream, lavender, and soft pink chevron colorblock

• Closure: Front zip + zip-off sleeves

• Converts to a vest

• Length: Hip-length

• Tags read: Made in Korea

Vintage items may show wear consistent with age.`,
    images: [romyFront, romyDetails, romyBack, romyPocket],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M-L",
      measurements: {
        shoulder: `16"`,
        bust: `42"`,
        sleeve: `23"`,
        length: `23"`,
      },
      fitDescription: "Cut to sit right at the waist with a softly structured, slightly puffed body. The ribbed hem creates a subtle blouson effect. Unzipped into a vest, it shifts to a boxier, more relaxed silhouette.",
    },
    productDetails: {
      era: `1980s–early 1990s`,
      material: `Nylon shell with light synthetic fill`,
      color: `Teal, cream, lavender, and soft pink chevron colorblock`,
      closure: `Front zip + zip-off sleeves (converts to vest)`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "andie",
    name: "ANDIE",
    variant: "Vintage 1990s Navy Blue Zip-Off Sleeve Puffer Convertible Vest Ski Jacket – The Andie",
    price: 0,
    image: andieFront,
    slug: toSlug("andie"),
    description: `A true transform piece with that quiet, functional cool. This vintage JCPenney puffer is built with zip-off sleeves, shifting effortlessly from a full insulated jacket into a sculptural vest.

The deep navy shell is broken up with tonal and contrast paneling at the sides, giving it a subtle, almost architectural shape. There's a softness to the nylon — lightly padded, not overly bulky — so it keeps warmth without losing movement. The high collar frames the face when zipped, adding structure, while the vest version opens the silhouette into something more relaxed and layered.

It feels nostalgic but not dated — the kind of piece that works equally well thrown over a hoodie or styled more intentionally with clean layers. Built for versatility, worn for the mood.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1990s

• Material: Shell & lining 100% nylon; interlining 100% polyester

• Color: Navy blue with tonal + contrast blue/cream paneling

• Closure: Front zip closure

• Zip-off sleeves (converts to vest), high collar, paneled sides

• Length: Hip-length

• Tags read: JC Penny, Size L

Vintage items may show wear consistent with age.`,
    images: [andieFront, andieDetails, andieBack, andieVest, andieVestDetails, andieLabel],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M-L",
      measurements: {
        shoulder: `15"`,
        bust: `40"`,
        sleeve: `21"`,
        length: `23"`,
      },
      fitDescription: "Slightly boxy, classic puffer proportions with a relaxed body and room through the shoulders. As a jacket, it has a structured, insulated feel; as a vest, it relaxes into an easy, draped layer. Hits at the hip. Tagged L (likely vintage Juniors).",
    },
    productDetails: {
      era: `1990s`,
      material: `Shell & lining 100% nylon; interlining 100% polyester`,
      color: `Navy blue with tonal + contrast blue/cream paneling`,
      closure: `Front zip closure`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "monique",
    name: "MONIQUE",
    variant: "Vintage 1970s Changing Scene Cream Convertible Puffer/Ski Vest/Jacket – The Monique",
    price: 0,
    image: moniqueFrontJacket,
    slug: toSlug("monique"),
    description: `A sculptural, convertible puffer from Changing Scene, a late 1970s–80s label known for accessible, trend-driven womenswear. This piece reflects a shift in that era toward more experimental, sport-influenced design — blending utility with a more directional silhouette.

Designed with zip-off sleeves, it transforms seamlessly from a full jacket into a vest. The silhouette is cropped and blouson, shaped by an elastic hem that pulls inward into a soft, cocooned form. A tall stand collar adds structure and frames the neckline.

The creamy nylon shell has a subtle sheen, accented by fine red piping that creates a lengthening effect through the body. Paneled sides in warm rust and deep brown add contrast and depth.

As a vest, it reads sharper — clean, angular, and layered. As a jacket, it softens into volume while maintaining its sculptural edge.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: Late 1970s–1980s

• Material: Nylon shell with synthetic fill

• Color: Cream with red piping, rust and deep brown paneling

• Closure: Front zipper + zip-off sleeves (convertible to vest)

• Length: Hip-length

• Tags read: Changing Scene Size M

Vintage items may show wear consistent with age.`,
    images: [moniqueFrontJacket, moniqueAngleJacket, moniqueBackJacket, moniqueSideJacketClose, moniqueSideVest, moniqueBackVest],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "M",
      measurements: {
        shoulder: `16"`,
        bust: `40"`,
        sleeve: `22"`,
        length: `22"`,
      },
      fitDescription: "Designed with a cropped, blouson silhouette that sits at the high hip. The elasticized hem pulls inward to create a cinched, bubble-like shape. The shoulders are structured without feeling oversized.",
    },
    productDetails: {
      era: `Late 1970s–1980s`,
      material: `Nylon shell with synthetic fill`,
      color: `Cream with red piping, rust and deep brown paneling`,
      closure: `Front zipper + zip-off sleeves (convertible to vest)`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "aurora",
    name: "AURORA",
    variant: "Vintage 1970s Burnt Orange Sherpa-Lined Colorblock Puffer Bomber Jacket – The Aurora",
    price: 0,
    image: "/placeholder.svg",
    slug: toSlug("aurora"),
    description: `A standout vintage puffer bomber with a warm, retro palette and an easy off-duty feel. This piece features a dusty blush quilted body, a rich rust-toned yoke with slim contrast piping, and a plush cream sherpa lining that carries through the collar and interior for extra warmth and texture.

The chunky ribbed knit hem in a coordinating rust tone gives it that classic bomber shape, while the oversized zip front and angled front pockets keep it practical and easy to wear.

It has that perfect cozy-meets-cool feel — equal parts mountain lodge, 70s apres-ski, and everyday vintage statement layer.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1970s–1980s

• Material: Polyester twill exterior. Faux sherpa/fleece interior

• Color: Two tonal Burnt Orange/Sienna/Rust exterior. Cream sherpa interior

• Closure: Front zipper

• Length: Hip-length

Vintage items may show wear consistent with age.`,
    images: [auroraVest, auroraLining, auroraDetails, auroraJacket, auroraFront, auroraCollar],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's M",
      measurements: {
        shoulder: `17"`,
        bust: `20"`,
        sleeve: `24"`,
        length: `22"`,
      },
      fitDescription: "A cropped bomber silhouette with a relaxed, cozy fit through the body.",
    },
    productDetails: {
      era: `1970s–1980s`,
      material: `Polyester twill exterior. Faux sherpa/fleece interior`,
      color: `Two tonal Burnt Orange/Sienna/Rust exterior. Cream sherpa interior`,
      closure: `Front zipper`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
  {
    id: "madeline",
    name: "MADELINE",
    variant: "Vintage 1970s Red Quilted Puffer Vest by Roffe – Sculpted Chevron Stitch / 70s Ski Style – The Madeline",
    price: 0,
    image: madelineFront,
    slug: toSlug("madeline"),
    description: `A vivid cherry red puffer vest by Roffe with sculpted diagonal quilting that curves across the body in a soft chevron rhythm — giving shape to something traditionally utilitarian. The oversized padded shawl collar rises gently at the neck, creating a cocooned silhouette that feels both protective and quietly dramatic.

There's a sense of movement in this piece — like apres-ski at dusk, boots on wood floors, cheeks still cold from the air.

Finished with metal snap closures and hidden side pockets, it's equal parts function and statement. Lightweight but warm, designed for layering yet strong enough to stand on its own.

Inside, a small handwritten tag reads "Madeleine" — a trace of a previous life, now part of the story. We've kept her name.

A garment with a past—ready for its next chapter.

• Authentic vintage

• Estimated era: 1970s

• Material: Red nylon exterior. Plush insulation.

• Color: Cherry Red

• Closure: Metal snap closures down front

• Length: Hip-length

• Tags read: Roffe

• Notable Wear: Handwritten name of previous owner on tag (Madeline)

Vintage items may show wear consistent with age.`,
    images: [madelineFront, madelineBack, madelineBack2, madelineCollar, madelineLabel, madelineTag],
    sizes: ["XS", "S", "M", "L"],
    sizeFit: {
      modernSize: "Women's S-M",
      measurements: {
        shoulder: `15"`,
        bust: `19"`,
        sleeve: `24"`,
        length: `19"`,
      },
      fitDescription: "A cropped vest silhouette with a sculptural padded collar.",
    },
    productDetails: {
      era: `1970s`,
      material: `Red nylon exterior. Plush insulation.`,
      color: `Cherry Red`,
      closure: `Metal snap closures down front`,
      length: `Hip-length`,
    },
    careInstructions: [
      "Professional dry clean only",
      "Store in a cool, dark place in a breathable garment bag — avoid plastic",
      "Hang on a padded or broad-shouldered hanger to maintain shape",
      "Avoid direct sunlight, heat, and moisture",
    ],
    category: "apres-ski",
  },
];

export default products;
