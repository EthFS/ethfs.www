import {useState} from 'react'
import {useAsync} from 'react-async-hook'
import useWeb3 from './web3'

export default function useNetwork() {
  const [network, setNetwork] = useState('')
  const web3 = useWeb3()
  useAsync(async () => {
    if (!web3) return
    let network = await web3.eth.net.getNetworkType()
    if (network === 'private') {
      switch (await web3.eth.net.getId()) {
        case 5:
          network = 'goerli'
          break
        default:
      }
    }
    setNetwork(network)
  }, [web3])
  return network
}
