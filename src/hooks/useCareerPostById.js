import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useCareerPostById = (id) => {
  const [careerPost, setCareerPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareerPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, 'careers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCareerPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setCareerPost(null);
        }

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