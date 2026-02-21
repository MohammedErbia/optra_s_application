import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export function useBlogCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'blog'));
        const data = querySnapshot.docs.map(doc => doc.data());

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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
} 