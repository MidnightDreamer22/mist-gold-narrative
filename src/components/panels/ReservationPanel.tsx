import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ReservationForm from '@/components/forms/ReservationForm';

const ReservationPanel = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <section className="snap-section min-h-screen bg-ink-900">
      <div className="section-content container mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-5xl md:text-6xl font-display text-mist-100 text-center mb-12">
          Reserve a Table
        </h2>

        {/* Two-Region Layout: Details + Availability Table */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          {/* LEFT: Details Form */}
          <div className="lg:col-span-5">
            <div className="bg-ink-700 !bg-opacity-100 opacity-100 rounded-lg border border-border p-8">
              <ReservationForm />
            </div>
          </div>

          {/* RIGHT: Map + Info */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Inline Info Block - "Before you book" */}
              <div 
                className="bg-ink-700 !bg-opacity-100 rounded-lg border border-border p-6"
                style={{
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: 'fadeSlideUp 480ms var(--easing-enter) forwards',
                  animationDelay: '100ms'
                }}
              >
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Before you book</p>
                  
                  <ul className="space-y-2 text-sm text-mist-300">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-400 mt-0.5">•</span>
                      <span>Working hours: Every day <strong className="text-gold-400">18:30 - 02:00</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-400 mt-0.5">•</span>
                      <span>Express yourself, but entrance control is applicable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-400 mt-0.5">•</span>
                      <span>Loud talks outside are not allowed — neighborhood comfort is our priority</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-gold-400 rounded"
                  >
                    {showMoreInfo ? 'Less info' : 'More info'}
                    {showMoreInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {showMoreInfo && (
                    <div 
                      className="pt-4 mt-4 border-t border-border space-y-4 text-sm text-mist-300"
                      style={{
                        animation: 'expandContent 280ms ease-out forwards'
                      }}
                    >
                      <div>
                        <h4 className="text-gold-400 font-semibold mb-2">How to Reserve</h4>
                        <ul className="space-y-2 pl-4">
                          <li className="list-decimal">Website: Confirmation within 1 hour via email</li>
                          <li className="list-decimal">Instagram/Facebook: Send us a DM (confirmation within 1 hour)</li>
                          <li className="list-decimal">Urgent: Call +374 95 426 619 (14:00-22:00)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-gold-400 font-semibold mb-2">Contact</h4>
                        <p>Phone: <a href="tel:+37495426619" className="text-gold-400 hover:underline">+374 95 426 619</a></p>
                        <p>Email: <a href="mailto:simonebarhome@gmail.com" className="text-gold-400 hover:underline">simonebarhome@gmail.com</a></p>
                        <p>Address: 80 Aram st, Yerevan, Armenia</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Google Map */}
              <div 
                className="bg-ink-700 !bg-opacity-100 rounded-lg border border-border overflow-hidden"
                style={{
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: 'fadeSlideUp 480ms var(--easing-enter) forwards',
                  animationDelay: '300ms'
                }}
              >
                <div className="mapWrap">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1342097073843!2d44.505157976628645!3d40.183826569780805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcfc6ab3a6c7%3A0xf953c923afb8efca!2sSimona!5e0!3m2!1sen!2sam!4v1762090593594!5m2!1sen!2sam"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Simona Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandContent {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 600px;
          }
        }
        
        .mapWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
        }
        
        .mapWrap iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
    </section>
  );
};

export default ReservationPanel;
