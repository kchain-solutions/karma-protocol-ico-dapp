import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { palette } from 'style'
import Image from 'next/image'

import karma_tokenomics from '../../public/karma-tokenomics.png'

interface ComponentProps {
	availableGldkrmAmount: string
}

const AboutKarma: React.FC<ComponentProps> = ( {availableGldkrmAmount} ) => {
	return (
		<>
			<Paper elevation={9} sx={{ padding: 0, mt: 3, backgroundColor: palette.purple }}>
				<Box textAlign={'center'} sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2 }}>
					<Typography variant="h4" sx={{ marginBottom: 1, color: palette.pink }}>WHY INVEST IN GOLD KARMA?</Typography>
					<Typography variant="h6" sx={{ marginBottom: 2, color: palette.yellow }}>
                        ONLY {availableGldkrmAmount} GLDKRM REMAINING FOR PURCHASE
					</Typography>
				</Box>
				<Box textAlign="justify" sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2 }}>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        GLDKRM offers a unique opportunity to be part of the KARMA PROTOCOL. Upon the deployment of all DAOs on the Mainnet, you stand to earn a portion of the dividends generated through the protocol’s operations.
					</Typography>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        This page presents an exclusive chance for early investors, with 65% of the total supply available for sale here.
					</Typography>
					
					<Box display="flex" justifyContent="center" sx={{ marginTop: 3, marginBottom: 3 }}>
						<Image src={karma_tokenomics} alt={'Karma tokenomics'} style={{ width: '70%', height: 'auto' }}/>
					</Box>

					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        We advise reviewing the whitepaper prior to purchasing. It offers insightful details about the project, aiding in an informed investment decision.
					</Typography>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        The transaction process involves two steps. Initially, you authorize the smart contract to access your stablecoin. Following this, you can exchange your stablecoin for GLDKRM.
					</Typography>
					
				</Box>
			</Paper>
		</>
	)
}


export default AboutKarma