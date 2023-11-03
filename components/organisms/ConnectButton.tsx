import React, { useEffect, useState } from 'react'
import { Box, Popover, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import Web3ConnectionOptions from 'components/molecules/Web3ConnectionOptions'
import { ConnectionType } from 'utils/connections'
import { StandardButton } from 'components/atoms/Buttons'


const ConnectButton = () => {
	const [open, setOpen] = useState(false)
	const [buttonLabel, setButtonLabel] = useState<String>('Connect')
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const { account, isActive } = useWeb3React()
	const [connectionType, setConnectionType] = useState<ConnectionType | null>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
	const id = open ? 'simple-popover' : undefined

	useEffect(()=> {
		if(isActive) {
			setButtonLabel(account)
		}else{
			setButtonLabel('Connect')
		}
	}, [account, isActive])


	return(<>
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
	</>)
}


export default ConnectButton