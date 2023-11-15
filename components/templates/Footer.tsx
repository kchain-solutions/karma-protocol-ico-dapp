import React from 'react'
import { Box, Typography, Link, Paper, Grid } from '@mui/material'
import { palette } from 'style'

const Footer = () => {
	return ( <>
		<Paper elevation={9} sx={{ backgroundColor: palette.purple, color: 'white' }}>
			<Grid container spacing={2} sx={{padding: 2}}>
				<Grid item md={4} xs={12} sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:{md: 'flex-start', xs: 'center'}}}>
					<Typography variant="body1" color={palette.cyano} sx={{marginBottom: 1}}> {'"... Unlock Goodness, Earn Karma..."'} </Typography>
					<Typography variant="body1" color={'smokewhite'} > 
						To know more about the project visit 
						<Link href="https://earnkarma.io" target="_blank" rel="noopener noreferrer" sx={{color: palette.cyano, marginRight: '1', textDecoration:'none', '&:hover': { color: palette.pink }}}> earnkarma.io </Link> 
					</Typography>
				</Grid>

				<Grid item md={8} xs={12} sx={{display:'flex', alignItems:'center', justifyContent:{md: 'flex-end', xs: 'center'}, textAlign: 'right'}}>
					<Box sx={{ 
						textAlign: { xs: 'center', md: 'right' }, 
						pt: 1, 
						width: '100%' // Ensure the Box takes the full width of the Grid item
					}}>
						<Typography variant='h6' color={palette.cyano} sx={{mb: 1}}> RESOURCES </Typography>
						<Link href="https://github.com/kchain-solutions/karma-protocol-ico-dapp"  target="_blank" rel="noopener noreferrer" sx={{ color: 'white', textDecoration:'none', marginRight: '1', '&:hover': { color: palette.cyano } }}>
                                dAPP repository
						</Link>
						<br />
						<Link href="https://github.com/kchain-solutions/karma-protocol-ico-contracts" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', textDecoration:'none', marginRight: '1', '&:hover': { color: palette.cyano } }}>
                                ICO contracts repository
						</Link>
						<br />
						<Link href="https://kchainsolutions.medium.com/" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', marginRight: '1', textDecoration:'none', '&:hover': { color: palette.cyano } }}>
                                Blog
						</Link>
					</Box>
				</Grid>
				<Grid item md={12} xs={12} sx={{mt:5}}>
					<Typography variant="body1" align="center">
                            Copyright © {new Date().getFullYear()} - Powered by <Link href="https://kchain.solutions" target="_blank" rel="noopener noreferrer" sx={{color: palette.cyano, marginRight: '1', textDecoration:'none', '&:hover': { color: palette.pink }}}> KCHAIN Solutions </Link> 
					</Typography>
				</Grid>
			</Grid>
		</Paper >
	</> )
}

export default Footer