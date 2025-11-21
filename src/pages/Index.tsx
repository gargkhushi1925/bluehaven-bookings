import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { HotelList } from "@/components/HotelList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [searchCity, setSearchCity] = useState("");
  
  const { data: hotels } = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("rating", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredHotels = hotels?.filter(hotel => 
    searchCity ? hotel.city.toLowerCase().includes(searchCity.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              Discover luxury hotels and resorts worldwide
            </p>
          </div>

          {/* Search Card */}
          <Card className="p-6 shadow-lg bg-card/95 backdrop-blur animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Where are you going?"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="pl-10 h-12 border-border"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="date"
                    placeholder="Check-in"
                    className="pl-10 h-12 border-border"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="date"
                    placeholder="Check-out"
                    className="pl-10 h-12 border-border"
                  />
                </div>
              </div>
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {searchCity ? `Hotels in ${searchCity}` : "Featured Hotels"}
            </h2>
            <p className="text-muted-foreground">
              Explore our handpicked selection of premium accommodations
            </p>
          </div>
          
          <HotelList hotels={filteredHotels || []} />
        </div>
      </section>
    </div>
  );
};

export default Index;
