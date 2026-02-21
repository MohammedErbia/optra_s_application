import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

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
        const q = query(collection(db, 'blog'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setBlogPost(null);
        } else {
          const doc = querySnapshot.docs[0];
          setBlogPost({ id: doc.id, ...doc.data() });
        }
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