import contract from 'truffle-contract'

export default async function deploy() {
  const {ethereum, web3} = window
  const FsDisk = contract(require('ethfs/build/contracts/FsDisk'))
  const Kernel = contract(require('ethfs/build/contracts/KernelImpl'))
  FsDisk.setProvider(ethereum || web3.currentProvider)
  Kernel.setProvider(ethereum || web3.currentProvider)
  if (ethereum) await ethereum.enable()
  const accounts = await Kernel.web3.eth.getAccounts()
  FsDisk.defaults({from: accounts[0]})
  Kernel.defaults({from: accounts[0]})
  const fsDisk = await FsDisk.new()
  const kernel = await Kernel.new(fsDisk.address)
  return kernel.address
}
