import React from 'react'

import { ConnectionType, getHasMetaMaskExtensionInstalled } from '../../utils/connections'
import { METAMASK_URL } from '../../utils/constants'
import Web3Option from '../atoms/Web3Option'
import { Box } from '@mui/material'

type ConnectOptionsParams = {
  activeConnectionType: ConnectionType | null
  isConnectionActive: boolean
  onActivate: (connectionType: ConnectionType) => void
  onDeactivate: (connectionType: null) => void
}

const Web3ConnectionOptions = ({
	activeConnectionType,
	isConnectionActive,
	onActivate,
	onDeactivate,
}: ConnectOptionsParams) => {
	function getOptions(isActive: boolean) {
		const hasMetaMaskExtension = getHasMetaMaskExtensionInstalled()

		const isNoOptionActive = !isActive || (isActive && activeConnectionType === null)

		const metaMaskOption = hasMetaMaskExtension ? (
			<Web3Option
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
			<Web3Option
				isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.COINBASE_WALLET}
				isConnected={activeConnectionType === ConnectionType.COINBASE_WALLET}
				connectionType={ConnectionType.COINBASE_WALLET}
				onActivate={onActivate}
				onDeactivate={onDeactivate}
			/>
		)

		const walletConnectOption = (
			<Web3Option
				isEnabled={isNoOptionActive || activeConnectionType === ConnectionType.WALLET_CONNECT}
				isConnected={activeConnectionType === ConnectionType.WALLET_CONNECT}
				connectionType={ConnectionType.WALLET_CONNECT}
				onActivate={onActivate}
				onDeactivate={onDeactivate}
			/>
		)

		return (
			<>
				{metaMaskOption}
				{coinbaseWalletOption}
				{walletConnectOption}
			</>
		)
	}

	return <Box>{getOptions(isConnectionActive)}</Box>
}

export default Web3ConnectionOptions
