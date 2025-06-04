import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.ts'

export function usePartners() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPartners() {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
        
        if (error) throw error
        setPartners(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  return { partners, loading, error }
} 