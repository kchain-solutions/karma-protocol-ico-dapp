/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ConnectButton from 'components/organisms/connectButton'
import { AppBar, Box, Link, Paper, Toolbar, Typography } from '@mui/material'
import { palette } from 'style'
import logo_image from '../../public/favicon.png'
import Image from 'next/image'


const Header = () => {

	return(

		<>
			<Paper elevation={3} sx={{}}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between',backgroundColor: palette.purple }}>
							<Box display="flex" alignItems="center">
								<Box sx={{ width: 50, height: 50, marginRight: 2 }}>
									<img
										src='/logo.png'
										alt="Earnkarma logo"
										style={{ width: '100%', height: '100%' }}
									/>
								</Box>
								<Typography variant="h4" sx={{ color: 'white' }}>
                            		KARMA PROTOCOL
								</Typography>
							</Box>
							<ConnectButton />
						</Toolbar>
					</AppBar>
				</Box>
			</Paper>
			<img
				src='/banner.png'
				alt="Earnkarma logo"
				style={{ width: '100%', height: '100%' }}
			/>
		</>

	)
}


export default Header