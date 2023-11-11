import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { palette } from 'style'


const AboutKarma = ( {gldkrmContractBalance} ) => {
	return( <>
    	<Paper elevation={3} sx={{ padding: 0, marginBottom: 2 }}>
			<Box textAlign={'center'} sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2 }}>
				<Typography variant="h5" sx={{ marginBottom: 1, color: palette.pink }}> WHAT YOU SHOULD KNOW ABOUT GOLD KARMA </Typography>
				<Typography variant="body1" sx={{ marginBottom: 2, color: palette.grey }}> ONLY {gldkrmContractBalance} GLDKRM REMAIN AVAILABLE FOR PURCHASE </Typography>
			</Box>
			<Box textAlign="justify" sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2 }}>
				<Typography variant="body2" sx={{ marginBottom: 2 }}> GLDKRM provides you with the opportunity to invest in KARMA PROTOCOL and, once all the DAOs are deployed on the Mainnet, earn a share of the dividends generated through the protocol's usage. </Typography>
				<Typography variant="body2" sx={{ marginBottom: 2 }}> This page can be regarded as an exclusive opportunity for early investors. A total of 80% of the supply will be made available for sale here. </Typography>
				<Typography variant="body2" sx={{ marginBottom: 2 }}> We recommend that you take the time to read the whitepaper before making a purchase. It provides valuable information about the project and will help you make an informed decision. </Typography>
				<Typography variant="body2" sx={{ color: 'secondary.main' }}> This transaction consists of two phases. In the first phase, you will authorize the smart contract to withdraw your stablecoin. In the second phase, you will exchange the stablecoin for GLDKRM.</Typography>
			</Box>
		</Paper>
	</> )
}

export default AboutKarma