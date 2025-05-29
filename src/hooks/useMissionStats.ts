import { useState, useEffect } from 'react';
import { supabase, supabaseQuery } from '../lib/supabase.ts';

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
        const result = await supabaseQuery<MissionStat[]>(async () => {
          const { data, error } = await supabase.from('mission_stats').select('*');
          return { data, error };
        });
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