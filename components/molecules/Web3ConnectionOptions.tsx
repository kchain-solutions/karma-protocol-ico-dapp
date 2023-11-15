import React from 'react'

import { ConnectionType, getHasMetaMaskExtensionInstalled } from '../../utils/connections'
import { METAMASK_URL } from '../../utils/constants'
import { Box, Grid, Paper } from '@mui/material'
import { palette } from 'style'
import Option from '../atoms/Option'

type ConnectOptionsParams = {
  activeConnectionType: ConnectionType | null
  isConnectionActive: boolean
  onActivate: ( connectionType: ConnectionType ) => void
  onDeactivate: ( connectionType: null ) => void
}

const Web3ConnectionOptions = ( {
	activeConnectionType,
	isConnectionActive,
	onActivate,
	onDeactivate,
}: ConnectOptionsParams ) => {
	function getOptions( isActive: boolean ) {
		const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled()

		const isNoOptionActive = !isActive || ( isActive && activeConnectionType === null )

		const metaMaskOption = hasMetaMaskExtension ? (
			<Option
				isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.INJECTED}
				isConnected={activeConnectionType === ConnectionType.INJECTED}
				connectionType={ConnectionType.INJECTED}
				onActivate={onActivate}
				onDeactivate={onDeactivate}
			/>
		) : (
			<a href={METAMASK_URL}>
				<button>Install Metamask</button>
			</a>
		)

		const coinbaseWalletOption = (
			<Option
				isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.COINBASE_WALLET}
				isConnected={activeConnectionType === ConnectionType.COINBASE_WALLET}
				connectionType={ConnectionType.COINBASE_WALLET}
				onActivate={onActivate}
				onDeactivate={onDeactivate}
			/>
		)

		const walletConnectOption = (
			<Option
				isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.WALLET_CONNECT}
				isConnected={activeConnectionType === ConnectionType.WALLET_CONNECT}
				connectionType={ConnectionType.WALLET_CONNECT}
				onActivate={onActivate}
				onDeactivate={onDeactivate}
			/>
		)

		return (
			<>
				<Grid container spacing={0.2} sx={{width: '320px'}}>
					<Grid item xs={12} >
						{metaMaskOption}
					</Grid>
					<Grid item xs={12} >
						{coinbaseWalletOption}
					</Grid>
					<Grid item xs={12} >
						{walletConnectOption}
					</Grid>
				</Grid>
			</>
		)
	}

	return <Paper elevation={9} sx={{backgroundColor: palette.purple}}>
		{getOptions( isConnectionActive )}
	</Paper>

}

export default Web3ConnectionOptions
