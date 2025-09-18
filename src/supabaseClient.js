// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Usa la URL real de tu proyecto y tu clave pública (Anon Key)
const supabaseUrl = 'https://xqwzafiznwkjizmavuqe.supabase.co'  // tu Project URL real
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxd3phZml6bndraml6bWF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDcyMDYsImV4cCI6MjA3MzYyMzIwNn0.GHzY-I1OOhNHt0CGOo8gj2SuyPHf3UGA0BkoKzwIWk8'                                  // tu clave pública

export const supabase = createClient(supabaseUrl, supabaseKey)
