import React, { useEffect, useState } from 'react'
import { Box, Popover } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import Web3ConnectionOptions from 'components/molecules/Web3ConnectionOptions'
import { ConnectionType, PRIORITIZED_CONNECTORS, getConnection, tryActivateConnector } from 'utils/connections'
import { StandardButton } from 'components/atoms/Buttons'
import { ellipsis } from 'utils/parsing'
import { AddEthereumChainParameter } from '@web3-react/types'


const ConnectButton = () => {

	const addChainParameter: AddEthereumChainParameter = {
		chainId: Number( process.env.NEXT_PUBLIC_CHAIN_ID ),
		chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
		rpcUrls: [''],
		nativeCurrency: {
			name:process.env.NEXT_PUBLIC_NATIVE_CURRENCY_NAME, 
			symbol: process.env.NEXT_PUBLIC_NATIVE_CURRENCY_SYMBOL, 
			decimals: 18},
		blockExplorerUrls: [process.env.NEXT_PUBLIC_TX_SCANNER],
	}

	const [open, setOpen] = useState( false )
	const [buttonLabel, setButtonLabel] = useState<String>( 'Connect' )
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>( null )
	const { account, isActive } = useWeb3React()
	const [connectionType, setConnectionType] = useState<ConnectionType | null>( null )

	const handleClick = ( event: React.MouseEvent<HTMLButtonElement> ) => {
		setAnchorEl( event.currentTarget )
		setOpen( true )
	}
	const handleClose = () => setOpen( false )
	const id = open ? 'simple-popover' : undefined

	useEffect( () => {
		tryLoadSession()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] )

	const tryLoadSession = async () => {
		let connectionType =  localStorage.getItem( 'connection-type' ) 
		switch ( connectionType ){
		case 'INJECTED':
			const injectedConnector = PRIORITIZED_CONNECTORS[ConnectionType.INJECTED]
			await injectedConnector.connector.activate( addChainParameter )
			tryActivateConnector( getConnection( ConnectionType.INJECTED ).connector ).then( activation => {
				if( activation ) {
					setConnectionType( activation )
				}
			} )
			
			break
		case 'COINBASE_WALLET':
			const coinbaseConnector =  PRIORITIZED_CONNECTORS[ConnectionType.COINBASE_WALLET]
			await coinbaseConnector.connector.activate( addChainParameter )
			tryActivateConnector( getConnection( ConnectionType.COINBASE_WALLET ).connector ).then( activation => {
				if( activation ) setConnectionType( activation )
			} )
			break
		case 'WALLET_CONNECT':
			const walletConnectConnector = PRIORITIZED_CONNECTORS[ConnectionType.WALLET_CONNECT]
			await walletConnectConnector.connector.activate( addChainParameter )
			tryActivateConnector( getConnection( ConnectionType.WALLET_CONNECT ).connector ).then( activation => {
				if( activation ) setConnectionType( activation )
			} )
			break
		}
	}

	useEffect( ()=> {
		if( isActive ) {
			setButtonLabel( `Account: ${ellipsis( account, 7, 5 )}` )
		}else{
			setButtonLabel( 'Connect' )
		}
	}, [account, isActive] )


	return( <>
		<Box>
			<StandardButton aria-describedby={id} variant="contained" onClick={handleClick}>
				{buttonLabel}
			</StandardButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Web3ConnectionOptions
					activeConnectionType={connectionType}
					isConnectionActive={isActive}
					onActivate={setConnectionType}
					onDeactivate={setConnectionType}
				/>
			</Popover>
		</Box>
	</> )
}


export default ConnectButton

function onActivate( activation: ConnectionType ) {
	throw new Error( 'Function not implemented.' )
}
