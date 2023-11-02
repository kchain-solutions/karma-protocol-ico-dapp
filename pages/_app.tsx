import { Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import React, { ReactNode, useEffect } from 'react'

import { ConnectionType, getConnection, PRIORITIZED_CONNECTORS } from '../utils/connections'
import { AppProps } from 'next/app';


async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}


const connectEagerly = async () => {
  await connect(getConnection(ConnectionType.NETWORK).connector)
  await connect(getConnection(ConnectionType.GNOSIS_SAFE).connector)
}


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    connectEagerly()
  }, [])

  return (
    <div className="app-container">
      <Web3ReactProvider connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [connector.connector, connector.hooks])}>
        <p>Header</p>
        <Component {...pageProps} />
        <p>Footer</p>
      </Web3ReactProvider>
    </div>
  );
}

export default MyApp
