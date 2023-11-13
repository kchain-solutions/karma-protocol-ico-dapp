import React, { useEffect, useState } from 'react'
import Header from 'components/templates/Header'
import Ico from 'components/templates/Ico'
import Footer from 'components/templates/Footer'
import TransactionsList from 'components/molecules/TransactionsList'


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
			<Header />
			<TransactionsList txs={data.txs} />
			<Footer />
		</>
	)
    
}

export default Index