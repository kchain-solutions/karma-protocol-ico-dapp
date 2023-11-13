import React, { useEffect, useState } from 'react'
import { ethers, BigNumber, Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Paper, Box, TextField, InputAdornment, IconButton, Typography, Button, Snackbar, Link, Divider, FormControl, Select, MenuItem } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

import icoAbi from '../../abis/ICO.json'
import gldkrmAbi from '../../abis/GLDKRM.json'
import gldkrm_ico from '../../contents/gldkrm_ico.json'
import { palette } from 'style'
import { GradientButton } from 'components/atoms/Buttons'
import ConnectButton from 'components/organisms/ConnectButton'

const STABLECOIN_OPTIONS = [{currency: 'USDC', address: process.env.NEXT_PUBLIC_USDC_ADDRESS}, {currency: 'USDT', address:process.env.NEXT_PUBLIC_USDT_ADDRESS}]
const RATE = Number( process.env.NEXT_PUBLIC_STABLECOIN_GLDKRM_CON_RATE )

interface ComponentProps {
	availableGldkrmAmount: string
}

const Ico: React.FC<ComponentProps> = ( {availableGldkrmAmount} ) => {

	const { isActive, account, provider,   } = useWeb3React()

	const [isAdmin, setIsAdmin] = useState<boolean>( false )

	const [stableCoinOption, setStableCoinOption] = useState<string>( STABLECOIN_OPTIONS[0].currency )
	const [stableCoinAddress, setStableCoinAddress] = useState<string>( STABLECOIN_OPTIONS[0].address )
	const [stableCoinBalance, setStableCoinBalance] = useState<string> ( '' )
	const [stableCoinContractBalance, setStableCoinContractBalance] = useState<string> ( '' )
	const [stableCoinInvestAmount, setStableCoinInvestAmount] = useState<string> ( '' )
	const [gldkrmBuyingAmount, setGldKrmBuyingAmount] = useState<string>( '' )
	const [gldkrmUserBalance, setGldkrmUserBalance] = useState<string>( '0' )
	const [gldkrmContractBalance, setGldkrmContractBalance] = useState<string>( '0' )
	const [icoContract, setIcoContract] = useState<ethers.Contract | undefined>()
	const [stableCoinContract, setStableCoinContract] = useState<ethers.Contract | undefined>() 
	const [gldkrmContract, setGldkrmContract] = useState<ethers.Contract | undefined>() 

	const [stableCoinError, setStableCoinError] = useState<Boolean>( false )
	const [stableCoinHelperText, setStableCoinHelperText] = useState<String>( '' )

	const [isOpenSnackbar, setIsOpenSnackbar] = useState( false )
	const [snackbarMessage, setSnackbarMessage] = useState( '' )

	
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
				setStableCoinBalance( ethers.utils.formatUnits( balance, 'ether' ) )
			} )

			stableCoinContract.balanceOf( process.env.NEXT_PUBLIC_ICO_ADDRESS ).then( ( balance:BigNumber ) => {
				setStableCoinContractBalance( ethers.utils.formatUnits( balance, 'ether' ) )
			} )
		}
	}


	const updateIsAdmin = async () => {
		if( icoContract ){
			const res: boolean = await icoContract.admins( account )
			setIsAdmin( res )
		}
	}

	const getSignerOrProvider = ( provider: ethers.providers.Web3Provider )=> {
		if ( provider?.getSigner ){
			return provider.getSigner()
		}
		else return provider
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

	useEffect( ( ) => {
		updateIsAdmin()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [icoContract] )


	const checkInvestErrors = () => {
		return ( ( Number( stableCoinInvestAmount ) >  Number( stableCoinBalance )  ) 
		|| ( Number( stableCoinInvestAmount ) * RATE > Number( gldkrmContractBalance ) ) 
		|| Number( stableCoinInvestAmount ) === 0 )
	}

	const handleBuy = async () => {
		if ( !stableCoinError ) {
			setSnackbarMessage( `Please remain online for the upcoming purchase authorization.\nCurrently authorizing the contract at ${process.env.NEXT_PUBLIC_ICO_ADDRESS} to use ${stableCoinInvestAmount} ${stableCoinOption} on your behalf.` )
			setIsOpenSnackbar( true )
	
			try {
				//Approve transaction request
				const txStableCoinResponse = await stableCoinContract.approve( process.env.NEXT_PUBLIC_ICO_ADDRESS, ethers.utils.parseUnits( stableCoinInvestAmount, 18 ) )
				await txStableCoinResponse.wait()
				setSnackbarMessage( `Authorization successful.\nInitiating the purchase of ${gldkrmBuyingAmount} GLDKRM. Please wait...` )
				setIsOpenSnackbar( true )

				//Buy transaction
				const txBuyResponse = await icoContract.buy( ethers.utils.parseUnits( stableCoinInvestAmount, 18 ), stableCoinAddress )
				const txBuyReceipt = await txBuyResponse.wait()
				setSnackbarMessage( `Purchase successful. Transaction Hash: ${txBuyReceipt.transactionHash}. Updating balances...` )
				setIsOpenSnackbar( true )
				
				setStableCoinInvestAmount( '0' )
				loadBalances()

			} catch ( error ) {
				console.error( 'TX rejected:', error )
				setSnackbarMessage( `TX rejected: ${error.message}` )
				setIsOpenSnackbar( true )
			}
		}
	}

	const handleWithdrawal = async () => {
		setSnackbarMessage( `Processing withdrawal request ${stableCoinContractBalance} ${stableCoinOption}. Please wait...` )
		setIsOpenSnackbar( true )
	
		try {

			//Withdrawal transaction
			const txBuyResponse = await icoContract.withdrawal( ethers.utils.parseUnits( stableCoinContractBalance, 18 ), stableCoinAddress )
			const txBuyReceipt = await txBuyResponse.wait()
			setSnackbarMessage( `Withdrawal transaction succeeded. TX Hash: ${txBuyReceipt.hash}. Please wait...` )
			setIsOpenSnackbar( true )
				
			loadBalances()

		} catch ( error ) {
			console.error( 'TX rejected:', error )
			setSnackbarMessage( `TX rejected: ${error.message}` )
			setIsOpenSnackbar( true )
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
				<Box sx={{mt:3}}>
					<Paper elevation={9} sx={{ padding: 2, backgroundColor: palette.purple, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<Typography variant='h4'  color={palette.yellow} sx={{ marginBottom: 2 }}>
                    		INVEST IN GOLD KARMA
						</Typography>
						{Boolean( process.env.NEXT_PUBLIC_IS_TEST ) ? (
							<Typography variant='h5' color={palette.yellow} sx={{ marginBottom: 2 }}>
                        		ONLY FOR TEST
							</Typography>
						) : null}

						<Typography variant="h6" color={palette.cyano} gutterBottom>
                    		Your balance: {gldkrmUserBalance} GLDKRM
						</Typography>
						
						<Box width={'60%'}>
							<TextField
								label={'Investment Amount'.toUpperCase()}
								value={stableCoinInvestAmount}
								type="number"
								onChange={handleInvestAmountChange}
								error={Boolean( stableCoinError )}
								helperText={stableCoinHelperText}
								fullWidth
								color='primary'
								margin="normal"
								sx={{ backgroundColor: palette.purple_light, input: { color: 'whitesmoke' }, label: { color: 'whitesmoke' }  }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												size="small"
												onClick={() => setStableCoinInvestAmount( stableCoinBalance )}
												title="Use max"
											>
												<Typography color='whitesmoke' variant="caption">{stableCoinBalance} MAX</Typography>
											</IconButton>
											<FormControl sx={{ m: 1, minWidth: 120 }}>
												<Select
													value={stableCoinOption}
													onChange={handleStableCoinOptionChange}
													displayEmpty
													inputProps={{ 'aria-label': 'Select stablecoin' }}
													size="small"
													sx={{color:'whitesmoke', backgroundColor: palette.purple}}
												>
													{STABLECOIN_OPTIONS.map( ( option ) => (
														<MenuItem key={option.currency} value={option.currency}>
															<Box sx={{ display: 'flex', alignItems: 'center' }}>
																{ option.currency === 'USDC' ? 
																	<img src={'/usdc.png'} alt="" style={{ width: 24, height: 24, marginRight: '8px' }} /> 
																	: <img src={'/tether.png'} alt="" style={{ width: 24, height: 24, marginRight: '8px' }} /> }
														 {option.currency} 
														 </Box>
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
								fullWidth
								sx={{ marginY: 2 }}
								onClick={handleBuy}
								disabled={checkInvestErrors()}
							>
								<PaymentIcon sx={{ marginRight: 1 }} />
                    		Receive {gldkrmBuyingAmount} GLDKRM
							</GradientButton>
							{isAdmin ? <GradientButton
								variant="contained"
								color="primary"
								fullWidth
								sx={{ marginY: 2 }}
								onClick={handleWithdrawal}
							>
								<PaymentIcon sx={{ marginRight: 1 }} />
                    		Withdraw {stableCoinContractBalance} {stableCoinOption}
							</GradientButton> : ''}
							
						</Box>
					</Paper>
				</Box>
				<Snackbar
					open={isOpenSnackbar}
					onClose={handleClose}
					autoHideDuration={60000}
					message={snackbarMessage}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					sx={{'& .MuiSnackbarContent-root': {
						color: 'whitesmoke', 
						backgroundColor: palette.pink,
					}}}
					action={<React.Fragment>
						<IconButton
						  size="small"
						  aria-label="close"
						  color="inherit"
						  onClick={handleClose}
						  sx={{color: palette.yellow}}
						>
						  <CloseIcon fontSize="small" />
						</IconButton>
					  </React.Fragment>}
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
				<Box sx={{mt:3}}>
					<Paper elevation={9} sx={{ padding: 2, backgroundColor: palette.purple, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<Typography variant='h4' color={palette.pink} sx={{marginBottom: 2}}> {gldkrm_ico.title_not_connected.toUpperCase()} </Typography>
					</ Paper> 
				</Box>
			</> )
	}


	return ( <>
		{loadingComponents()}
	</> )

}


export default Ico