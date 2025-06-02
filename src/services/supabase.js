/*eslint-disable*/
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ckeshpohmxrumccvqdhm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZXNocG9obXhydW1jY3ZxZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDAyOTAsImV4cCI6MjA2NDQ3NjI5MH0.BTPwCiL1tvVZxDEhkL-r2YdU4iliDIF78uVEDf7N61Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
