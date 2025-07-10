import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useCareers = (category = null) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from('careers').select('id, title, title_ar, description, description_ar, image, content, category, link_share, helpful_yes_count, helpful_no_count, job_summary, deadline');

        if (category && category !== "All") {
          query = query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }
        setJobs(data);
      } catch (err) {
        console.error("Error fetching careers:", err);
        setError(err.message || "Failed to fetch job openings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  return { jobs, loading, error };
};

export default useCareers; 