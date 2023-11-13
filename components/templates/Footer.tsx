import React from 'react'
import { Box, Typography, Link, Paper, Grid } from '@mui/material'
import { palette } from 'style'

const Footer = () => {
	return ( <>
		<Paper elevation={3}>
			<Box component="footer" sx={{ backgroundColor: palette.purple, color: 'white', mt: 3, py: 3, minHeight: 150, paddingTop: 2, paddingLeft: 15, paddingRight: 15, paddingBottom: 2 }}>
				<Grid container spacing={2}>
					<Grid item sm={4} >
						<Typography variant="body1" color={palette.cyano} sx={{mt:2}}> {'"... Unlock Goodness, Earn Karma..."'} </Typography>
					</Grid>
					<Grid item sm={8}>
						<Box textAlign="right" pt={1}>
							<Typography variant='h6' color={palette.cyano} sx={{mb: 1}}> RESOURCES </Typography>
							<Link href="https://github.com/kchain-solutions/kchain-nft-marketplace"  target="_blank" rel="noopener noreferrer" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.cyano } }}>
                                NFT marketplace repository
							</Link>
							<br />
							<Link href="https://github.com/kchain-solutions/karma-protocol-contracts" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.cyano } }}>
                                Marketplace & DAO Contracts
							</Link>
							<br />
							<Link href="https://kchain.solutions" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.cyano } }}>
                                Kchain Solutions
							</Link>
						</Box>
					</Grid>
					<Grid item sm={12} sx={{mt:5}}>
						<Typography variant="body1" align="center">
                            Copyright © 2023 - Powered by KChain Solutions
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Paper >
	</> )
}

export default Footer