/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ConnectButton from 'components/organisms/ConnectButton'
import { AppBar, Box, Paper, Toolbar, Typography, Link } from '@mui/material'
import { palette } from 'style'
import Image from 'next/image'


const Header = () => {

	return(
		<>
			<Paper sx={{backgroundColor: palette.purple}}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: palette.purple }}>
							<Box display="flex" alignItems="center">
								<Box sx={{ width: 50, height: 50, marginRight: 2 }}>
									<img
										src='/logo.png'
										alt="Earnkarma logo"
										style={{ width: '100%', height: '100%' }}
									/>
								</Box>
								<Link href="/" underline="none">
									<Typography variant="h4" sx={{ color: 'whitesmoke' }}>
                                KARMA PROTOCOL
									</Typography>
								</Link>
							</Box>
							<Link href="/" underline="hover" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.pink } }}>
								<Typography variant="h6">
                            Home
								</Typography>
							</Link>
							<Link href="/transactions" underline="hover" sx={{ color: 'white',marginRight: '1', '&:hover': { color: palette.pink } }}>
								<Typography variant="h6">
                            Transactions
								</Typography>
							</Link>
							<Link href="/transactions" underline="hover" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.pink } }}>
								<Typography variant="h6">
                            Whitepaper
								</Typography>
							</Link>
							<ConnectButton />
						</Toolbar>
					</AppBar>
				</Box>
				<img
					src='/banner.png'
					alt="Earnkarma logo"
					style={{ width: '100%', height: '100%' }}
				/>
			</Paper>

		</>
	)
}


export default Header