import { Grid, Card, CardContent, Link, Paper, Typography, Divider } from '@mui/material'
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
			<Paper elevation={0} sx={{ backgroundColor: palette.purple_light }}>
				<Grid container spacing={1} sx={{padding: 1.5}}>
					<Grid item md={5} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding:2 }}>

						<Typography variant="body2" color='whitesmoke' textAlign={'justify'} sx={{ marginBottom: 2 }}>
                        	GLDKRM presents a unique opportunity to engage with the KARMA PROTOCOL. With the upcoming deployment of the DAO and the NFT marketplace on the Mainnet, holders of GLDKRM will be eligible to receive a share of the dividends. These dividends are proportionate to the amount of gold karma staked. Furthermore, holding GLDKRM grants voting rights within the DAO.
						</Typography>
						
						<Typography variant='body2'color={'whitesmoke'} textAlign={'justify'} sx={{ marginBottom: 2 }}> 
							Early adopters who purchase GLDKRM will be eligible to participate in an airdrop to receive additional GLDKRM. A snapshot will be taken on May 31, 2024, and 10% of the supply will be distributed proportionally based on the volume sold. 
						</Typography>
						
						<Typography variant="body2" color='whitesmoke' textAlign={'justify'} sx={{ marginBottom: 2 }}>
                        	This page presents an exclusive chance for early investors, with 65% of the total supply available for sale here.
						</Typography>
						
					</Grid>

					<Grid item md={7} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  paddingBottom:2 }}>
						<Image src={karma_tokenomics} alt={'Karma tokenomics'} style={{ width: '100%', height: 'auto' }}/>
					</Grid>
				</Grid>
			</Paper>


			<Paper elevation={9} sx={{ backgroundColor: palette.purple }}>
				<Grid container spacing={1} sx={{padding: 1.5}}>
					<Grid item xs={12} textAlign={'justify'}>
						<Typography variant='h5' color={palette.yellow} textAlign={'center'} sx={{ marginBottom: 2, marginTop:2 }}>
    					CERTIFIED CONTRACTS
						</Typography>
					</Grid>

					<Grid item md={6} xs={12} textAlign="center">
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/address/${process.env.NEXT_PUBLIC_ICO_ADDRESS}`}
							title="ICO Contract"
							address={process.env.NEXT_PUBLIC_ICO_ADDRESS}
						/>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center">
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/address/${process.env.NEXT_PUBLIC_GLDKRM_ADDRESS}`}
							title="GLDKRM Contract"
							address={process.env.NEXT_PUBLIC_GLDKRM_ADDRESS}
						/>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center">
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/address/${process.env.NEXT_PUBLIC_USDC_ADDRESS}`}
							title="USDC Contract"
							address={process.env.NEXT_PUBLIC_USDC_ADDRESS}
						/>
					</Grid>
				</Grid>
			</Paper>
			
		</>
	)
}

const CustomLinkCard = ( { href, title, address } ) => (
	<Card sx={{ mb: 2, backgroundColor: palette.purple_light, width:'100%', borderColor: 'whitesmoke',
		borderStyle: 'solid',
		borderWidth: '1px', }}>
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