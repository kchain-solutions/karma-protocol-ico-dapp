/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from 'react'
import { Box } from '@mui/material'
import { GradientButton } from './Buttons'
import Image from 'next/image'

import metamaskIcon from '../../public/metamask_icon.svg'
import coinbaseIcon from '../../public/coinbase_icon.png'
import wallectConnectIcon from '../../public/wallet_connect_icon.png'

import { ConnectionType, getConnection, tryActivateConnector, tryDeactivateConnector } from '../../utils/connections'
import { AddEthereumChainParameter } from '@web3-react/types'

const Option = ( {
	isEnabled,
	isConnected,
	connectionType,
	onActivate,
	onDeactivate,
}: {
  isEnabled: boolean
  isConnected: boolean
  connectionType: ConnectionType
  onActivate: ( connectionType: ConnectionType ) => void
  onDeactivate: ( connectionType: null ) => void
} ) => {

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

	const [buttonLabel, setButtonLabel] = useState<string>()
	const [buttonIcon, setButtonIcon] = useState<any>()
	useEffect( () => {
		switch ( connectionType ){
		case 'INJECTED':
			setButtonLabel( 'Metamask wallet' )
			setButtonIcon( metamaskIcon )
			break
		case 'COINBASE_WALLET':
			setButtonLabel( 'Coinbase wallet' )
			setButtonIcon( coinbaseIcon )
			break
		case 'WALLET_CONNECT':
			setButtonLabel( 'Wallet Connect' )
			setButtonIcon( wallectConnectIcon )
			break
		}
	}, [connectionType] )

	const onClick = async () => {
		if ( isConnected ) {
			const deactivation = await tryDeactivateConnector( getConnection( connectionType ).connector )
			if ( deactivation === undefined ) {
				return
			}
			onDeactivate( deactivation )
			localStorage.removeItem( 'connection-type' )
			return
		}
		const connection = getConnection( connectionType ).connector
		await connection.activate( addChainParameter )
		const activation = await tryActivateConnector( connection )
		if ( !activation ) {
			return
		}
		onActivate( activation )
		localStorage.setItem( 'connection-type', connectionType )
		return
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
			<GradientButton onClick={onClick} disabled={!isEnabled} sx={{ display: 'flex', alignItems: 'center' }}>
				<Image src={buttonIcon} alt={''} style={{ width: 32, height: 32, marginRight: '8px' }} />
				<Box component="span" sx={{ flexGrow: 1, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
					{`${isConnected ? 'Disconnect' : 'Connect'} ${buttonLabel}`}
				</Box>
			</GradientButton>
		</Box>

	)
}

export default Option
