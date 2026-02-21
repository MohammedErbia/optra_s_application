import { useState } from 'react'
// import { supabase } from '../lib/supabase.ts' // Removed supabase

export function useAIChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message, serviceType) => {
    setLoading(true)
    try {
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: message }])

      // Migration note: Supabase Edge Functions was used here.
      console.warn('AI Chat is currently disabled. Needs migration to Firebase Cloud Functions.');

      // Add a dummy response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'AI chat service is temporarily unavailable.' }])
        setLoading(false)
      }, 1000)

    } catch (error) {
      console.error('Error in AI chat:', error)
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
} 