import {useState} from 'react'
import {useAsync} from 'react-async-hook'
import Eth from 'web3-eth'

export default function useEth() {
  const [eth, setEth] = useState()
  const {ethereum, web3} = window
  useAsync(async () => {
    const eth = new Eth(ethereum || web3.currentProvider)
    if (ethereum) await ethereum.enable()
    setEth(eth)
  }, [ethereum, web3])
  return eth
}
