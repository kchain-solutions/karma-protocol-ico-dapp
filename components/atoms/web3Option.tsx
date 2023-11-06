import React from 'react'
import { Box, Button } from '@mui/material'
import { GradientButton } from './Buttons'

import { ConnectionType, getConnection, tryActivateConnector, tryDeactivateConnector } from '../../utils/connections'

const Web3Option = ( {
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
			<GradientButton onClick={onClick} disabled={!isEnabled}>
				{`${isConnected ? 'Disconnect' : 'Connect'} ${connectionType}`}
			</GradientButton>
		</Box>
	)
}

export default Web3Option
