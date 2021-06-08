import {useState, useEffect} from 'react'
import {Web3Provider} from '@ethersproject/providers'

export default function useProvider() {
  const [provider, setProvider] = useState()
  const {ethereum} = window
  useEffect(() => {
    setProvider(new Web3Provider(ethereum))
    ethereum.on('chainChanged', () => {
      setProvider(new Web3Provider(ethereum))
    })
  }, [ethereum])
  return provider
}
