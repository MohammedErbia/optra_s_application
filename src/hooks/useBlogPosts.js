import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.ts'

export function useBlogPosts(page = 1, pageSize = 5, searchTerm = '', category = '', tag = '') {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true)
      try {
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        let query = supabase
          .from('blog')
          .select('*', { count: 'exact' })
          .order('published_at', { ascending: false })

        if (searchTerm) {
          query = query.or(`title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`)
        }

        if (category) {
          query = query.eq('category', category)
        }

        if (tag) {
          query = query.filter('tags', 'cs', `{${tag}}`)
        }

        const { data, error: fetchError, count } = await query.range(from, to)
        
        if (fetchError) throw fetchError
        setBlogPosts(data || [])
        setTotalCount(count || 0)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [page, pageSize, searchTerm, category, tag])

  return { blogPosts, loading, error, totalCount }
} 