import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export function useBlogSearchSuggestions(searchTerm, suggestionLimit = 5) {
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
        // Firestore lacks robust full-text search. Fetching a limited set and filtering in-memory
        // as a workaround. A better solution (like Algolia or Typesense) is recommended for production.
        const q = query(collection(db, 'blog'), limit(suggestionLimit * 5));
        const querySnapshot = await getDocs(q);
        let data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const lowerSearchTerm = searchTerm.toLowerCase();

        const filteredData = data.filter(post =>
          (post.title && post.title.toLowerCase().includes(lowerSearchTerm)) ||
          (post.short_description && post.short_description.toLowerCase().includes(lowerSearchTerm))
        );

        setSuggestions(filteredData.slice(0, suggestionLimit));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, suggestionLimit]);

  return { suggestions, loading, error };
} 