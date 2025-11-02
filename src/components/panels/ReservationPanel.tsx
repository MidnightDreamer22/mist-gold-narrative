import { useState } from 'react';
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

const ReservationPanel = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
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
      <div className="section-content container mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-5xl md:text-6xl font-display text-mist-100 text-center mb-12">
          Reserve a Table
        </h2>

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="bg-ink-700 rounded-lg border border-border p-8 mb-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
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
              <Label htmlFor="time" className="text-mist-100">Time *</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                <SelectTrigger className="bg-ink-900 border-border text-mist-300">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-ink-900 border-border">
                  {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(time => (
                    <SelectItem key={time} value={time} className="text-mist-300">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
        </form>

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
              <div className="prose prose-invert max-w-none space-y-4 text-mist-300">
                <h3 className="text-2xl font-display text-mist-100">Reservation Information</h3>
                
                <p className="text-lg font-semibold text-gold-400">
                  📄 DOCX Content Placeholder
                </p>
                
                <p>
                  This section will display all reservation policies, notations, disclaimers, 
                  and instructions from your DOCX file. The content will include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reservation policies and cancellation terms</li>
                  <li>Dress code requirements</li>
                  <li>Group booking guidelines</li>
                  <li>Special event information</li>
                  <li>COVID-19 safety protocols</li>
                  <li>Payment and deposit policies</li>
                </ul>
                
                <div className="mt-6 p-4 border border-gold-400/20 rounded bg-ink-900/50">
                  <p className="text-sm text-gold-400">
                    📄 To add your policies: Upload your DOCX file and the content will automatically 
                    appear here with proper formatting (headings, lists, emphasis preserved).
                  </p>
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
