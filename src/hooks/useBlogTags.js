import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export function useBlogTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTags() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'blog'));
        const data = querySnapshot.docs.map(doc => doc.data());

        const allTags = [];
        data.forEach(item => {
          if (item.tags) {
            // Check if tags is an array in Firestore, otherwise handle string representation
            if (Array.isArray(item.tags)) {
              const tagsArArr = Array.isArray(item.tags_ar) ? item.tags_ar : [];
              item.tags.forEach((tag, idx) => {
                const trimmedTag = tag.trim();
                const trimmedTagAr = tagsArArr[idx] ? tagsArArr[idx].trim() : '';
                if (trimmedTag) {
                  allTags.push({ name: trimmedTag, name_ar: trimmedTagAr });
                }
              });
            } else {
              const itemTagsString = String(item.tags);
              const itemTagsArString = String(item.tags_ar || '');
              const tagsArr = itemTagsString.split(',');
              const tagsArArr = itemTagsArString.split(',');
              tagsArr.forEach((tag, idx) => {
                const trimmedTag = tag.trim();
                const trimmedTagAr = tagsArArr[idx] ? tagsArArr[idx].trim() : '';
                if (trimmedTag) {
                  allTags.push({ name: trimmedTag, name_ar: trimmedTagAr });
                }
              });
            }
          }
        });

        // Remove duplicates by English name
        const seen = new Set();
        const uniqueTags = allTags.filter(tagObj => {
          if (seen.has(tagObj.name)) return false;
          seen.add(tagObj.name);
          return true;
        });
        setTags(uniqueTags);
      } catch (err) {
        console.error("Error fetching blog tags:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  return { tags, loading, error };
} 