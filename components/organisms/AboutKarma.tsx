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
			<Paper elevation={9} sx={{ backgroundColor: palette.purple }}>
				<Grid container spacing={1} sx={{padding: 1.5}}>
					<Grid item xs={12} textAlign={'center'}>

						<Typography variant="h5" sx={{ mb: 1, color: palette.pink }}>WHY INVEST IN GOLD KARMA?</Typography>
						<Typography variant="h6" sx={{ mb: 2, color: palette.yellow, marginBottom: 3 }}>
					ONLY {availableGldkrmAmount} GLDKRM REMAINING FOR PURCHASE
						</Typography>
					</Grid>
					<Grid item xs={12} textAlign={'justify'} color='whitesmoke' sx={{ marginBottom: 1 }}>
						<Typography variant='body2'>The fundamental principle of the Karma Protocol is that true wealth in society is generated through positive actions. Thus, every positive action contributes to the creation of new karma, which is infinitely abundant. The Karma Protocol aims to encourage a positive feedback loop in society.</Typography>
						
						<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        Discover more how we do this reading the <Link href={'https://medium.com/@kchainsolutions/karma-protocol-whitepaper-96dcbd4a9cfb'} target="_blank" rel="noopener noreferrer" sx={{
								textDecoration: 'none',
								color: palette.pink,
								'&:hover': {
									color: palette.cyano,
								},
							}}> 
							whitepaper
						 </Link>
						</Typography>

						<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        Furthermore, all the knowledge we have developed has been uploaded into a custom ChatGPT application. Therefore, if you wish to learn more about the Karma protocol, you can simply ask <Link href={'https://chat.openai.com/g/g-7XBvdFLxS-earnkarma-gpt'} target="_blank" rel="noopener noreferrer" sx={{
								textDecoration: 'none',
								color: palette.pink,
								'&:hover': {
									color: palette.cyano,
								},
							}}> 
							Karma GPT 
						 </Link>
						</Typography>

						<Divider sx={{background: palette.purple_light, marginBottom:1}}/>
						<Typography variant="body2" color='whitesmoke' sx={{ marginBottom: 1 }}>
                        	GLDKRM presents a unique opportunity to engage with the KARMA PROTOCOL. With the upcoming deployment of the DAO and the NFT marketplace on the Mainnet, holders of GLDKRM will be eligible to receive a share of the dividends. These dividends are proportionate to the amount of gold karma staked. Furthermore, holding GLDKRM grants voting rights within the DAO.
						</Typography>
						
						<Divider sx={{background: palette.purple_light, marginBottom:1}}/>
						<Typography variant='body2'color={'whitesmoke'} sx={{ marginBottom: 1 }}> 
							Early adopters who purchase GLDKRM will be eligible to participate in an airdrop to receive additional GLDKRM. A snapshot will be taken on May 31, 2024, and 10% of the supply will be distributed proportionally based on the volume sold. 
						</Typography>
						
						<Divider sx={{background: palette.purple_light, marginBottom:1}}/>
						<Typography variant="body2" color='whitesmoke' textAlign={'center'} sx={{ marginBottom: 1 }}>
                        	This page presents an exclusive chance for early investors, with 65% of the total supply available for sale here.
						</Typography>
						
					</Grid>

					<Grid item xs={12} textAlign={'center'}>
						<Image src={karma_tokenomics} alt={'Karma tokenomics'} style={{ width: '80%', height: 'auto' }}/>
					</Grid>

					<Grid item xs={12} textAlign={'justify'}>
						<Divider sx={{background: palette.purple_light}}/>
						<Typography variant='h5' color={palette.yellow} textAlign={'center'} sx={{ marginBottom: 3, marginTop:3 }}>
    					CERTIFIED CONTRACTS
						</Typography>
					</Grid>

					<Grid item xs={12} textAlign="center">
	
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/address/${process.env.NEXT_PUBLIC_ICO_ADDRESS}`}
							title="ICO Contract"
							address={process.env.NEXT_PUBLIC_ICO_ADDRESS}
						/>
						<CustomLinkCard
							href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/address/${process.env.NEXT_PUBLIC_GLDKRM_ADDRESS}`}
							title="GLDKRM Contract"
							address={process.env.NEXT_PUBLIC_GLDKRM_ADDRESS}
						/>
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