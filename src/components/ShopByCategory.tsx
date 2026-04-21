import { Link } from "react-router-dom";
import herkimerFloat1 from "@/assets/products/jewelry/herkimer-float/herkimer-float-1.webp";
import topangaImg1 from "@/assets/products/topanga/topanga-1.webp";
import apresSkiCategory from "@/assets/categories/apres-ski.webp";
import overcoatCategory from "@/assets/categories/overcoat.webp";
import fayeImg1 from "@/assets/products/faye/faye-1.webp";
import emmylouImg1 from "@/assets/products/emmylou/emmylou-1.webp";

const categories = [
{
  name: "Fur",
  image: fayeImg1,
  link: "/shop?category=fur"
},
{
  name: "Leather",
  image: emmylouImg1,
  link: "/shop?category=leather"
},
{
  name: "Penny Lane / Afghan",
  image: topangaImg1,
  link: "/shop?category=penny-lane-afghan"
},
{
  name: "Overcoat",
  image: dianaImg1,
  link: "/shop?category=overcoat"
},
{
  name: "Apres Ski",
  image: apresSkiCategory,
  link: "/shop?category=apres-ski"
},
{
  name: "Jewelry",
  image: herkimerFloat1,
  link: "/jewelry"
}];


const ShopByCategory = () => {
  return (
    <section className="bg-background py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
          Find Your Style
        </h2>
        <p className="mt-4 font-body text-lg md:text-xl tracking-wide text-muted-foreground">
          Vintage, arranged by category
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {categories.map((cat) =>
        <Link
          key={cat.name}
          to={cat.link}
          className="group relative block aspect-[3/4] overflow-hidden">
          
            <img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          
            <div className="absolute inset-0 bg-foreground/30 transition-colors duration-500 group-hover:bg-foreground/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-xs tracking-[0.3em] uppercase text-background">
                {cat.name}
              </span>
            </div>
          </Link>
        )}
      </div>
    </section>);

};

export default ShopByCategory;