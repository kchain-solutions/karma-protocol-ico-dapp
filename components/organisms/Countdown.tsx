import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { palette } from 'style'

const Countdown = () => {
	const [timeLeft, setTimeLeft] = useState( {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	} )

	useEffect( () => {
		const updateCountdown = () => {
			const currentTime = new Date()
			const targetTime = new Date( process.env.NEXT_PUBLIC_ICO_DATE )
			const difference = targetTime.getTime() - currentTime.getTime()

			if ( difference > 0 ) {
				setTimeLeft( {
					days: Math.floor( difference / ( 1000 * 60 * 60 * 24 ) ),
					hours: Math.floor( ( difference / ( 1000 * 60 * 60 ) ) % 24 ),
					minutes: Math.floor( ( difference / 1000 / 60 ) % 60 ),
					seconds: Math.floor( ( difference / 1000 ) % 60 )
				} )
			} else {
				// Stop the countdown when the target date is reached
				setTimeLeft( {
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0
				} )
				clearInterval( interval )
			}
		}

		const interval = setInterval( updateCountdown, 1000 )

		return () => clearInterval( interval ) // Cleanup on component unmount
	}, [] ) 

	return (
		( timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ) ? <>
			<Paper elevation={9} sx={{ backgroundColor: palette.purple }}>
				<Grid container spacing={1} sx={{ padding: 1.5 }}>
					<Grid item xs={12} textAlign={'center'}>	
						<Typography variant='h5' color={palette.pink}>GLDKRM WILL BE AVAILABLE IN</Typography>
					</Grid>
					<Grid item xs={12} textAlign={'center'}>
						<Typography variant='h5' color={palette.yellow}>
							{timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds
						</Typography>
					</Grid>
				</Grid>
			</Paper>  
		</> : ''
	)
}

export default Countdown
