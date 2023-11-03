import React from 'react'
import ConnectButton from 'components/organisms/connectButton'
import { Box, Paper } from '@mui/material'
import { palette } from 'style'


const Header = () => {

	return(
		<Box>
			<Paper elevation={3} sx={{background: palette.purple, minHeight:'50px'}}>
				<ConnectButton />
			</Paper>
		</Box>
	)
}


export default Header