/* eslint-disable @next/next/no-img-element */
import React, {useState, useEffect} from 'react'
import { Box } from '@mui/material'
import { GradientButton } from './Buttons'

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
	const [buttonIcon, setButtonIcon] = useState<string>()
	useEffect( () => {
		switch ( connectionType ){
		case 'INJECTED':
			setButtonLabel( 'Metamask wallet' )
			setButtonIcon( '/metamask_icon.svg' )
			break
		case 'COINBASE_WALLET':
			setButtonLabel( 'Coinbase wallet' )
			setButtonIcon( '/coinbase_icon.png' )
			break
		case 'WALLET_CONNECT':
			setButtonLabel( 'Wallet Connect' )
			setButtonIcon( '/wallet_connect_icon.png' )
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
		<Box>
			<GradientButton onClick={onClick} disabled={!isEnabled} sx={{ justifyContent: 'flex-start' }}>
		  <img src={buttonIcon} alt="" style={{ width: 32, height: 32, marginRight: '8px' }} />
		  <Box component="span" sx={{ flexGrow: 1, textAlign: 'left' }}>
					{`${isConnected ? 'Disconnect' : 'Connect'} ${buttonLabel}`}
		  </Box>
			</GradientButton>
	  </Box>
	)
}

export default Option
