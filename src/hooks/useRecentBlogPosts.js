import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export function useRecentBlogPosts(postLimit = 5) {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecentPosts() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'blog'),
          orderBy('published_at', 'desc'),
          limit(postLimit)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setRecentPosts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentPosts();
  }, [postLimit]);

  return { recentPosts, loading, error };
} 