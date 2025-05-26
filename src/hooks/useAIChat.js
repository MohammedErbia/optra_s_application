import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useAIChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (message, serviceType) => {
    setLoading(true)
    try {
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: message }])

      // Get AI response from Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message, serviceType }
      })

      if (error) throw error

      // Add AI response
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error in AI chat:', error)
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
} 