import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://krttmsatnftkdnbtwouy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydHRtc2F0bmZ0a2RuYnR3b3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDQyODYsImV4cCI6MjA5NDk4MDI4Nn0.av5L6-CHe_9VkTUuOdUenZ-B8beMqPhJA59KIVAfIlY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
