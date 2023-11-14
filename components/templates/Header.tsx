/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ConnectButton from 'components/organisms/ConnectButton'
import { AppBar, Box, Paper, Toolbar, Typography, Link } from '@mui/material'
import { palette } from 'style'
import Image from 'next/image'

import logo from '../../public/logo.png'
import banner from '../../public/banner.png'


const Header = () => {

	return(
		<>
			<Paper sx={{backgroundColor: palette.purple}}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: palette.purple }}>
							<Box display="flex" alignItems="center">
								<Image src={logo} alt='logo' style={{ width: '60px', height: 'auto' }}/>
								<Link href="/" underline="none">
									<Typography variant="h4" sx={{ color: 'whitesmoke' }}>
                                KARMA PROTOCOL
									</Typography>
								</Link>
							</Box>
							<Link href="/transactions" underline="hover" sx={{ color: 'white',marginRight: '1', '&:hover': { color: palette.pink } }}>
								<Typography variant="body1">
                            Transactions
								</Typography>
							</Link>
							<Link href="https://medium.com/@kchainsolutions/karma-protocol-whitepaper-96dcbd4a9cfb" target="_blank" underline="hover" sx={{ color: 'white', marginRight: '1', '&:hover': { color: palette.pink } }}>
								<Typography variant="body1">
                            Whitepaper
								</Typography>
							</Link>
							<ConnectButton />
						</Toolbar>
					</AppBar>
				</Box>
				<Image src={banner} alt='banner' style={{ width: '100%', height: 'auto' }}/> 
			</Paper>

		</>
	)
}


export default Header