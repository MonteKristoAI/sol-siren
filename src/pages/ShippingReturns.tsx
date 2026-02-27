import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Footer from "@/components/Footer";

const ShippingReturns = () => (
  <>
    <main className="bg-background pt-28 md:pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 md:px-16">
        <h1 className="font-display text-4xl md:text-5xl font-light text-foreground text-center">
          Shipping & Returns
        </h1>
        <p className="mt-4 text-center font-body text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
          We want you to love every piece. Here's everything you need to know about getting your order and our hassle-free return policy.
        </p>

        <div className="mt-16 space-y-14">
          {/* Shipping */}
          <section>
            <h2 className="font-display text-2xl font-light text-foreground">Shipping Information</h2>
            <div className="w-10 h-[1px] bg-border mt-3 mb-6" />
            <ul className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
              <li>Orders are processed within 1–2 business days.</li>
              <li>Standard shipping: 3–7 business days (US).</li>
              <li>International shipping times vary by region.</li>
              <li>A tracking number is provided once your order ships.</li>
            </ul>
          </section>

          {/* Returns */}
          <section>
            <h2 className="font-display text-2xl font-light text-foreground">Returns & Exchanges</h2>
            <div className="w-10 h-[1px] bg-border mt-3 mb-6" />
            <ul className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
              <li>14-day return window from the date of delivery.</li>
              <li>Items must be unworn, unwashed, and in original condition with tags.</li>
              <li>Exchanges are available for size changes, subject to availability.</li>
              <li>Refunds are processed within 5–7 business days after approval.</li>
            </ul>
          </section>

          {/* Questions */}
          <section>
            <h2 className="font-display text-2xl font-light text-foreground">Questions?</h2>
            <div className="w-10 h-[1px] bg-border mt-3 mb-6" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              If you have any questions about shipping or returns, please reach out:
            </p>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
              <Mail size={14} />
              <span className="font-body text-sm">hello@solsirenvintage.com</span>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default ShippingReturns;
