import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { palette } from 'style'
import Image from 'next/image'

interface ComponentProps {
	availableGldkrmAmount: string
}

import logo from '../../public/logo.png'
import banner from '../../public/banner.png'


const Banner: React.FC<ComponentProps> = ( {availableGldkrmAmount} ) => {

	const InfoCard = () => {
		return (
			<Card sx={{ minWidth: 275, backgroundColor: palette.purple, height: '100%', position: 'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
				<CardContent sx={{ textAlign: 'center' }}>
					<Typography variant="h5" component="div" sx={{ color: 'whitesmoke' }}>
                Only
					</Typography>
					<Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: palette.yellow }}>
						{availableGldkrmAmount}
					</Typography>
					<Typography variant="h5" component="div" sx={{ color: palette.yellow }}>
                GLDKRM
					</Typography>
					<Typography variant="body2" sx={{ color: 'whitesmoke' }}>
                Remaining For Purchase
					</Typography>
				</CardContent>
				<Box
					sx={{
						position: 'absolute',
						bottom: 8, // Adjust the value as needed for spacing from the bottom
						right: 8, // Adjust the value as needed for spacing from the right
						width: '50px', // Set width of the logo
						height: '50px', // Set height of the logo
					}}
				>
					{/* Make sure the src path is correct and the image is loaded correctly */}
					<Image src={logo} alt='logo' width={50} height={50} />
				</Box>
			</Card>
		)
	}


	return <>
		<Paper elevation={0} sx={{ backgroundColor: palette.purple_light }}>
			<Grid container spacing={1}>
				<Grid item md={4} xs={12}>
					<InfoCard />
				</Grid>
				<Grid item md={8} xs={12} sx={{
					display: 'flex',
					justifyContent: 'center', 
					alignItems: 'center'
				}}>
					<Image src={banner} alt='banner' style={{ width: '100%', height: 'auto' }}/>
				</Grid>
			</Grid>
		</Paper>
	</>
}

export default Banner