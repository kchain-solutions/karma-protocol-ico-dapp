import React from 'react'
import { Box, Typography, Link, Paper, Grid } from '@mui/material'
import { palette } from 'style'

const Footer = () => {
	return ( <>
		<Paper elevation={3}>
			<Box component="footer" sx={{ backgroundColor: palette.purple, color: 'white', mt: 8, py: 3, minHeight: 150, paddingTop: 2, paddingLeft: 15, paddingRight: 15, paddingBottom: 2 }}>

				<Grid container spacing={2}>
					<Grid item sm={4}>
						<Typography variant='h6'> MISSION</Typography>
						<Typography variant="body1"> "... Unlock Goodness, Earn Karma..." </Typography>
					</Grid>
					<Grid item sm={8}>
						<Box textAlign="right" pt={1}>
							<Typography variant='h6'> RESOURCES</Typography>
							<Link href="https://github.com/kchain-solutions/kchain-nft-marketplace" color="inherit" target="_blank" rel="noopener noreferrer">
                                NFT marketplace repository
							</Link>
							<br />
							<Link href="https://github.com/kchain-solutions/karma-protocol-contracts" color="inherit" target="_blank" rel="noopener noreferrer">
                                Marketplace & DAO Contracts
							</Link>
							<br />
							<Link href="https://kchain.solutions" color="inherit" target="_blank" rel="noopener noreferrer">
                                Kchain Solutions
							</Link>
						</Box>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body1" align="center">
                            Copyright © 2023 - Powered by KChain solutions
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Paper >
	</> )
}

export default Footer