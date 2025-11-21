import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  image_url: string;
  rating: number;
}

interface HotelListProps {
  hotels: Hotel[];
}

export function HotelList({ hotels }: HotelListProps) {
  const navigate = useNavigate();

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No hotels found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <Card 
          key={hotel.id} 
          className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border bg-gradient-to-b from-card to-card/50"
          onClick={() => navigate(`/hotel/${hotel.id}`)}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={hotel.image_url}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {hotel.rating}
            </Badge>
          </div>
          
          <CardContent className="p-5">
            <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
              {hotel.name}
            </h3>
            
            <div className="flex items-center text-muted-foreground text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hotel.city}, {hotel.country}</span>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {hotel.description}
            </p>
            
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              View Rooms
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
