import React from 'react'
import Explorer from 'ethfsplorer'

export default function Explore({address}) {
  return (
    <div className="d-flex flex-column vh-100">
      <div className="m-2">
        <i>Ethfsplorer</i>: viewing disk at {address}
      </div>
      <div className="flex-grow-1 mb-2">
        <Explorer address={address} />
      </div>
    </div>
  )
}
