import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';

export function useBlogSearchSuggestions(searchTerm, limit = 5) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let debounceTimeout;

    if (searchTerm.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    debounceTimeout = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('id, title, slug')
          .or(`title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`)
          .limit(limit);
        
        if (error) throw error;
        setSuggestions(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, limit]);

  return { suggestions, loading, error };
} 