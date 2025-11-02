import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event, getRandomDistance } from "@/lib/sampleEvents";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  onViewDetails: () => void;
  onAttend: () => void;
  isAttended?: boolean;
}

const EventCard = ({ event, onViewDetails, onAttend, isAttended }: EventCardProps) => {
  const distance = event.distance || getRandomDistance();

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 glass-dark rounded-full px-2 sm:px-3 py-1 text-xs font-medium text-white">
          {distance}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold tracking-wide line-clamp-1">
          {event.title}
        </h3>

        <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{format(new Date(event.date), "MMM dd, yyyy • h:mm a")}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <span>
              {event.current_participants} / {event.max_participants} attending
            </span>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onViewDetails}
            className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105"
            size="sm"
          >
            View Details
          </Button>
          <Button
            onClick={onAttend}
            disabled={isAttended}
            className="flex-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105"
            size="sm"
          >
            {isAttended ? "Attending ✓" : "Attend"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
