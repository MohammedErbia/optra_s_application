import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useCareers = (category = null) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        let q = collection(db, 'careers');

        if (category && category !== "All") {
          q = query(q, where('category', '==', category));
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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