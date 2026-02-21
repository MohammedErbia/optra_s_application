import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface MissionStat {
  id: string;
  created_at: string;
  label: string;
  value: number;
  type: string;
}

export function useMissionStats() {
  const [data, setData] = useState<MissionStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'mission_stats'));
        const result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MissionStat[];
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