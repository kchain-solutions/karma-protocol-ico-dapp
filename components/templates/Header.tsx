/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ConnectButton from 'components/organisms/ConnectButton'
import { AppBar, Box, Paper, Toolbar, Typography, Link, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { palette } from 'style'
import Image from 'next/image'

import logo from '../../public/logo.png'
import banner from '../../public/banner.png'


const Header = () => {

	const theme = useTheme()
	const isDesktopScreen = useMediaQuery( theme.breakpoints.up( 'sm' ) )

	const links = <>
		<Box display="flex" alignItems="center" justifyContent="space-between" sx={{width: '100%'}}>
			<Link href="/transactions" underline="hover" sx={{ color: 'white',marginRight: '1', '&:hover': { color: palette.pink } }}>
				<Typography variant="body1">
                            TRANSACTIONS
				</Typography>
			</Link>
			<Link href="https://chat.openai.com/g/g-7XBvdFLxS-earnkarma-gpt" target="_blank" underline="hover" sx={{ color: 'white',marginRight: '1', '&:hover': { color: palette.pink } }}>
				<Typography variant="body1">
                            KARMA GPT
				</Typography>
			</Link>
			<Link href="https://medium.com/@kchainsolutions/karma-protocol-whitepaper-96dcbd4a9cfb" target="_blank" underline="hover" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.pink } }}>
				<Typography variant="body1">
                            WHITEPAPER
				</Typography>
			</Link>
		</Box>
	</>

	return(
		<>
			<Paper sx={{backgroundColor: palette.purple, padding: 1}}>
				<Grid container alignItems="center" justifyContent="flex-end" spacing={1}> 
					<Grid item md={4} xs={12} > 
						<Box display="flex" alignItems="center" justifyContent="flex-start" sx={{justifyContent:{xs: 'center', md:'flex-start'}}}>
							<Image src={logo} alt='logo' style={{ width: '60px', height: 'auto' }}/>
							<Box>
								<Link href="/" underline="none">
									<Typography variant="h5" sx={{textAlign:'center', color: 'whitesmoke' }}>
                                	KARMA PROTOCOL
									</Typography>
									<Typography variant="body1" sx={{textAlign:'center', color: palette.cyano }}>{'... Unlock goodness, earn Karma...'}</Typography>
								</Link>
							</Box>
						</Box> 
					</Grid>

					<Grid item md={5}> 
						{isDesktopScreen ? links: ''} 
					</Grid>

					<Grid item md={3} xs={12} sx={{display:'flex', alignItems:'center', justifyContent:{md: 'flex-end', xs: 'center'}}} > 
						<ConnectButton /> 
					</Grid>


					{!isDesktopScreen && (
						<Grid item md={12} xs={12}>
							{links}
						</Grid>
					)}

				</Grid>
				 
			</Paper>
		</>
	)
}


export default Header