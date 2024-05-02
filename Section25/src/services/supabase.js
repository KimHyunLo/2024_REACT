import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ewmsbhskamiyjmvtwqyr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bXNiaHNrYW1peWptdnR3cXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MzI2OTIsImV4cCI6MjAzMDIwODY5Mn0.zS7QbG3-Syrxk2r99WO8W3prvfPnLWdOlQfLEVbbuHs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
