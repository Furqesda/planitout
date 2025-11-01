-- Create events table for PlanItout
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 20,
  current_participants INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  host_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to create events
CREATE POLICY "Users can create their own events" 
ON public.events 
FOR INSERT 
WITH CHECK (true);

-- Create policy for users to update their own events
CREATE POLICY "Users can update their own events" 
ON public.events 
FOR UPDATE 
USING (host_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy for users to delete their own events
CREATE POLICY "Users can delete their own events" 
ON public.events 
FOR DELETE 
USING (host_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for performance
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_location ON public.events(location);
CREATE INDEX idx_events_host_email ON public.events(host_email);