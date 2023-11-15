import React, { useEffect, useState } from 'react'
import Header from 'components/templates/Header'
import Footer from 'components/templates/Footer'
import TransactionsList from 'components/molecules/TransactionsList'
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
				<Grid item xs={12}>
					<Header />
				</Grid>
				<Grid item xs={12}>
					<TransactionsList txs={data.txs} />
				</Grid>
				<Grid item xs={12}>
					<Footer />
				</Grid>
				
				
				
			</Grid>
		</>
	)
    
}

export default Index