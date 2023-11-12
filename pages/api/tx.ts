import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'


import icoAbi from '../../abis/ICO.json'
import gldKrmAbi from '../../abis/GLDKRM.json'


const provider = new ethers.providers.JsonRpcProvider( process.env.NODE_PROVIDER )
const icoContract = new ethers.Contract( process.env.NEXT_PUBLIC_ICO_ADDRESS, icoAbi, provider )
const gldkrmContract = new ethers.Contract( process.env.NEXT_PUBLIC_GLDKRM_ADDRESS, gldKrmAbi, provider )


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TransactionResponse>
) {
	if ( req.method === 'GET' ) {
		const responseData =  { available_gldkrm_amount: '0', txs: [] }

		const contractBalance = await gldkrmContract.balanceOf( process.env.NEXT_PUBLIC_ICO_ADDRESS )
		responseData.available_gldkrm_amount = ethers.utils.formatUnits( contractBalance, 'ether' )

		const latestBlock = await provider.getBlockNumber()
		const fromBlock = Math.max( 0, latestBlock - 10000000 )
		const events = await icoContract.queryFilter( 'Bought', fromBlock, latestBlock )
		const lastTenEvents = events.slice( -5 ) 
		
		for ( const event of lastTenEvents ) {
			const block = await provider.getBlock( event.blockNumber )
			responseData.txs.push( {
				type: 'Bought',
				tx_hash: event.transactionHash,
				stable_amount: ethers.utils.formatUnits( event.args.stablecoinAmount, 'ether' ),
				gldkrm_amount: ethers.utils.formatUnits( event.args._gldkrmAmount, 'ether' ),
				beneficiary: event.args.beneficiary,
				date: new Date( block.timestamp * 1000 ).toUTCString()
			} )
		}

		res.status( 200 ).json( responseData )
	} else {
		res.status( 405 ).end() 
	}
}
