import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useWorks() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWorks() {
      try {
        const { data, error } = await supabase
          .from('works')
          .select('*')
        
        if (error) throw error
        setWorks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  return { works, loading, error }
} 