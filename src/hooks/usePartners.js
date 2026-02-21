import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export function usePartners() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPartners() {
      try {
        const querySnapshot = await getDocs(collection(db, 'partners'))
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        setPartners(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  return { partners, loading, error }
} 