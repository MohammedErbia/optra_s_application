import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Testimonial {
  id: string;
  created_at: string;
  quote: string;
  name: string;
  user_image: string;
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[];
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
} 