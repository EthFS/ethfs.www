import {useState} from 'react'
import {useAsync} from 'react-async-hook'
import useEth from './eth'

export default function useNetwork() {
  const [network, setNetwork] = useState('')
  const eth = useEth()
  useAsync(async () => {
    if (!eth) return
    let network = await eth.net.getNetworkType()
    if (network === 'private') {
      switch (await eth.net.getId()) {
        case 5:
          network = 'goerli'
          break
        default:
      }
    }
    setNetwork(network)
  }, [eth])
  return network
}
