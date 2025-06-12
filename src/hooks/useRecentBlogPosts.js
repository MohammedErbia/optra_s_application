import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';

export function useRecentBlogPosts(limit = 5) {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecentPosts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('id, title, cover_image_url, slug')
          .order('published_at', { ascending: false })
          .limit(limit);
        
        if (error) throw error;
        setRecentPosts(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPosts();
  }, [limit]);

  return { recentPosts, loading, error };
} 