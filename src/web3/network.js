import {useState} from 'react'
import {useAsync} from 'react-async-hook'
import useProvider from './provider'

export default function useNetwork() {
  const [network, setNetwork] = useState({})
  const provider = useProvider()
  useAsync(async () => {
    if (!provider) return setNetwork({})
    const {chainId} = await provider.getNetwork()
    let name = 'unknown'
    switch (chainId) {
    case 1666600000:
      name = 'harmony-s0'
      break
    case 1666600001:
      name = 'harmony-s1'
      break
    default:
    }
    setNetwork({chainId, name})
  }, [provider])
  return network
}
