import { Box, Card, CardContent, Link, Paper, Typography } from '@mui/material'
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
			<Paper elevation={9} sx={{ paddingRight: 35, paddingLeft:35, mt: 3, backgroundColor: palette.purple }}>
				<Box textAlign={'center'} sx={{ p: 2 }}>

					<Typography variant="h4" sx={{ mb: 1, color: palette.pink }}>WHY INVEST IN GOLD KARMA?</Typography>
					<Typography variant="h6" sx={{ mb: 2, color: palette.yellow, marginBottom: 3 }}>
					ONLY {availableGldkrmAmount} GLDKRM REMAINING FOR PURCHASE
					</Typography>
				</Box>
				<Box textAlign={'justify'} sx={{ p: 2 }}>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        GLDKRM offers a unique opportunity to be part of the KARMA PROTOCOL. Upon the deployment of all DAOs on the Mainnet, you stand to earn a portion of the dividends generated through the protocol’s operations.
					</Typography>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        This page presents an exclusive chance for early investors, with 65% of the total supply available for sale here.
					</Typography>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        We advise reviewing the whitepaper prior to purchasing. It offers insightful details about the project, aiding in an informed investment decision.
					</Typography>
					<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        The transaction process involves two steps. Initially, you authorize the smart contract to access your stablecoin. Following this, you can exchange your stablecoin for GLDKRM.
					</Typography>

					<Box display="flex" justifyContent="center" sx={{ my: 3 }}>
						<Image src={karma_tokenomics} alt={'Karma tokenomics'} style={{ width: '60%', height: 'auto' }}/>
					</Box>

					<Typography variant='body2' color='whitesmoke'  sx={{ marginBottom: 3 }}>
    					Before authorizing any transactions, it is crucial to verify the correctness of the contract addresses. Below is a list of certified contracts for your reference:
					</Typography>

					<Box textAlign="center" sx={{ p: 2 }}>
	
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}address/${process.env.NEXT_PUBLIC_ICO_ADDRESS}`}
							title="ICO Contract"
							address={process.env.NEXT_PUBLIC_ICO_ADDRESS}
						/>
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}address/${process.env.NEXT_PUBLIC_GLDKRM_ADDRESS}`}
							title="GLDKRM Contract"
							address={process.env.NEXT_PUBLIC_GLDKRM_ADDRESS}
						/>
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}address/${process.env.NEXT_PUBLIC_USDC_ADDRESS}`}
							title="USDC Contract"
							address={process.env.NEXT_PUBLIC_USDC_ADDRESS}
						/>
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}address/${process.env.NEXT_PUBLIC_USDT_ADDRESS}`}
							title="USDT Contract"
							address={process.env.NEXT_PUBLIC_USDT_ADDRESS}
						/>
					</Box>
				</Box>
			</Paper>
		</>
	)
}

const CustomLinkCard = ( { href, title, address } ) => (
	<Card sx={{ mb: 2, backgroundColor: palette.purple_light, width:'100%' }}>
		<CardContent>
			<Typography variant="body1" color={palette.yellow} gutterBottom>
				{title}
			</Typography>
			<Link href={href} target="_blank" rel="noopener noreferrer" sx={{
				textDecoration: 'none',
				color: 'whitesmoke',
				'&:hover': {
					color: palette.cyano,
				},
			}}>
				{address}
			</Link>
		</CardContent>
	</Card>
)


export default AboutKarma