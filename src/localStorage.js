import {useState, useEffect} from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const value = localStorage.getItem(key)
    if (value) return JSON.parse(value)
    return initialValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
