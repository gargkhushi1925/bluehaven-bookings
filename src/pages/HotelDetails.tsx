import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Wifi, Wind, Coffee, Users } from "lucide-react";
import { RoomCard } from "@/components/RoomCard";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { data: hotel } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", hotelId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: rooms } = useQuery({
    queryKey: ["rooms", hotelId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("hotel_id", hotelId)
        .eq("available", true);
      
      if (error) throw error;
      return data;
    },
  });

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotels
          </Button>
        </div>
      </div>

      {/* Hotel Info */}
      <div className="container mx-auto max-w-6xl px-4 -mt-8">
        <Card className="overflow-hidden shadow-xl border-border">
          <div className="relative h-96">
            <img
              src={hotel.image_url}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-lg px-4 py-2">
              <Star className="w-5 h-5 mr-1 fill-current" />
              {hotel.rating}
            </Badge>
          </div>
          
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {hotel.name}
            </h1>
            
            <div className="flex items-center text-muted-foreground mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{hotel.address}, {hotel.city}, {hotel.country}</span>
            </div>
            
            <p className="text-foreground/80 text-lg leading-relaxed">
              {hotel.description}
            </p>
          </CardContent>
        </Card>

        {/* Rooms Section */}
        <div className="mt-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Available Rooms</h2>
          
          {rooms && rooms.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-border">
              <p className="text-muted-foreground text-lg">No rooms available at the moment.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
