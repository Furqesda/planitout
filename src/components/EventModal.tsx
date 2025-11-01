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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-wide">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 right-4 glass-dark rounded-full px-4 py-2 text-sm font-medium text-white">
              {distance}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">About this event</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">{event.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Date & Time</div>
                  <div className="text-muted-foreground">
                    {format(new Date(event.date), "EEEE, MMMM dd, yyyy 'at' h:mm a")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Participants</div>
                  <div className="text-muted-foreground">
                    {event.current_participants} of {event.max_participants} spots filled
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Host</div>
                  <div className="text-muted-foreground">{event.host_email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 transition-all duration-300"
            >
              Close
            </Button>
            <Button
              onClick={onAttend}
              disabled={isAttended}
              className="flex-1 transition-all duration-300 hover:scale-105"
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
