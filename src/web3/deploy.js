import {forEach} from 'lodash'
import {ContractFactory} from '@ethersproject/contracts'
const FsDisk = require('ethfs/build/contracts/FsDisk')
const Kernel = require('ethfs/build/contracts/KernelImpl')

export default async function deploy(provider) {
  const {chainId} = await provider.getNetwork()
  const fsDiskFactory = new ContractFactory(FsDisk.abi, link(FsDisk, chainId), provider.getSigner())
  const kernelFactory = new ContractFactory(Kernel.abi, link(Kernel, chainId), provider.getSigner())
  const fsDisk = await fsDiskFactory.deploy()
  await fsDisk.deployTransaction.wait()
  const kernel = await kernelFactory.deploy(fsDisk.address)
  await kernel.deployTransaction.wait()
  return kernel.address
}

function link({bytecode, networks}, chainId) {
  forEach(networks[chainId].links, (address, name) => {
    bytecode = bytecode.replace(new RegExp(`__${name}_+`, 'g'), address.slice(2))
  })
  return bytecode
}
