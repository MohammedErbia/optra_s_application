import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { retry } from '../utils/retry';

interface Testimonial {
  id: string;
  created_at: string;
  quote: string;
  name: string;
  user_image: string; // Assuming user_image is a string URL or path
}

// Wrapper function with retry mechanism (copied from supabase.ts)
async function supabaseQuery<T>(
  query: () => Promise<{ data: T; error: any }>,
  options = { maxAttempts: 3, delay: 1000 }
) {
  return retry(
    async () => {
      const { data, error } = await query();
      if (error) throw error;
      return data;
    },
    options
  );
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await supabaseQuery<Testimonial[]>(async () => {
          const { data, error } = await supabase.from('testimonials').select('*');
          return { data, error };
        });
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
} 