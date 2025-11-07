import { useState } from 'react';
import { X, Calendar, Instagram, Facebook, Phone, Clock, Shirt, Volume2, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
interface DiveInModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const DiveInModal = ({
  isOpen,
  onClose
}: DiveInModalProps) => {
  const {
    toast
  } = useToast();
  const [expandedOption, setExpandedOption] = useState<'form' | 'social' | 'phone' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    time: '',
    notes: '',
    consent: false
  });
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !formData.name || !formData.email || !formData.partySize || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Reservation Submitted",
      description: "You'll receive confirmation within 1 hour via email."
    });
    setSubmitted(true);
  };
  const handleDownloadICS = () => {
    if (!date) return;
    const event = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${format(date, 'yyyyMMdd')}T${formData.time.replace(':', '')}00`, `DTEND:${format(date, 'yyyyMMdd')}T${formData.time.replace(':', '')}00`, 'SUMMARY:Reservation at Simona', `DESCRIPTION:Party of ${formData.partySize}`, 'LOCATION:80 Aram st, Yerevan, Armenia', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const blob = new Blob([event], {
      type: 'text/calendar'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'simona-reservation.ics';
    link.click();
    URL.revokeObjectURL(url);
  };
  const timeSlots = ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30', '01:00', '01:30'];
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-ink-900/80 backdrop-blur-sm" onClick={onClose} style={{
      animation: 'fadeIn 300ms ease-out'
    }} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-hidden" onClick={onClose}>
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-ink-900 !bg-opacity-100 rounded-lg shadow-heavy overflow-hidden" onClick={e => e.stopPropagation()} style={{
        animation: 'modalEnter 400ms cubic-bezier(.16,1,.3,1)'
      }}>
          {/* Header */}
          <div className="sticky top-0 z-10 bg-ink-900/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-3xl font-display text-mist-100">Welcome to Simona</h2>
            <button onClick={onClose} className="p-2 text-mist-300 hover:text-gold-400 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-gold-400" aria-label="Close">
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-6 space-y-12">
            
            {submitted ? (/* Success State */
          <div className="text-center space-y-6 py-12">
                <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-4xl font-display text-mist-100">Thank you, {formData.name}!</h3>
                
                <div className="bg-ink-700 !bg-opacity-100 rounded-lg p-6 space-y-3 text-mist-300 max-w-lg mx-auto">
                  <p><strong>Date:</strong> {date && format(date, 'MMMM d, yyyy')}</p>
                  <p><strong>Time:</strong> {formData.time}</p>
                  <p><strong>Party Size:</strong> {formData.partySize} guests</p>
                  <p className="pt-4 text-sm">
                    ✉️ Confirmation will be sent to <strong>{formData.email}</strong> within 1 hour
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button onClick={handleDownloadICS} className="bg-gold-400 hover:bg-gold-300 text-ink-900">
                    <Download size={20} className="mr-2" />
                    Add to Calendar
                  </Button>
                  
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="border-border text-mist-300 hover:bg-ink-700 !bg-opacity-100">
                    Modify Reservation
                  </Button>
                </div>
              </div>) : <>
                {/* About Section */}
                <section>
                  <div className="inline-block mb-4 px-3 py-1 bg-gold-400/10 rounded-full">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Our Story</span>
                  </div>
                  <h3 className="text-2xl font-display text-mist-100 mb-4">The Spirit of the City</h3>
                  <div className="space-y-4 text-mist-300 leading-relaxed">
                    <p>
                      Simona was born from a simple idea: that the perfect cocktail is more than just spirits and ice—it's a moment, a memory, a story waiting to unfold in the dim glow of amber light.
                    </p>
                    <p>
                      Named after <strong className="text-gold-400">Simone de Beauvoir</strong>, we opened our doors in <strong className="text-gold-400">2016</strong> as a haven for artists, thinkers, and dreamers. Our philosophy is simple: create a space where time slows down, where conversations deepen over perfectly balanced drinks, and where every detail—from the music to the glassware—is intentional.
                    </p>
                    <p>
                      Our mixologists are storytellers, each cocktail a carefully composed narrative of flavor, technique, and inspiration. We source rare spirits, press fresh juices daily, and approach each order with the care it deserves.
                    </p>
                  </div>
                </section>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Reserve Your Night Section */}
                <section>
                  <div className="inline-block mb-4 px-3 py-1 bg-gold-400/10 rounded-full">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Reserve Your Night</span>
                  </div>
                  <h3 className="text-2xl font-display text-mist-100 mb-6">Choose Your Path</h3>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Option 1: Website Form */}
                      <button onClick={() => setExpandedOption(expandedOption === 'form' ? null : 'form')} className={cn("p-6 rounded-lg border-2 transition-all text-left", expandedOption === 'form' ? "border-gold-400 bg-ink-700/50" : "border-border hover:border-gold-400/50 bg-ink-700 !bg-opacity-100")}>
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
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gold-400 hover:underline">
                            Instagram
                          </a>
                          <span className="text-mist-500">•</span>
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gold-400 hover:underline">
                            Facebook
                          </a>
                        </div>
                        <p className="text-xs text-gold-400 mt-2"> Confirmation within 1 hour</p>
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
                    {expandedOption === 'form' && <form onSubmit={handleSubmit} className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-gold-400/30 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-mist-100">Full Name *</Label>
                          <Input id="name" value={formData.name} onChange={e => setFormData({
                      ...formData,
                      name: e.target.value
                    })} className="bg-ink-900 !bg-opacity-100 border-border text-mist-300" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-mist-100">Email *</Label>
                          <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} className="bg-ink-900 !bg-opacity-100 border-border text-mist-300" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-mist-100">Phone</Label>
                          <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({
                      ...formData,
                      phone: e.target.value
                    })} className="bg-ink-900 !bg-opacity-100 border-border text-mist-300" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="partySize" className="text-mist-100">Party Size *</Label>
                          <Select value={formData.partySize} onValueChange={value => setFormData({
                      ...formData,
                      partySize: value
                    })}>
                            <SelectTrigger className="bg-ink-900 !bg-opacity-100 border-border text-mist-300">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent className="bg-ink-900 !bg-opacity-100 border-border z-[80]">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <SelectItem key={num} value={String(num)} className="text-mist-300">
                                  {num} {num === 1 ? 'guest' : 'guests'}
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-mist-100">Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left bg-ink-900 !bg-opacity-100 border-border text-mist-300 hover:bg-ink-700">
                                <Calendar className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP') : 'Pick a date'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-ink-900 !bg-opacity-100 border-border z-[80]">
                              <CalendarComponent mode="single" selected={date} onSelect={setDate} disabled={date => date < new Date()} className="rounded-md" />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-mist-100">Time *</Label>
                          <Select value={formData.time} onValueChange={value => setFormData({
                      ...formData,
                      time: value
                    })}>
                            <SelectTrigger className="bg-ink-900 !bg-opacity-100 border-border text-mist-300">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent className="bg-ink-900 !bg-opacity-100 border-border z-[80]">
                              {timeSlots.map(time => <SelectItem key={time} value={time} className="text-mist-300">
                                  {time}
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-mist-100">Special Requests / Occasion</Label>
                        <Textarea id="notes" value={formData.notes} onChange={e => setFormData({
                    ...formData,
                    notes: e.target.value
                  })} className="bg-ink-900 !bg-opacity-100 border-border text-mist-300 min-h-[80px]" placeholder="Celebrating something? Dietary restrictions? Let us know..." />
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox id="consent" checked={formData.consent} onCheckedChange={checked => setFormData({
                    ...formData,
                    consent: checked as boolean
                  })} className="mt-1" />
                        <Label htmlFor="consent" className="text-sm text-mist-300 leading-relaxed">
                          I agree to receive reservation confirmation and reminders via email/SMS
                        </Label>
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg py-6">
                        Request Reservation
                      </Button>
                    </form>}
                  </div>
                </section>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Important Information */}
                <section>
                  <div className="inline-block mb-4 px-3 py-1 bg-gold-400/10 rounded-full">
                    <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Important Information</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Working Hours */}
                    <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                      <Clock className="w-6 h-6 text-gold-400 mb-3" />
                      <h4 className="text-lg font-display text-mist-100 mb-2">Working Hours</h4>
                      <p className="text-mist-300">Every day</p>
                      <p className="text-2xl font-bold text-gold-400 mt-1">18:30 - 02:00</p>
                    </div>

                    {/* Dress Code */}
                    <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                      <Shirt className="w-6 h-6 text-gold-400 mb-3" />
                      <h4 className="text-lg font-display text-mist-100 mb-2">Dress Code</h4>
                      <p className="text-mist-300">Express yourself, but entrance control is applicable</p>
                    </div>

                    {/* House Rules */}
                    <div className="p-6 bg-ink-700 !bg-opacity-100 rounded-lg border border-border">
                      <Volume2 className="w-6 h-6 text-gold-400 mb-3" />
                      <h4 className="text-lg font-display text-mist-100 mb-2">House Rules</h4>
                      <p className="text-sm text-mist-300 mb-2"><strong>IT'S NOT ALLOWED:</strong></p>
                      <p className="text-mist-300">Loud talks outside the bar</p>
                      <p className="text-xs text-gold-400 mt-2">Neighborhood comfort is our priority</p>
                    </div>

                    {/* Additional Notes */}
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
              </>}
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
    </>;
};
export default DiveInModal;