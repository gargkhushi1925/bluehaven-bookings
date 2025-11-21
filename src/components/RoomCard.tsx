import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Room {
  id: string;
  room_type: string;
  description: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  image_url: string;
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-gradient-to-b from-card to-card/50">
      <div className="relative h-56">
        <img
          src={room.image_url}
          alt={room.room_type}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-foreground">
            {room.room_type}
          </h3>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            <Users className="w-4 h-4 mr-1" />
            {room.capacity}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {room.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-3xl font-bold text-foreground">
              {room.price_per_night}
            </span>
            <span className="text-muted-foreground ml-2">/ night</span>
          </div>
          
          <Button 
            onClick={() => navigate(`/booking/${room.id}`)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
