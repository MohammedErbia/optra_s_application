import { useState, useEffect } from 'react';
import { supabase, supabaseQuery } from '../lib/supabase.ts';
import type { Work, Partner, Service, Testimonial, Social } from '../types';

interface UseDataOptions {
  table: 'works' | 'partners' | 'services' | 'testimonials' | 'socials';
  select?: string;
}

export function useData<T>({ table, select = '*' }: UseDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await supabaseQuery<T[]>(() =>
          supabase.from(table).select(select)
        );
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, select]);

  return { data, loading, error };
} 