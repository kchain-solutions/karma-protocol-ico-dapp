import Ico from 'components/templates/Ico'
import { ethers } from 'ethers'

export function getInvestorVaultConversionRate( {signer, contractAddress, abi} ){

}


export function buyGldkrm( {signer, contractAddress, abi} ){

}


export function getGldkrmBalance( {signer, contractAddress, abi} ){

}


export function getStablecoinBalance( {signer, contractAddress, abi} ){

}


export function approveStablecoinTransactionTx( {signer, contractAddress, abi} ){

}


function contractConnection( {signer, contractAddress, abi} ){
	return new ethers.Contract( contractAddress,abi,signer )
}