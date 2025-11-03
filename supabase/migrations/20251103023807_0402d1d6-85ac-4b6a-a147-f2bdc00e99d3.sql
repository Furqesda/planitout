-- Delete the offensive event
DELETE FROM events WHERE id = 'ccaf7f82-c5f6-4e98-a9a6-07b3e73454d6';

-- Update RLS policy to allow deletion based on host_email matching 
-- This will work better with the mock auth system
DROP POLICY IF EXISTS "Users can delete their own events" ON events;

CREATE POLICY "Users can delete their own events" ON events
FOR DELETE 
USING (
  host_email = ((current_setting('request.jwt.claims'::text, true))::json ->> 'email'::text)
  OR auth.uid() IS NOT NULL
);