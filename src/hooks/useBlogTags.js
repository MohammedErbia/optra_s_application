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
          .select('tags, tags_ar');
        
        if (fetchError) throw fetchError;

        const allTags = [];
        data.forEach(item => {
          if (item.tags) {
            const itemTagsString = String(item.tags);
            const itemTagsArString = String(item.tags_ar || '');
            const tagsArr = itemTagsString.split(',');
            const tagsArArr = itemTagsArString.split(',');
            tagsArr.forEach((tag, idx) => {
              const trimmedTag = tag.trim();
              const trimmedTagAr = tagsArArr[idx] ? tagsArArr[idx].trim() : '';
              if (trimmedTag) {
                allTags.push({ name: trimmedTag, name_ar: trimmedTagAr });
              }
            });
          }
        });

        // Remove duplicates by English name
        const seen = new Set();
        const uniqueTags = allTags.filter(tagObj => {
          if (seen.has(tagObj.name)) return false;
          seen.add(tagObj.name);
          return true;
        });
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