import {useState, useEffect} from 'react'
import {assignWith, isEqual, unionWith} from 'lodash'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const value = localStorage.getItem(key)
    if (value) {
      return assignWith(JSON.parse(value), initialValue, (x, y) => unionWith(x, y, isEqual))
    }
    return initialValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
