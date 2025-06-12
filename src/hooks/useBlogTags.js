import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';

export function useBlogTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTags() {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('blog')
          .select('tags');
        
        if (fetchError) throw fetchError;

        const allTags = [];
        data.forEach(item => {
          if (item.tags) {
            const itemTagsString = String(item.tags);
            itemTagsString.split(',').forEach(tag => {
              const trimmedTag = tag.trim();
              if (trimmedTag) {
                allTags.push(trimmedTag);
              }
            });
          }
        });

        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
      } catch (err) {
        console.error("Error fetching blog tags:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  return { tags, loading, error };
} 