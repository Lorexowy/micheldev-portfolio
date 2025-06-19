// src/hooks/useMouseFollower.ts
import { useState, useEffect } from 'react'

export function useMouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}

// Funkcja pomocnicza do generowania stylu tła
export function getMouseFollowerBackground(mousePosition: { x: number; y: number }) {
  return `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`
}