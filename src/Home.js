import React, {useState} from 'react'
import {
  Button, Container, Row, Col,
  Nav, NavItem, NavLink,
  Collapse, Navbar, NavbarBrand, NavbarToggler,
} from 'reactstrap'
import {useAsync} from 'react-async-hook'
import './Home.css'
import useEth from './web3/eth'

function App() {
  const [collapsed, setCollapsed] = useState(true)
  const [address, setAddress] = useState()
  const eth = useEth()
  const [network, setNetwork] = useState('')
  useAsync(async () => {
    if (!eth) return
    setNetwork(await eth.net.getNetworkType())
  }, [eth])
  const disks = {
    rinkeby: [
      {
        label: 'Public disk',
        address: '0x5Cf933FA84CBada4D17f4CAC9278BF3A1a09c741',
      },
    ],
  }
  function loadDisk() {
    window.location = `/explore/${address}`
  }
  return (
    <div id="page-top">
      <Navbar dark color="dark" fixed="top" expand="lg">
        <Container>
          <NavbarBrand href="#page-top">EthFS</NavbarBrand>
          <NavbarToggler onClick={() => setCollapsed(!collapsed)} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <NavLink href="#about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#explore">Explore</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#project">Project</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <header className="bg-primary text-white">
        <Container className="text-center">
          <h1>EthFS</h1>
          <p className="lead">
            A Unix-like filesystem for Ethereum
          </p>
        </Container>
      </header>

      <section id="about">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto">
              <h2>What is EthFS</h2>
              <p className="lead">
                EthFS lets you create your own virtual disk drive running on the Ethereum blockchain.
              </p>
              <p className="lead">
                Why might this be a good idea?
              </p>
              <ul>
                <li>Uncensorable, anonymous, immutable disk storage</li>
                <li>Easily share files with others or the wider public</li>
                <li>Directories are supported</li>
                <li>Set permissions on files to control who can read or write to them (N.B. data is never truly hidden as the Ethereum blockchain is a publicly readable data structure)</li>
                <li>Pay only for what you write; zero cost for ongoing storage and read access</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="explore" className="bg-light">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto">
              <h2>Explore</h2>
              <p className="lead">
                Create your own disk or use an existing public disk.
              </p>
              <p>
                Current network: {network}
              </p>
              <select size="8" onChange={e => setAddress(e.target.value)}>
                {disks[network] && disks[network].map(x =>
                  <option key={x.address} value={x.address}>
                    {x.label} ({x.address})
                  </option>
                )}
              </select>
              <div style={{marginTop: 10}}>
                <Button color="primary">
                  Create Disk
                </Button>{' '}
                <Button color="primary" disabled={!address} onClick={loadDisk}>
                  Load Disk
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="project">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto">
              <h2>Project</h2>
              <p className="lead">
                Access the source code on GitHub:
              </p>
                <li><a href="https://github.com/hectorchu/ethfs">Smart contracts</a></li>
                <li><a href="https://github.com/hectorchu/ethfsplorer">Ethfsplorer component</a></li>
              <ul>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="py-5 bg-dark">
      </footer>
    </div>
  );
}

export default App;
