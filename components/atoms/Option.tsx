/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from 'react'
import { Box } from '@mui/material'
import { GradientButton } from './Buttons'
import Image from 'next/image'

import metamaskIcon from '../../public/metamask_icon.svg'
import coinbaseIcon from '../../public/coinbase_icon.png'
import wallectConnectIcon from '../../public/wallet_connect_icon.png'

import { ConnectionType, getConnection, tryActivateConnector, tryDeactivateConnector } from '../../utils/connections'

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
			// undefined means the deactivation failed
			if ( deactivation === undefined ) {
				return
			}
			onDeactivate( deactivation )
			localStorage.removeItem( 'connection-type' )
			return
		}

		const activation = await tryActivateConnector( getConnection( connectionType ).connector )
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
