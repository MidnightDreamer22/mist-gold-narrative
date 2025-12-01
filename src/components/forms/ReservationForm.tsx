import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReservationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  showDownloadICS?: boolean;
}

const timeSlots = [
  "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00",
  "23:30", "00:00", "00:30", "01:00", "01:30"
];

const ReservationForm = ({ onSuccess, compact = false, showDownloadICS = true }: ReservationFormProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    partySize: "",
    time: "",
    notes: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !formData.name || !formData.email || !formData.partySize || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reservation Submitted",
      description: "You'll receive confirmation within 1 hour via email.",
    });
    
    setSubmitted(true);
    onSuccess?.();
  };

  const handleDownloadICS = () => {
    if (!date) return;
    
    const event = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${format(date, "yyyyMMdd")}T${formData.time.replace(":", "")}00`,
      `DTEND:${format(date, "yyyyMMdd")}T${formData.time.replace(":", "")}00`,
      "SUMMARY:Reservation at Simona",
      `DESCRIPTION:Party of ${formData.partySize}`,
      "LOCATION:80 Aram st, Yerevan, Armenia",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    
    const blob = new Blob([event], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "simona-reservation.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (submitted) {
    return (
      <div className={cn("text-center space-y-6", compact ? "py-8" : "py-12")}>
        <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className={cn("font-display text-mist-100", compact ? "text-3xl" : "text-4xl")}>
          Thank you, {formData.name}!
        </h3>

        <div className="bg-ink-700 !bg-opacity-100 rounded-lg p-6 space-y-3 text-mist-300 max-w-lg mx-auto">
          <p>
            <strong>Date:</strong> {date && format(date, "MMMM d, yyyy")}
          </p>
          <p>
            <strong>Time:</strong> {formData.time}
          </p>
          <p>
            <strong>Party Size:</strong> {formData.partySize} guests
          </p>
          <p className="pt-4 text-sm">
            ✉️ Confirmation will be sent to <strong>{formData.email}</strong> within 1 hour
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          {showDownloadICS && (
            <Button onClick={handleDownloadICS} className="bg-gold-400 hover:bg-gold-300 text-ink-900">
              <Download size={20} className="mr-2" />
              Add to Calendar
            </Button>
          )}

          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-border text-mist-300 hover:bg-ink-700 !bg-opacity-100"
          >
            Modify Reservation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", compact && "space-y-3")}>
      <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "grid-cols-1")}>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-mist-100">
            Full Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-ink-900 !bg-opacity-100 border-border text-mist-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-mist-100">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-ink-900 !bg-opacity-100 border-border text-mist-300"
            required
          />
        </div>
      </div>

      <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "grid-cols-1")}>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-mist-100">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-ink-900 !bg-opacity-100 border-border text-mist-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="partySize" className="text-mist-100">
            Party Size *
          </Label>
          <Select
            value={formData.partySize}
            onValueChange={(value) => setFormData({ ...formData, partySize: value })}
          >
            <SelectTrigger className="bg-ink-900 !bg-opacity-100 border-border text-mist-300">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-ink-900 !bg-opacity-100 border-border z-[80]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={String(num)} className="text-mist-300">
                  {num} {num === 1 ? "guest" : "guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "grid-cols-1")}>
        <div className="space-y-2">
          <Label className="text-mist-100">Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-ink-900 !bg-opacity-100 border-border text-mist-300 hover:bg-ink-700"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-ink-900 !bg-opacity-100 border-border z-[80]">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-mist-100">
            Time *
          </Label>
          <Select
            value={formData.time}
            onValueChange={(value) => setFormData({ ...formData, time: value })}
          >
            <SelectTrigger className="bg-ink-900 !bg-opacity-100 border-border text-mist-300">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className="bg-ink-900 !bg-opacity-100 border-border z-[80]">
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time} className="text-mist-300">
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-mist-100">
          Special Requests
        </Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="bg-ink-900 !bg-opacity-100 border-border text-mist-300 min-h-[80px]"
          placeholder="Any special requests or dietary restrictions?"
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
        className={cn("w-full bg-gold-400 hover:bg-gold-300 text-ink-900", compact ? "py-5" : "text-lg py-6")}
      >
        Confirm Reservation
      </Button>
    </form>
  );
};

export default ReservationForm;
