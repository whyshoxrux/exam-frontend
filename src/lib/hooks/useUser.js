"use client"

import { useState, useEffect } from "react"

export const useUser = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart-items")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err)
        console.error("Failed to fetch user:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLoading, error }
}
