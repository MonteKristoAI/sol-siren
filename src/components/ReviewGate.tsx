"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CRopL5TPbBjoEAE/review";
const POSITIVE_THRESHOLD = 4; // 4–5 → Google · 1–3 → private feedback

type View = "rate" | "feedback" | "thanks";

const ReviewGate = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("rate");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setView("rate");
    setRating(0);
    setHover(0);
    setFeedback("");
    setEmail("");
  };

  const close = () => {
    setOpen(false);
    // let the exit animation play before resetting state
    setTimeout(reset, 300);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleRate = (value: number) => {
    setRating(value);
    if (value >= POSITIVE_THRESHOLD) {
      // Happy customer → straight to Google. Done inside the click gesture so
      // the popup isn't blocked; fall back to same-tab navigation if it is.
      const win = window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = GOOGLE_REVIEW_URL;
      close();
    } else {
      setView("feedback");
    }
  };

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setView("thanks");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground border-b border-muted-foreground/30 hover:border-foreground pb-1 transition-all duration-300"
      >
        ⭐ Leave a Review →
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Leave a review"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="relative bg-background border border-border w-full max-w-md p-10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              {/* Step 1 — star rating */}
              {view === "rate" && (
                <>
                  <h3 className="font-display text-2xl font-light text-foreground">
                    how was your experience?
                  </h3>
                  <p className="mt-3 font-body text-base text-muted-foreground">
                    tap a star to let us know.
                  </p>
                  <div
                    className="mt-8 flex items-center justify-center gap-2"
                    onMouseLeave={() => setHover(0)}
                  >
                    {[1, 2, 3, 4, 5].map((value) => {
                      const active = (hover || rating) >= value;
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-label={`${value} star${value > 1 ? "s" : ""}`}
                          onMouseEnter={() => setHover(value)}
                          onFocus={() => setHover(value)}
                          onClick={() => handleRate(value)}
                          className="p-1 transition-transform duration-150 hover:scale-110"
                        >
                          <Star
                            size={36}
                            className={
                              active
                                ? "fill-foreground text-foreground"
                                : "fill-transparent text-muted-foreground/40"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Step 2 — private feedback (ratings 1–3) */}
              {view === "feedback" && (
                <form onSubmit={submitFeedback} className="text-left">
                  <h3 className="font-display text-2xl font-light text-foreground text-center">
                    we'd love to make this right.
                  </h3>
                  <p className="mt-3 font-body text-base text-muted-foreground text-center">
                    tell us what fell short — it goes straight to erin, and she reads every word.
                  </p>
                  <textarea
                    required
                    autoFocus
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    placeholder="what could we have done better?"
                    className="mt-6 w-full border border-border bg-background px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email (optional — if you'd like a reply)"
                    className="mt-3 w-full border border-border bg-background px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                  />
                  <button
                    type="submit"
                    className="mt-6 w-full bg-foreground text-primary-foreground py-4 font-body text-[11px] tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
                  >
                    send feedback
                  </button>
                </form>
              )}

              {/* Step 3 — thank you */}
              {view === "thanks" && (
                <>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Star
                        key={v}
                        size={18}
                        className={
                          v <= rating
                            ? "fill-foreground text-foreground"
                            : "fill-transparent text-muted-foreground/30"
                        }
                      />
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-light text-foreground">
                    thank you — truly.
                  </h3>
                  <p className="mt-3 font-body text-base text-muted-foreground">
                    your note is on its way to erin. she takes every word to heart,
                    and she'll be in touch if you left an email.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-7 w-full border border-border py-4 font-body text-[11px] tracking-[0.2em] uppercase text-foreground hover:bg-muted transition-colors"
                  >
                    close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewGate;
