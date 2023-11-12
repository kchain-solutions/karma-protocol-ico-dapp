import React, { useState, useEffect, FC } from 'react'
import { Card, CardContent, Typography, List, ListItem, Divider, Paper, Link } from '@mui/material'
import { palette } from 'style'
import { ellipsis } from 'utils/parsing'

interface ComponentProps {
    txs: Tx[];
}

const TransactionsList: React.FC<ComponentProps> = ( {txs} ) => {
	const [data, setData] = useState( { available_gldkrm_amount: '', txs: [] } )

	return (
		<>
			<Paper elevation={9} sx={{backgroundColor: palette.pink, mt:3, padding: '10px'}}>
				<Typography variant="h5" color={'whitesmoke'} gutterBottom>
                    LAST PURCHASE TRANSACTIONS
				</Typography>
				<List>
					{txs.map( ( tx, index ) => (
						<React.Fragment key={index}>
							{index > 0 && <Divider />}
							<ListItem>
								<Card variant="outlined">
									<CardContent sx={{minWidth:'350px'}}>
										<Typography variant="body2">GLDKRM purchased amount: {tx.gldkrm_amount}</Typography>
										<Typography variant="body2">
                                            Transaction link: 
											<Link href={` ${process.env.NEXT_PUBLIC_TX_SCANNER}${tx.tx_hash}`} target="_blank" rel="noopener noreferrer">
												{ellipsis( tx.tx_hash, 7, 5 )}
											</Link>
										</Typography>

										<Typography variant="body2">Date: {tx.date}</Typography>
									</CardContent>
								</Card>
							</ListItem>
						</React.Fragment>
					) )}
				</List>
			</Paper>
		</>
	)
}

export default TransactionsList
