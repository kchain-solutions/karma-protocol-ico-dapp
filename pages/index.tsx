import React, { useEffect, useState } from 'react'
import Header from 'components/templates/Header'
import Ico from 'components/templates/Ico'
import Footer from 'components/templates/Footer'
import AboutKarma from 'components/organisms/AboutKarma'
import { Grid } from '@mui/material'


const Index = () => {

	const [data, setData] = useState( { available_gldkrm_amount: '', txs: [] } )

	useEffect( () => {
		const fetchData = () => {
			fetch( '/api/tx' )
				.then( response => response.json() )
				.then( data => setData( data ) )
				.catch( error => console.error( 'Error fetching data:', error ) )
		}

		fetchData()
		const interval = setInterval( fetchData, 30000 )

		return () => clearInterval( interval )
	}, [] )

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
					<Header />
				</Grid>
				<Grid item xs={12} sm={12}>
					<Ico availableGldkrmAmount={data.available_gldkrm_amount} />
				</Grid>
				<Grid item xs={12} sm={12}>
					<AboutKarma availableGldkrmAmount={data.available_gldkrm_amount} />
				</Grid>
				<Grid item xs={12} sm={12}>
					<Footer />
				</Grid>
			</Grid>
		</>
	)
    
}

export default Index