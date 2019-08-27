import React from 'react'
import {useRoutes} from 'hookrouter'
import Home from './Home'
import Explore from './Explore'

const routes = {
  '/': () => <Home />,
  '/explore/:address': ({address}) => <Explore address={address} />,
}

const App = () => useRoutes(routes)
export default App
