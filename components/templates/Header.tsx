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
			<Link href="/" underline="hover" sx={{ color: 'white',marginRight: '1', '&:hover': { color: palette.pink } }}>
				<Typography variant="body1">
                            HOME
				</Typography>
			</Link>
			<Link href="/transactions" underline="hover" sx={{ color: 'white',marginRight: '1', '&:hover': { color: palette.pink } }}>
				<Typography variant="body1">
                            TRANSACTION
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
				<Grid container alignItems="center" justifyContent="flex-end" spacing={0.5}> 
					<Grid item md={4} xs={12} > 
						<Box display="flex" alignItems="center" justifyContent="flex-start">
							<Image src={logo} alt='logo' style={{ width: '60px', height: 'auto' }}/>
							<Link href="/" underline="none">
								<Typography variant="h4" sx={{ color: 'whitesmoke' }}>
                                	KARMA PROTOCOL
								</Typography>
							</Link>
						</Box> 
					</Grid>

					<Grid item md={5}> 
						{isDesktopScreen ? links: ''} 
					</Grid>

					<Grid item md={3} xs={12} sx={{display:'flex', alignItems:'center', justifyContent:{md: 'flex-end', xs: 'center'}}} > 
						<ConnectButton /> 
					</Grid>


					<Grid item md={12} sm={12} display={'flex'} alignItems="center" justifyContent="flex-end">
						<Image src={banner} alt='banner' style={{ width: '100%', height: 'auto' }}/>
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