import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export function useWorks() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWorks() {
      try {
        const q = query(collection(db, 'works'), orderBy('created_at', 'desc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        console.log('✅ Works fetched successfully:', data?.length || 0, 'items');
        setWorks(data || [])
      } catch (err) {
        console.error('❌ Error fetching works:', err);
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  return { works, loading, error }
} 