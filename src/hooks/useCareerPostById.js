import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useCareerPostById = (id) => {
  const [careerPost, setCareerPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareerPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('careers')
          .select('*, helpful_yes_count, helpful_no_count, job_summary')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setCareerPost(data);
      } catch (err) {
        console.error("Error fetching career post by ID:", err);
        setError(err.message || "Failed to fetch career post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCareerPost();
    }
  }, [id]);

  return { careerPost, loading, error };
};

export default useCareerPostById; 