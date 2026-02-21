import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface UseDataOptions {
  table: 'works' | 'partners' | 'services' | 'testimonials' | 'socials';
}

export function useData<T>({ table }: UseDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, table));
        const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table]);

  return { data, loading, error };
} 