import { useState, useRef } from "react";
import { X, Calendar, Instagram, Facebook, Phone, Clock, Shirt, Volume2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ReservationForm from "@/components/forms/ReservationForm";

interface DiveInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiveInModal = ({ isOpen, onClose }: DiveInModalProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [expandedOption, setExpandedOption] = useState<"form" | "social" | "phone" | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-ink-900/80 backdrop-blur-sm"
        onClick={onClose}
        style={{
          animation: "fadeIn 300ms ease-out",
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-hidden" onClick={onClose}>
        <div
          className="relative w-full max-w-4xl max-h-[90vh] bg-ink-900 !bg-opacity-100 rounded-lg shadow-heavy overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: "modalEnter 400ms cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-ink-900/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-3xl font-display text-mist-100">Welcome to Simona</h2>
            <button
              onClick={onClose}
              className="p-2 text-mist-300 hover:text-gold-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-6 space-y-12">
            {/* About Section */}
            <section>
              <div className="inline-block mb-4 px-3 py-1 bg-gold-400/10 rounded-full">
                <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Our Story</span>
              </div>
              <h3 className="text-2xl font-display text-mist-100 mb-4">The Spirit of the City</h3>
              <div className="space-y-4 text-mist-300 leading-relaxed">
                <p>
                  Simona was born from a simple idea: that the perfect cocktail is more than just spirits and
                  ice—it's a moment, a memory, a story waiting to unfold in the dim glow of amber light.
                </p>
                <p>
                  Named after <strong className="text-gold-400">Simone de Beauvoir</strong>, we opened our doors in{" "}
                  <strong className="text-gold-400">2016</strong> as a haven for artists, thinkers, and dreamers.
                  Our philosophy is simple: create a space where time slows down, where conversations deepen over
                  perfectly balanced drinks, and where every detail—from the music to the glassware—is intentional.
                </p>
                <p>
                  Our mixologists are storytellers, each cocktail a carefully composed narrative of flavor,
                  technique, and inspiration. We source rare spirits, press fresh juices daily, and approach each
                  order with the care it deserves.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Reserve Your Night Section */}
            <section>
              <div className="inline-block mb-4 px-3 py-1 bg-gold-400/10 rounded-full">
                <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                  Reserve Your Night
                </span>
              </div>
              <h3 className="text-2xl font-display text-mist-100 mb-6">Choose Your Path</h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Option 1: Website Form */}
                  <button
                    onClick={() => {
                      setExpandedOption(expandedOption === "form" ? null : "form");
                      setTimeout(() => {
                        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    }}
                    className={cn(
                      "p-6 rounded-lg border-2 transition-all text-left",
                      expandedOption === "form"
                        ? "border-gold-400 bg-ink-700/50"
                        : "border-border hover:border-gold-400/50 bg-ink-700 !bg-opacity-100",
                    )}
                  >
                    <Calendar className="w-8 h-8 text-gold-400 mb-3" />
                    <h4 className="text-lg font-display text-mist-100 mb-2">Website Form</h4>
                    <p className="text-sm text-mist-300">Fill out the form below</p>
                    <p className="text-xs text-gold-400 mt-2">Confirmation within 1 hour</p>
                  </button>

                  {/* Option 2: Social Media */}
                  <div className="p-6 rounded-lg border-2 border-border bg-ink-700 !bg-opacity-100 hover:border-gold-400/50 transition-all">
                    <div className="flex gap-2 mb-3">
                      <Instagram className="w-6 h-6 text-gold-400" />
                      <Facebook className="w-6 h-6 text-gold-400" />
                    </div>
                    <h4 className="text-lg font-display text-mist-100 mb-2">Social Media</h4>
                    <p className="text-sm text-mist-300 mb-3">Prefer to message us?</p>
                    <div className="flex gap-2">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gold-400 hover:underline"
                      >
                        Instagram
                      </a>
                      <span className="text-mist-500">•</span>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gold-400 hover:underline"
                      >
                        Facebook
                      </a>
                    </div>
                    <p className="text-xs text-gold-400 mt-2">Confirmation within 1 hour</p>
                  </div>

                  {/* Option 3: Phone */}
                  <div className="p-6 rounded-lg border-2 border-border bg-ink-700 !bg-opacity-100 hover:border-gold-400/50 transition-all">
                    <Phone className="w-8 h-8 text-gold-400 mb-3" />
                    <h4 className="text-lg font-display text-mist-100 mb-2">Urgent Phone</h4>
                    <p className="text-sm text-mist-300 mb-3">Need immediate assistance?</p>
                    <a href="tel:+37495426619" className="text-gold-400 hover:underline font-semibold">
                      +374 95 426 619
                    </a>
                    <p className="text-xs text-gold-400 mt-2">Available 14:00-22:00 daily</p>
                  </div>
                </div>

                {/* Expanded Form */}
                {expandedOption === "form" && (
                  <div
                    ref={formRef}
                    className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-gold-400/30"
                  >
                    <ReservationForm compact />
                  </div>
                )}
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Important Information Section */}
            <section>
              <div className="inline-block mb-4 px-3 py-1 bg-gold-400/10 rounded-full">
                <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                  Important Information
                </span>
              </div>
              <h3 className="text-2xl font-display text-mist-100 mb-6">Before Your Visit</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                  <Clock className="w-6 h-6 text-gold-400 mb-3" />
                  <h4 className="text-lg font-display text-mist-100 mb-2">Working Hours</h4>
                  <p className="text-sm text-mist-300">Every day: 18:30 - 02:00</p>
                  <p className="text-xs text-gold-400 mt-2">Kitchen closes at 01:00</p>
                </div>

                <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                  <Shirt className="w-6 h-6 text-gold-400 mb-3" />
                  <h4 className="text-lg font-display text-mist-100 mb-2">Dress Code</h4>
                  <p className="text-sm text-mist-300">Express yourself</p>
                  <p className="text-xs text-gold-400 mt-2">Entrance control is applicable</p>
                </div>

                <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                  <Volume2 className="w-6 h-6 text-gold-400 mb-3" />
                  <h4 className="text-lg font-display text-mist-100 mb-2">House Rules</h4>
                  <p className="text-sm text-mist-300">Loud talks outside are not allowed</p>
                  <p className="text-xs text-gold-400 mt-2">Neighborhood comfort is our priority</p>
                </div>

                <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                  <AlertCircle className="w-6 h-6 text-gold-400 mb-3" />
                  <h4 className="text-lg font-display text-mist-100 mb-2">Additional Notes</h4>
                  <ul className="text-sm text-mist-300 space-y-1">
                    <li>• Reservations held for 15 minutes</li>
                    <li>• Walk-ins welcome based on availability</li>
                    <li>• Contact: simonebarhome@gmail.com</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default DiveInModal;
