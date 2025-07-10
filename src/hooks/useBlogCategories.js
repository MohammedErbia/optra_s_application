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
          .select('category, category_ar');
        
        if (error) throw error;

        // Extract unique categories, handling potential nulls or empty strings
        const uniqueCategories = [];
        const seen = new Set();
        data.forEach(item => {
          if (item.category && !seen.has(item.category)) {
            uniqueCategories.push({ name: item.category, name_ar: item.category_ar });
            seen.add(item.category);
          }
        });
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