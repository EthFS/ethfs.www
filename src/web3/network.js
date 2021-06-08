import {useState} from 'react'
import {useAsync} from 'react-async-hook'
import useProvider from './provider'

export default function useNetwork() {
  const [network, setNetwork] = useState('')
  const provider = useProvider()
  useAsync(async () => {
    if (!provider) return
    const {chainId} = await provider.getNetwork()
    switch (chainId) {
    case 1666600000:
      setNetwork('harmony-s0')
      break
    case 1666600001:
      setNetwork('harmony-s1')
      break
    default:
    }
  }, [provider])
  return network
}
