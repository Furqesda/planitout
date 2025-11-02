import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Mail } from "lucide-react";
import { Event, getRandomDistance } from "@/lib/sampleEvents";
import { format } from "date-fns";

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onAttend: () => void;
  isAttended?: boolean;
}

const EventModal = ({ event, isOpen, onClose, onAttend, isAttended }: EventModalProps) => {
  if (!event) return null;

  const distance = event.distance || getRandomDistance();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto glass p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-wide">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 glass-dark rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white">
              {distance}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">About this event</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="grid gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-xs sm:text-sm">Location</div>
                  <div className="text-muted-foreground text-xs sm:text-sm truncate">{event.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-xs sm:text-sm">Date & Time</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    {format(new Date(event.date), "EEE, MMM dd, yyyy 'at' h:mm a")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-xs sm:text-sm">Participants</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    {event.current_participants} of {event.max_participants} spots filled
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-xs sm:text-sm">Host</div>
                  <div className="text-muted-foreground text-xs sm:text-sm truncate">{event.host_email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-xs sm:text-sm transition-all duration-300"
              size="sm"
            >
              Close
            </Button>
            <Button
              onClick={onAttend}
              disabled={isAttended}
              className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              size="sm"
            >
              {isAttended ? "Attending ✓" : "Attend Event"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
