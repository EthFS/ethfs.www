import {useState} from 'react'
import {useAsync} from 'react-async-hook'
import Web3 from 'web3'

export default function useWeb3() {
  const [web3, setWeb3] = useState()
  const {ethereum} = window
  useAsync(async () => {
    const web3 = new Web3(ethereum || window.web3.currentProvider)
    if (ethereum) await ethereum.enable()
    setWeb3(web3)
  }, [ethereum, window.web3])
  return web3
}
