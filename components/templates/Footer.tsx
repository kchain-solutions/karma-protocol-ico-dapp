import React from 'react'
import { Box, Typography, Link, Paper, Grid, Divider } from '@mui/material'
import { palette } from 'style'
import Image from 'next/image'

import logo from '../../public/logo.png'
import telegram from '../../public/telegram.png'

const Footer = () => {
	return ( 
		<>
			<Paper elevation={9} sx={{ backgroundColor: palette.purple_light, color: 'white' }}>
				<Grid container spacing={1} sx={{padding: 5}}>
					<Grid item md={4} xs={12} sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start', // Align items to the start of the flex container
						alignItems: { md: 'flex-start', xs: 'center' }, // Align items to the start on medium screens and center on extra-small screens
						textAlign: { xs: 'center', md: 'left' }
					}}>
						<Box sx={{ 
							textAlign: { xs: 'center', md: 'left' },  
							width: '100%'
						}}>
							<Box display="flex" alignItems="center" justifyContent="flex-start" sx={{justifyContent:{xs: 'center', md:'flex-start'}}}>
								<Image src={logo} alt='logo' style={{ width: '60px', height: 'auto' }}/>
								<Box>
									<Link href="/" underline="none">
										<Typography variant="h6" sx={{textAlign:'center', color: 'whitesmoke', fontWeight:'bold' }}>
                                			KARMA PROTOCOL
										</Typography>
										<Typography variant="body1" sx={{textAlign:'center', color: palette.cyano }}>{'... Unlock goodness, earn Karma...'}</Typography>
									</Link>
								</Box>
							</Box> 
							<Typography variant="body1" color={'smokewhite'} sx={{marginTop:3}}> 
								To know more visit 
								<Link href="https://www.earnkarma.io" target="_blank" rel="noopener noreferrer" sx={{color: palette.cyano, marginRight: '1', textDecoration:'none', '&:hover': { color: palette.pink }}}> earnkarma.io </Link> 
							</Typography>
							<Typography variant="body1" color={'smokewhite'} sx={{marginTop:3, marginBottom:1}}>
								Join our community
							</Typography>
							<Link href="https://t.me/earnkarma" target="_blank" rel="noopener noreferrer">
								<Image src={telegram} alt='telegram' style={{ width: '24px', height: 'auto' }}/>
							</Link>
						</Box>
					</Grid>

					<Grid item md={8} xs={12} sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start', // Align items to the start of the flex container
						alignItems: { md: 'flex-end', xs: 'center' }, // Align items to the end on medium screens and center on extra-small screens
						textAlign: { xs: 'center', md: 'right' }
					}}>
						<Box sx={{ textAlign: { xs: 'center', md: 'right' }, width: '100%' }}>
							<Typography variant='h6' color={'smokewhite'} sx={{ mb: 1, fontWeight: 'bold', marginBottom:3 }}> RESOURCES </Typography>
							<Box sx={{ marginBottom: 2 }}> {/* Add margin to the Box */}
								<Link href="https://github.com/kchain-solutions/karma-protocol-ico-dapp" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: palette.cyano } }}>
                  					dAPP repository
								</Link>
							</Box>
							<Box sx={{ marginBottom: 2 }}> {/* Add margin to the Box */}
								<Link href="https://github.com/kchain-solutions/karma-protocol-ico-contracts" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: palette.cyano } }}>
                  					ICO contracts repository
								</Link>
							</Box>
							<Box sx={{ marginBottom: 2 }}> {/* Add margin to the Box */}
								<Link href="https://kchainsolutions.medium.com/" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: palette.cyano } }}>
                  					Blog
								</Link>
							</Box>
						</Box>
					</Grid>
					<Grid item md={12} xs={12} sx={{mt:5}}>
						<Divider sx={{marginBottom:3}}/>
						<Typography variant="body2" align="center">
                            Copyright © {new Date().getFullYear()} - Powered by <Link href="https://kchain.solutions" target="_blank" rel="noopener noreferrer" sx={{color: palette.cyano, marginRight: '1', textDecoration:'none', '&:hover': { color: palette.pink }}}> KCHAIN Solutions </Link> 
						</Typography>
					</Grid>
				</Grid>
			</Paper >
		</> )
}

export default Footer