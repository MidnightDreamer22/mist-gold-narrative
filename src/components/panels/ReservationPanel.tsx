import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, ChevronUp, Calendar as CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimeSlot {
  time: string;
  available: boolean;
}

const ReservationPanel = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    time: '',
    notes: '',
    consent: false
  });

  // Generate available time slots based on date and party size
  useEffect(() => {
    if (!date || !formData.partySize) {
      setAvailableSlots([]);
      return;
    }

    const baseSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];
    const partySize = parseInt(formData.partySize);
    
    // Filter out early slots for large parties
    const filteredSlots = partySize > 4 
      ? baseSlots.filter(slot => slot >= '19:00')
      : baseSlots;

    // Mock availability: randomly mark 30-40% as unavailable
    const slots = filteredSlots.map(time => ({
      time,
      available: Math.random() > 0.35
    }));

    setAvailableSlots(slots);

    // Clear selected time if it becomes unavailable
    if (formData.time && !slots.find(s => s.time === formData.time && s.available)) {
      setFormData(prev => ({ ...prev, time: '' }));
      toast({
        title: "Time Unavailable",
        description: "Your selected time is no longer available. Please choose another.",
        variant: "destructive"
      });
    }
  }, [date, formData.partySize, formData.time, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.name || !formData.email || !formData.partySize || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would send notifications via edge functions
    // Example: await fetch('/api/send-reservation', { method: 'POST', body: JSON.stringify({ ...formData, date }) })
    
    toast({
      title: "Reservation Submitted",
      description: "You'll receive a confirmation email shortly.",
    });
    
    setSubmitted(true);
  };

  const handleDownloadICS = () => {
    if (!date) return;
    
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${format(date, 'yyyyMMdd')}T${formData.time.replace(':', '')}00`,
      `DTEND:${format(date, 'yyyyMMdd')}T${formData.time.replace(':', '')}00`,
      'SUMMARY:Reservation at Simona',
      `DESCRIPTION:Party of ${formData.partySize}`,
      'LOCATION:Simona Restaurant',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([event], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'simona-reservation.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (submitted) {
    return (
      <section className="snap-section min-h-screen bg-ink-900 flex items-center justify-center">
        <div className="section-content container mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 className="text-5xl md:text-6xl font-display text-mist-100 mb-8">
            Reservation Confirmed
          </h2>
          
          <div className="bg-ink-700 rounded-lg border border-border p-8 space-y-6">
            <p className="text-xl text-mist-300">
              Thank you, {formData.name}!
            </p>
            
            <div className="space-y-2 text-mist-300">
              <p><strong>Date:</strong> {date && format(date, 'MMMM d, yyyy')}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Party Size:</strong> {formData.partySize} guests</p>
            </div>
            
            <p className="text-mist-300">
              A confirmation has been sent to <strong>{formData.email}</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={handleDownloadICS}
                className="bg-gold-400 hover:bg-gold-300 text-ink-900"
              >
                <Download size={20} className="mr-2" />
                Add to Calendar
              </Button>
              
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="border-border text-mist-300 hover:bg-ink-700"
              >
                Modify Reservation
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            <form onSubmit={handleSubmit} className="bg-ink-700 rounded-lg border border-border p-8 space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-mist-100">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-ink-900 border-border text-mist-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-mist-100">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-ink-900 border-border text-mist-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-mist-100">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-ink-900 border-border text-mist-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partySize" className="text-mist-100">Party Size *</Label>
                  <Select value={formData.partySize} onValueChange={(value) => setFormData({ ...formData, partySize: value })}>
                    <SelectTrigger className="bg-ink-900 border-border text-mist-300">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-ink-900 border-border">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={String(num)} className="text-mist-300">
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-mist-100">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-ink-900 border-border text-mist-300 hover:bg-ink-700"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-ink-900 border-border">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-mist-100">Selected Time *</Label>
                  <Input
                    id="time"
                    value={formData.time || 'Click a time slot →'}
                    readOnly
                    className="bg-ink-900 border-border text-mist-300"
                    placeholder="Select from available times"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-mist-100">Special Requests / Occasion</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-ink-900 border-border text-mist-300 min-h-[100px]"
                    placeholder="Any special requests, dietary restrictions, or celebrating an occasion?"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm text-mist-300 leading-relaxed">
                    I agree to receive reservation confirmation and reminders via email/SMS
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold-400 hover:bg-gold-300 text-ink-900 text-lg py-6"
                >
                  Confirm Reservation
                </Button>
              </div>
            </form>
          </div>

          {/* RIGHT: Availability Table */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              {date && formData.partySize ? (
                <div className="bg-ink-700 rounded-lg border border-border p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-display text-mist-100">Available Times</h3>
                    <p className="text-sm text-mist-300 mt-2">
                      {format(date, 'MMMM d, yyyy')} • {formData.partySize} {parseInt(formData.partySize) === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setFormData({...formData, time: slot.time})}
                        className={cn(
                          "p-3 rounded border transition-all text-center",
                          "opacity-0 animate-fade-in",
                          slot.time === formData.time && "bg-gold-400 text-ink-900 border-gold-400 shadow-lg",
                          slot.available && slot.time !== formData.time && "border-border hover:border-gold-400 hover:bg-ink-600 text-mist-300",
                          !slot.available && "opacity-40 cursor-not-allowed text-mist-500 line-through"
                        )}
                        style={{
                          animationDelay: `${index * 60}ms`,
                          animationDuration: '240ms',
                          animationFillMode: 'forwards'
                        }}
                      >
                        <div className="text-base font-medium">{slot.time}</div>
                        {!slot.available && <div className="text-xs mt-1">Full</div>}
                      </button>
                    ))}
                  </div>

                  {availableSlots.length === 0 && (
                    <p className="text-center text-mist-400 py-8">
                      No available times for this date. Please choose another date.
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-ink-700 rounded-lg border border-border p-12 text-center">
                  <CalendarIcon className="mx-auto h-16 w-16 text-mist-500 mb-4" />
                  <p className="text-mist-300 text-lg">
                    Select date & party size to view availability
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DOCX Policies Section */}
        <div className="bg-ink-700 rounded-lg border border-border overflow-hidden">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-ink-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span className="text-lg font-display text-mist-100">
              View Full Reservation Details & Policies
            </span>
            {expanded ? <ChevronUp size={20} className="text-gold-400" /> : <ChevronDown size={20} className="text-gold-400" />}
          </button>

          {expanded && (
            <div 
              className="px-6 py-6 border-t border-border"
              style={{
                animation: 'expandDown 500ms cubic-bezier(.16,1,.3,1) forwards'
              }}
            >
              <div className="prose prose-invert max-w-none space-y-6 text-mist-300">
                <h3 className="text-2xl font-display text-mist-100 mb-4">How to Reserve</h3>
                
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Via Website:</strong> Once your reservation is ready, you will receive a confirmation message to your email (confirmation within 1 hour)
                  </li>
                  <li>
                    <strong>Instagram or Facebook:</strong> Send us a direct message (confirmation within 1 hour)
                  </li>
                  <li>
                    <strong>Urgent reservations:</strong> Call us via mobile number (14:00-22:00)
                  </li>
                </ol>

                <h3 className="text-2xl font-display text-mist-100 mt-8 mb-4">Working Hours</h3>
                <p className="text-lg">
                  Every day: <strong className="text-gold-400">18:30 - 02:00</strong>
                </p>

                <h3 className="text-2xl font-display text-mist-100 mt-8 mb-4">Dress Code</h3>
                <p>
                  Express yourself, but entrance control is applicable.
                </p>

                <h3 className="text-2xl font-display text-mist-100 mt-8 mb-4">House Rules</h3>
                <div className="p-4 border border-gold-400/20 rounded bg-ink-900/50">
                  <p className="text-gold-400">
                    <strong>It&apos;s not allowed:</strong> Loud talks outside the bar. Neighborhood comfort is our priority.
                  </p>
                </div>

                <h3 className="text-2xl font-display text-mist-100 mt-8 mb-4">Contact</h3>
                <div className="space-y-2">
                  <p><strong>Phone:</strong> <a href="tel:+37495426619" className="text-gold-400 hover:underline">+374 95 426 619</a></p>
                  <p><strong>Email:</strong> <a href="mailto:simonebarhome@gmail.com" className="text-gold-400 hover:underline">simonebarhome@gmail.com</a></p>
                  <p><strong>Address:</strong> 80 Aram st, Yerevan, Armenia</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }
      `}</style>
    </section>
  );
};

export default ReservationPanel;
