import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export function useBlogPosts(page = 1, pageSize = 5, searchTerm = '', category = '', tag = '') {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true)
      try {
        let q = collection(db, 'blog')

        if (category) {
          q = query(q, where('category', '==', category))
        }

        const querySnapshot = await getDocs(q)
        let data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        if (tag) {
          data = data.filter(post => post.tags && post.tags.includes(tag))
        }

        if (searchTerm) {
          const lower = searchTerm.toLowerCase()
          data = data.filter(post =>
            (post.title && post.title.toLowerCase().includes(lower)) ||
            (post.short_description && post.short_description.toLowerCase().includes(lower))
          )
        }

        // Sort in memory memory
        data.sort((a, b) => (b.published_at?.toMillis?.() || 0) - (a.published_at?.toMillis?.() || 0))

        setTotalCount(data.length)

        // Manual pagination
        const from = (page - 1) * pageSize
        const to = from + pageSize
        const paginatedData = data.slice(from, to)

        setBlogPosts(paginatedData)
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