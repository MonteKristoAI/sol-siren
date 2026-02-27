import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const reviews = [
  {
    rating: 5,
    text: "The fit is incredible — it moves with you, not against you. This is the kind of piece I'll reach for every single week.",
    name: "Camille Laurent",
    location: "Paris, France",
  },
  {
    rating: 5,
    text: "Finally found vintage-inspired clothing that actually feels modern. The fabric quality alone sets this apart from everything else.",
    name: "James Okafor",
    location: "London, UK",
  },
  {
    rating: 5,
    text: "Worth every cent. I've never received so many compliments on a single piece. It feels luxurious without trying too hard.",
    name: "Sofia Reyes",
    location: "New York, USA",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className="fill-foreground text-foreground"
      />
    ))}
  </div>
);

const ReviewsSection = () => {
  return (
    <section className="bg-secondary py-20 md:py-28 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Customer Reviews
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
          Worn. Loved. Repeated.
        </h2>
        <p className="mt-4 font-body text-sm text-muted-foreground">
          Over 2,000 customers worldwide.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <StarRating count={5} />
          <span className="font-body text-sm text-foreground">
            4.8/5 Average Rating
          </span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-background border border-border p-8 transition-transform duration-300 hover:-translate-y-1"
          >
            <StarRating count={review.rating} />
            <p className="mt-5 font-body text-sm text-foreground/80 leading-relaxed">
              "{review.text}"
            </p>
            <div className="mt-6">
              <p className="font-body text-xs font-medium text-foreground tracking-wide">
                {review.name}
              </p>
              <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                {review.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <div className="text-center mt-14">
        <Link
          to="/shop"
          className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground border-b border-muted-foreground/30 hover:border-foreground pb-1 transition-all duration-300"
        >
          Read More Reviews →
        </Link>
      </div>
    </section>
  );
};

export default ReviewsSection;
