import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';

export function useBlogPostBySlug(slug) {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('blog')
          .select('*, helpful_yes_count, helpful_no_count')
          .eq('slug', slug)
          .single(); // Use .single() to get a single row
        
        if (fetchError) {
          if (fetchError.code === 'PGRST116') { // No rows found
            setBlogPost(null);
          } else {
            throw fetchError;
          }
        }
        setBlogPost(data);
      } catch (err) {
        console.error("Error fetching blog post by slug:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  return { blogPost, loading, error };
} 