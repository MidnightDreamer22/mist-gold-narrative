import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import FrostCard from '@/components/FrostCard';
import { cn } from '@/lib/utils';

const Reservation = () => {
  useScrollReveal();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Reservation confirmed! See you soon.");
    }, 1500);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen pt-20 pb-16 bg-ink-900 flex items-center justify-center px-6">
        <FrostCard className="max-w-md text-center animate-scale-in">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-gold-400" />
            </div>
          </div>
          <h2 className="font-display text-display-lg text-mist-100 mb-4">
            You're In
          </h2>
          <p className="font-sans text-mist-300 mb-2">
            Your reservation has been confirmed.
          </p>
          {date && (
            <p className="font-sans text-gold-400">
              {format(date, 'PPPP')}
            </p>
          )}
          <Button 
            onClick={() => window.location.href = '/'}
            className="mt-8 bg-gold-400 text-ink-900 hover:bg-gold-300"
          >
            Return Home
          </Button>
        </FrostCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16 bg-ink-900">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12" data-reveal>
          <h1 className="font-display text-display-lg md:text-display-xl text-mist-100 mb-4">
            Reserve a Table
          </h1>
          <p className="font-sans text-lg text-mist-300">
            Secure your spot for an evening of exceptional drinks and atmosphere
          </p>
        </div>

        {/* Form */}
        <div data-reveal>
          <FrostCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date */}
              <div>
                <Label htmlFor="date" className="text-mist-300 mb-2 block">
                  Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Party Size & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="party" className="text-mist-300 mb-2 block">
                    Party Size *
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time" className="text-mist-300 mb-2 block">
                    Time *
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="18:30">6:30 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="19:30">7:30 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="20:30">8:30 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="21:30">9:30 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-mist-300 mb-2 block">
                    Name *
                  </Label>
                  <Input 
                    id="name"
                    required
                    placeholder="Your name"
                    className="bg-ink-700 border-border text-mist-300"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-mist-300 mb-2 block">
                    Email *
                  </Label>
                  <Input 
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="bg-ink-700 border-border text-mist-300"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-mist-300 mb-2 block">
                  Phone *
                </Label>
                <Input 
                  id="phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  className="bg-ink-700 border-border text-mist-300"
                />
              </div>

              {/* Special Requests */}
              <div>
                <Label htmlFor="notes" className="text-mist-300 mb-2 block">
                  Special Requests
                </Label>
                <Textarea 
                  id="notes"
                  placeholder="Dietary restrictions, occasion, seating preferences..."
                  className="bg-ink-700 border-border text-mist-300 min-h-[100px]"
                />
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gold-400 text-ink-900 hover:bg-gold-300 h-12 text-lg"
              >
                {isSubmitting ? 'Reserving...' : 'Confirm Reservation'}
              </Button>
            </form>
          </FrostCard>
        </div>
      </div>
    </main>
  );
};

export default Reservation;
