import React from 'react'
import { Card, CardContent, Typography, List, ListItem, Divider, Paper, Link, Grid } from '@mui/material'
import { palette } from 'style'
import { ellipsis } from 'utils/parsing'

const TransactionsList = ( { txs } ) => {
	return (
		<>
			<Paper elevation={9} sx={{backgroundColor: palette.purple}}>
				<Grid container spacing={1} sx={{ padding: 1, display:'flex' }}>
					<Grid item xs={12}>
						<Typography textAlign={'center'} variant="h4" color={palette.cyano} gutterBottom>
              			RECENT TRANSACTION HISTORY
						</Typography>
					</Grid>
					{txs.map( ( tx, index ) => (
						<Grid item md={6} xs={12} key={index}> {/* Each transaction as a Grid item */}
							<Card variant="outlined" sx={{ width: '100%' }}>
								<CardContent sx={{ backgroundColor: palette.purple_light }}>
									<Typography color='whitesmoke' variant="body2">GLDKRM purchased amount: {tx.gldkrm_amount}</Typography>
									<Typography color='whitesmoke' variant="body2">
                  						Transaction hash: 
										<Link href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/tx/${tx.tx_hash}`} target="_blank" rel="noopener noreferrer">
											{ellipsis( tx.tx_hash, 16, 14 )}
										</Link>
									</Typography>
									<Typography color='whitesmoke' variant="body2">Date: {tx.date}</Typography>
								</CardContent>
							</Card>
						</Grid>
					) )}
				</Grid>
			</Paper>
		</>
	)
}

export default TransactionsList
