import React, { useEffect, useState, useContext, useMemo } from 'react'
import { ethers, BigNumber, Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Paper, Box, TextField, InputAdornment, IconButton, Typography, Button, Snackbar, Link, Divider, FormControl, Select, MenuItem } from '@mui/material'
import { BodyText, TitleText } from 'components/atoms/Text'
import { PurplePaper } from 'components/atoms/Container'
import PaymentIcon from '@mui/icons-material/Payment'
import CloseIcon from '@mui/icons-material/Close'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'

import icoAbi from '../../abis/ICO.json'
import gldkrmAbi from '../../abis/GLDKRM.json'
import gldkrm_ico from '../../contents/gldkrm_ico.json'
import { formFieldStyle } from 'style'
import { GradientButton } from 'components/atoms/Buttons'

const STABLECOIN_OPTIONS = [{currency: 'USDC', address: process.env.NEXT_PUBLIC_USDC_ADDRESS}, {currency: 'USDT', address:process.env.NEXT_PUBLIC_USDT_ADDRESS}]
const RATE = Number( process.env.NEXT_PUBLIC_STABLECOIN_GLDKRM_CON_RATE )


const Ico = () => {

	const { isActive, account, provider,   } = useWeb3React()

	const [stableCoinOption, setStableCoinOption] = useState<string>( STABLECOIN_OPTIONS[0].currency )
	const [stableCoinAddress, setStableCoinAddress] = useState<string>( STABLECOIN_OPTIONS[0].address )
	const [stableCoinBalance, setstableCoinBalance] = useState<string> ( '' )
	const [stableCoinInvestAmount, setStableCoinInvestAmount] = useState<string> ( '' )
	const [gldkrmBuyingAmount, setGldKrmBuyingAmount] = useState<string>( '' )
	const [gldkrmUserBalance, setGldkrmUserBalance] = useState<string>( '0' )
	const [gldkrmContractBalance, setGldkrmContractBalance] = useState<string>( '0' )
	const [toastMessage, setToastMessage] = useState<string>( '' )
	const [icoContract, setIcoContract] = useState<ethers.Contract | undefined>()
	const [stableCoinContract, setStableCoinContract] = useState<ethers.Contract | undefined>() 
	const [gldkrmContract, setGldkrmContract] = useState<ethers.Contract | undefined>() 

	const [stableCoinError, setStableCoinError] = useState<Boolean>( false )
	const [stableCoinHelperText, setStableCoinHelperText] = useState<String>( '' )

	const [isOpenSnackbar, setIsOpenSnackbar] = useState( false )
	const [snackbarMessage, setSnackbarMessage] = useState( '' )

	const [isApproved, setIsApproved] = useState( false )
	const [isPending, setIsPending] = useState( false )
	const [isToBeProcessed, setIsToBeProcessed] = useState( true )
	
	const loadBalances = ( ) => {
		if ( gldkrmContract ) {
			gldkrmContract.balanceOf( account ).then( ( balance: BigNumber ) => {
				setGldkrmUserBalance(  ethers.utils.formatUnits( balance, 'ether' )  )
			} )
			gldkrmContract.balanceOf( process.env.NEXT_PUBLIC_ICO_ADDRESS ).then( ( balance: BigNumber ) => {
				setGldkrmContractBalance( ethers.utils.formatUnits( balance, 'ether' ) )
			} )
		}
		if( stableCoinContract ){
			stableCoinContract.balanceOf( account ).then( ( balance:BigNumber ) => {
				setstableCoinBalance( ethers.utils.formatUnits( balance, 'ether' ) )
			} )
		}
	}

	const getSignerOrProvider = ( provider: ethers.providers.Web3Provider )=> {
		if ( provider?.getSigner ){
			return provider.getSigner()
		}
		else return provider
	} 

	const roundNumber = ( number: string ): string => {
		const n = Number( number )
		return n.toFixed( 6 )
	} 


	useEffect( () => {
		if( isActive ){
			const ico = new Contract( process.env.NEXT_PUBLIC_ICO_ADDRESS, icoAbi , getSignerOrProvider( provider ) )
			setIcoContract( ico )
			const gldkrm = new Contract( process.env.NEXT_PUBLIC_GLDKRM_ADDRESS, gldkrmAbi, getSignerOrProvider( provider ) )
			setGldkrmContract( gldkrm )
			const stablecoin = new Contract( stableCoinAddress, gldkrmAbi, getSignerOrProvider( provider ) )
			setStableCoinContract( stablecoin )
		}
		else{
			setIcoContract( undefined )
			setGldkrmContract( undefined )
			setStableCoinContract( undefined )
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, isActive, provider, stableCoinOption] )
	

	useEffect( () => {
		loadBalances()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	} , [stableCoinContract, gldkrmContract] )


	const checkInvestErrors = () => {
		return ( ( Number( stableCoinInvestAmount ) >  Number( stableCoinBalance )  ) 
		|| ( Number( stableCoinInvestAmount ) * RATE > Number( gldkrmContractBalance ) ) 
		|| Number( stableCoinInvestAmount ) === 0 )
	}

	const handleBuy = async () => {
		if ( !stableCoinError ) {
			setSnackbarMessage( `Approving ${process.env.NEXT_PUBLIC_ICO_ADDRESS} to spend ${stableCoinInvestAmount} ${stableCoinOption}. Please wait...` )
			setIsOpenSnackbar( true )
	
			try {
				//Approve transaction request
				const txResponse = await stableCoinContract.approve( process.env.NEXT_PUBLIC_ICO_ADDRESS, ethers.utils.parseUnits( stableCoinInvestAmount, 18 ) )
	
				const txReceipt = await txResponse.wait()
				console.log( 'Transaction receipt', txReceipt )
	
				setSnackbarMessage( `Approving transaction succeeded. TX Hash: ${txResponse.hash}` )
				setIsOpenSnackbar( true )
			} catch ( error ) {
				console.error( 'Approval failed', error )
				setSnackbarMessage( `Approval failed: ${error.message}` )
				setIsOpenSnackbar( true )
			}
		}
	}

	const handleClose = ( _event: any, reason: any ) => {
		if ( reason === 'clickaway' ) {
			return
		}
		setIsOpenSnackbar( false )
	}

	const handleStableCoinOptionChange = ( e: any ) => {
		setStableCoinOption( e.target.value )
		if( e.target.value === 'USDC' ){
			setStableCoinAddress( process.env.NEXT_PUBLIC_USDC_ADDRESS )
			loadBalances()
		}
		if( e.target.value === 'USDT' ){
			setStableCoinAddress( process.env.NEXT_PUBLIC_USDT_ADDRESS )
			loadBalances()
		}

	}

	const handleInvestAmountChange = ( e: any ) => {
		const investingAmount = Number( e.target.value )
		validateInputStablecoin( e.target.value )
		setStableCoinInvestAmount( e.target.value )
		setGldKrmBuyingAmount( ( investingAmount * RATE ).toString()  )
	}

	const validateInputStablecoin = ( value: string ) => {
		if( Number( stableCoinInvestAmount ) >  Number( stableCoinBalance ) ){
			setStableCoinHelperText( `Insufficient ${stableCoinOption} balance available` )
			setStableCoinError( true )
			return
		}
		if( Number( stableCoinInvestAmount ) * RATE > Number( gldkrmContractBalance ) ){
			setStableCoinHelperText( 'GLDKRM supply insuffient' )
			setStableCoinError( true )
			return
		}
		setStableCoinHelperText( '' )
		setStableCoinError( false )
	}

	const loadingComponents = () => {
		if( isActive ){
			return( <>
				<Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
					<Box>
						<Typography variant='h4' sx={{ marginBottom: 2, color: 'primary.main' }}>
                    		INVEST IN GOLD KARMA
						</Typography>
						{Boolean( process.env.NEXT_PUBLIC_IS_TEST ) ? (
							<Typography variant='body1' sx={{ marginBottom: 2 }}>
                        		ONLY FOR TEST
							</Typography>
						) : null}

						<TextField
							label={'Investing Amount'}
							value={stableCoinInvestAmount}
							type="number"
							onChange={handleInvestAmountChange}
							error={Boolean( stableCoinError )}
							helperText={stableCoinHelperText}
							margin="normal"
							sx={formFieldStyle}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											size="small"
											onClick={() => setStableCoinInvestAmount( stableCoinBalance )}
											title="Use max"
										>
											<Typography variant="caption">{stableCoinBalance} MAX</Typography>
										</IconButton>
										<FormControl sx={{ m: 1, minWidth: 120 }}>
											<Select
												value={stableCoinOption}
												onChange={handleStableCoinOptionChange}
												displayEmpty
												inputProps={{ 'aria-label': 'Select stablecoin' }}
												size="small"
											>
												{STABLECOIN_OPTIONS.map( ( option ) => (
													<MenuItem key={option.currency} value={option.currency}>
														{option.currency}
													</MenuItem>
												) )}
											</Select>
										</FormControl>
									</InputAdornment>
								),
							}}
						/>

						<GradientButton
							variant="contained"
							color="primary"
							sx={{ marginY: 2 }}
							onClick={handleBuy}
							disabled={checkInvestErrors()}
						>
							<PaymentIcon sx={{ marginRight: 1 }} />
                    		Receive {gldkrmBuyingAmount} GLDKRM
						</GradientButton>
					</Box>
				</Paper>


				<Snackbar
					open={isOpenSnackbar}
					onClose={handleClose}
					autoHideDuration={30000}
					message={snackbarMessage}
					action={''}
				/>
			</> )
		}
		else {
			return ( <> <PleaseConnect /> </> )
		}
	}

	const PleaseConnect = () => {
		return (
			<> 
				<PurplePaper>
					<TitleText variant='h5'> {gldkrm_ico.title_not_connected.toUpperCase()} </TitleText>
					<BodyText variant='body2'> {gldkrm_ico.project_description} </BodyText>
				</ PurplePaper> 
			</> )
	}


	return ( <>
		{loadingComponents()}
	</> )

}


export default Ico