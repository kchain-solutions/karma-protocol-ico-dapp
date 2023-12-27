import { Box, Button, Card, CardContent, Grid, Link, Paper, Typography } from '@mui/material'
import Ico from 'components/organisms/Ico'
import React from 'react'
import { palette } from 'style'

const Buy = () => {

	const InfoCard = () => {
		return (
			<Box sx={{ minWidth: 275, height: '100%', position: 'relative', textAlign:'center', padding:3 }}>
				<Typography variant="h5" component="div" sx={{ color: 'whitesmoke', fontWeight: 'bold', marginBottom:1.5 }}>
                		WHY INVEST IN GOLD KARMA?
				</Typography>

				<Typography variant="body2" sx={{ color: 'whitesmoke', marginBottom:5 }}>
						The fundamental principle of the Karma Protocol is that true wealth in society is generated through positive actions. Thus, every positive action contributes to the creation of new karma, which is infinitely abundant. The Karma Protocol aims to encourage a positive feedback loop in society.
				</Typography>
				<Typography variant="body2" sx={{ color: 'whitesmoke', marginBottom:2 }}>
                Discover more how we do this
				</Typography>
				<Button component="a" href="https://kchainsolutions.medium.com/karma-protocol-whitepaper-96dcbd4a9cfb" target='blank' sx={{backgroundColor:palette.purple_light, color:'whitesmoke', fontWeight:'bold', padding:1}}>
						WHITEPAPER
				</Button>

			</Box>
		)
	}

	return <>
		<Paper elevation={9} sx={{ backgroundColor: palette.purple_deep }}>
			<Grid container spacing={1} sx={{padding: 1.5, paddingTop:4, paddingBottom:4}}>
				<Grid item md={6} xs={12}>
					<Ico />
				</Grid>
				<Grid item md={6} xs={12} sx={{backgroundColor:palette.purple}}>
					<InfoCard />
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body2" color='whitesmoke' textAlign={'center'} sx={{ marginTop:3 }}>
                        Furthermore, all the knowledge we have developed has been uploaded into a custom ChatGPT application. Therefore, if you wish to learn more about the Karma protocol, you can simply ask <Link href={'https://chat.openai.com/g/g-7XBvdFLxS-earnkarma-gpt'} target="_blank" rel="noopener noreferrer" sx={{
							textDecoration: 'none',
							fontWeight:'bold',
							color: palette.pink,
							'&:hover': {
								color: palette.cyano,
							},
						}}> 
							Karma GPT 
						 </Link>
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	</>
}

export default Buy