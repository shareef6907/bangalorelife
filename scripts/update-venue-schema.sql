-- Update venues table to allow more types
ALTER TABLE venues DROP CONSTRAINT IF EXISTS venues_type_check;

-- Add new constraint with expanded types
ALTER TABLE venues ADD CONSTRAINT venues_type_check CHECK (
  type IN (
    'pub', 'bar', 'brewery', 'club', 'lounge', 'rooftop', 'cafe', 'restaurant',
    'hotel', 'gym', 'spa', 'salon', 'hospital', 'pharmacy', 'dentist',
    'bank', 'atm', 'supermarket', 'bakery', 'school', 'library', 'mall', 'cinema',
    'coworking', 'wedding_venue', 'bookstore', 'electronics', 'street_food',
    'temple', 'church', 'mosque', 'tech_park', 'gallery', 'museum', 'park',
    'other'
  )
);
