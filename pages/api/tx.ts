import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
import  { TransactionResponse } from '../../types/transactions'

import icoAbi from '../../abis/ICO.json'
import gldKrmAbi from '../../abis/GLDKRM.json'

const provider = new ethers.providers.JsonRpcProvider( process.env.RPC_PROVIDER )
const icoContract = new ethers.Contract( process.env.NEXT_PUBLIC_ICO_ADDRESS, icoAbi, provider )
const gldkrmContract = new ethers.Contract( process.env.NEXT_PUBLIC_GLDKRM_ADDRESS, gldKrmAbi, provider )

interface Cache {
	data: TransactionResponse | null
	lastFetch: number
} 

let cache: Cache = {
	data: null,
	lastFetch: 0
}

const CACHE_DURATION = Number( process.env.CACHE_TTL )

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TransactionResponse>
) {
	if ( req.method === 'GET' ) {
		const now = Date.now()

		if ( cache.lastFetch > now - CACHE_DURATION && cache.data ) {
			cache.data.is_cached = true
			return res.status( 200 ).json( cache.data )
		}

		const responseData: TransactionResponse = { available_gldkrm_amount: '0', txs: [], is_cached: false }

		const contractBalance = await gldkrmContract.balanceOf( process.env.NEXT_PUBLIC_ICO_ADDRESS )
		responseData.available_gldkrm_amount = ethers.utils.formatUnits( contractBalance, 'ether' )

		const latestBlock = await provider.getBlockNumber()
		const fromBlock = Math.max( 0, latestBlock - 1000000 )
		const events = await icoContract.queryFilter( 'Bought', fromBlock, latestBlock )
		const lastTenEvents = events.slice( -15 )

		for ( const event of lastTenEvents ) {
			const block = await provider.getBlock( event.blockNumber )
			responseData.txs.push( {
				type: 'Bought',
				tx_hash: event.transactionHash,
				stable_amount: ethers.utils.formatUnits( event.args.stablecoinAmount, 'ether' ),
				gldkrm_amount: ethers.utils.formatUnits( event.args._gldkrmAmount, 'ether' ),
				beneficiary: event.args.beneficiary,
				date: new Date( block.timestamp * 1000 ).toUTCString(),
			} )
		}

		responseData.txs.sort( ( a, b ) => {
			return new Date( b.date ).getTime() - new Date( a.date ).getTime()
		} )

		cache = {
			data: responseData,
			lastFetch: Date.now()
		}

		res.status( 200 ).json( responseData )
	} else {
		res.status( 405 ).end()
	}
}
