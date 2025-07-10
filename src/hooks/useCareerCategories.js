import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const useCareerCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all jobs to count categories client-side
        // Supabase does not have a direct count by group in a single select query via client library
        const { data, error } = await supabase
          .from('careers')
          .select('category, category_ar');

        if (error) {
          throw error;
        }

        const categoryCounts = data.reduce((acc, job) => {
          const categoryName = job.category;
          const categoryNameAr = job.category_ar;
          if (categoryName) {
            const key = categoryName;
            acc[key] = acc[key] || { name: categoryName, name_ar: categoryNameAr, count: 0 };
            acc[key].count += 1;
          }
          return acc;
        }, {});

        const formattedCategories = Object.values(categoryCounts);

        // Add static categories if they don't exist in fetched data, and sort them
        const staticCategoriesOrder = ["HT & ADMIN", "ENGINEERING", "SUPPORT", "DESIGN", "DIGITAL MARKETING"];
        const finalCategories = staticCategoriesOrder.map(staticCat => {
            const foundCat = formattedCategories.find(fc => fc.name === staticCat);
            return foundCat || { name: staticCat, name_ar: '', count: 0 };
        });

        setCategories(finalCategories);
      } catch (err) {
        console.error("Error fetching career categories:", err);
        setError(err.message || "Failed to fetch career categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCareerCategories; 