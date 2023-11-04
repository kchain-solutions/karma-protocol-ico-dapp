import { Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import React, { useEffect } from 'react'

import { ConnectionType, getConnection, PRIORITIZED_CONNECTORS } from '../utils/connections'
import { AppProps } from 'next/app'
import { Box, ThemeProvider } from '@mui/material'
import { theme } from 'style'


async function connect( connector: Connector ) {
	try {
		if ( connector.connectEagerly ) {
			await connector.connectEagerly()
		} else {
			await connector.activate()
		}
	} catch ( error ) {
		console.debug( `web3-react eager connection error: ${error}` )
	}
}


const connectEagerly = async () => {
	await connect( getConnection( ConnectionType.NETWORK ).connector )
}


function MyApp( { Component, pageProps }: AppProps ) {
	useEffect( () => {
		connectEagerly()
	}, [] )

	return (
		<ThemeProvider theme={theme}>
			<Web3ReactProvider connectors={Object.values( PRIORITIZED_CONNECTORS ).map( ( connector ) => [connector.connector, connector.hooks] )}>
				<Component {...pageProps} />
			</Web3ReactProvider>
		</ThemeProvider>
	)
}

export default MyApp
