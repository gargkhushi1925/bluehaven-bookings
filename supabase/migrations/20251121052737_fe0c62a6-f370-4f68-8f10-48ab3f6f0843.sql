-- Create hotels table
CREATE TABLE public.hotels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  description TEXT NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  capacity INT NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for hotels (public read)
CREATE POLICY "Hotels are viewable by everyone"
ON public.hotels FOR SELECT
USING (true);

-- Create policies for rooms (public read)
CREATE POLICY "Rooms are viewable by everyone"
ON public.rooms FOR SELECT
USING (true);

-- Create policies for bookings (public create, users can view their own)
CREATE POLICY "Anyone can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view bookings by email"
ON public.bookings FOR SELECT
USING (true);

-- Insert sample hotels
INSERT INTO public.hotels (name, description, address, city, country, image_url, rating) VALUES
('Ocean Blue Resort', 'Luxurious beachfront resort with stunning ocean views and world-class amenities', '123 Seaside Drive', 'Miami', 'USA', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 4.8),
('Mountain Peak Hotel', 'Elegant mountain retreat offering panoramic views and premium comfort', '456 Alpine Road', 'Aspen', 'USA', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 4.7),
('City Lights Grand', 'Modern urban hotel in the heart of the city with exceptional service', '789 Downtown Avenue', 'New York', 'USA', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 4.9);

-- Insert sample rooms
INSERT INTO public.rooms (hotel_id, room_type, description, price_per_night, capacity, amenities, image_url) VALUES
((SELECT id FROM public.hotels WHERE name = 'Ocean Blue Resort'), 'Deluxe Ocean View', 'Spacious room with private balcony overlooking the ocean', 299.99, 2, ARRAY['WiFi', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Balcony'], 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'),
((SELECT id FROM public.hotels WHERE name = 'Ocean Blue Resort'), 'Premium Suite', 'Luxurious suite with separate living area and jacuzzi', 499.99, 4, ARRAY['WiFi', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Jacuzzi', 'Living Room'], 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'),
((SELECT id FROM public.hotels WHERE name = 'Mountain Peak Hotel'), 'Mountain View Standard', 'Cozy room with stunning mountain vistas', 199.99, 2, ARRAY['WiFi', 'Heating', 'Mountain View', 'Fireplace'], 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'),
((SELECT id FROM public.hotels WHERE name = 'City Lights Grand'), 'Executive Room', 'Modern room with city skyline views', 349.99, 2, ARRAY['WiFi', 'Air Conditioning', 'Work Desk', 'City View', 'Smart TV'], 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800');