import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';

export function useBlogCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('category');
        
        if (error) throw error;

        // Extract unique categories, handling potential nulls or empty strings
        const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
} 