/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { ethers, BigNumber, Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Paper, Box, TextField, InputAdornment, IconButton, Typography, Snackbar, FormControl, Select, MenuItem, Grid, Dialog, DialogContent, CircularProgress } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

import icoAbi from '../../abis/ICO.json'
import gldkrmAbi from '../../abis/GLDKRM.json'
import gldkrm_ico from '../../contents/gldkrm_ico.json'
import { palette } from 'style'
import { GradientButton } from 'components/atoms/Buttons'

const STABLECOIN_OPTIONS = [{currency: 'USDC', address: process.env.NEXT_PUBLIC_USDC_ADDRESS}]
const RATE = Number( process.env.NEXT_PUBLIC_STABLECOIN_GLDKRM_CON_RATE )

import usdcIcon from '../../public/usdc.png'
import tetherIcon from '../../public/tether.png'


const Ico = (  ) => {

	const { isActive, account, provider,   } = useWeb3React()

	const [isAdmin, setIsAdmin] = useState<boolean>( false )

	const [stableCoinOption, setStableCoinOption] = useState<string>( STABLECOIN_OPTIONS[0].currency )
	const [stableCoinAddress, setStableCoinAddress] = useState<string>( STABLECOIN_OPTIONS[0].address )
	const [stableCoinBalance, setStableCoinBalance] = useState<string> ( '' )
	const [stableCoinContractBalance, setStableCoinContractBalance] = useState<string> ( '' )
	const [stableCoinInvestAmount, setStableCoinInvestAmount] = useState<string> ( '0.00' )
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
	const [dialogMessage, setDialogMessage] = useState( '' )
	const [isBuyLoading, setIsBuyLoading] = useState( false )

	
	const loadBalances = ( ) => {
		if ( gldkrmContract && account ) {
			gldkrmContract.balanceOf( account ).then( ( balance: BigNumber ) => {
				setGldkrmUserBalance(  ethers.utils.formatUnits( balance, 'ether' )  )
			} )
			gldkrmContract.balanceOf( process.env.NEXT_PUBLIC_ICO_ADDRESS ).then( ( balance: BigNumber ) => {
				setGldkrmContractBalance( ethers.utils.formatUnits( balance, 'ether' ) )
			} )

		}
		if( stableCoinContract && account ){
			stableCoinContract.balanceOf( account ).then( ( balance:BigNumber ) => {
				setStableCoinBalance( ethers.utils.formatUnits( balance, 6 ) )
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
	}, [account, isActive, provider] )
	
	useEffect( () => {
		const stablecoin = new Contract( stableCoinAddress, gldkrmAbi, getSignerOrProvider( provider ) )
		setStableCoinContract( stablecoin )
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stableCoinAddress] )

	useEffect( () => {
		loadBalances()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	} , [stableCoinContract, gldkrmContract, stableCoinInvestAmount] )

	useEffect( ( ) => {
		updateIsAdmin()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [icoContract] )

	useEffect( ()=> {
		if( Number( stableCoinInvestAmount ) > 0 ){
			setGldKrmBuyingAmount( ( Number( stableCoinInvestAmount ) * RATE ).toString()  )
		}
	}, [stableCoinInvestAmount] )


	const checkInvestErrors = () => {
		return ( ( Number( stableCoinInvestAmount ) >  Number( stableCoinBalance )  ) 
		|| ( Number( stableCoinInvestAmount ) * RATE > Number( gldkrmContractBalance ) ) 
		|| Number( stableCoinInvestAmount ) === 0 )
	}

	const handleBuy = async () => {
		setSnackbarMessage( '' )
		setIsOpenSnackbar( false )
		setDialogMessage( '' )

		if ( !stableCoinError ) {
			setIsBuyLoading( true )
			setDialogMessage( `Authorizing the contract ${process.env.NEXT_PUBLIC_ICO_ADDRESS} to spend ${stableCoinInvestAmount} ${stableCoinOption} on your behalf.` )
	
			try {
				//Approve transaction request
				let txStableCoinResponse = await stableCoinContract.approve( process.env.NEXT_PUBLIC_ICO_ADDRESS, ethers.utils.parseUnits( stableCoinInvestAmount, 6 ) )
				await txStableCoinResponse.wait()
				setDialogMessage( `Authorization successful.\nInitiating the purchase of ${gldkrmBuyingAmount} GLDKRM.` )

				//Buy transaction
				const txBuyResponse = await icoContract.buy( ethers.utils.parseUnits( stableCoinInvestAmount, 6 ), stableCoinAddress )
				const txBuyReceipt = await txBuyResponse.wait()

				setSnackbarMessage( `Purchase successful. Transaction Hash: ${txBuyReceipt.transactionHash}. Updating balances...` )
				setIsOpenSnackbar( true )
				setStableCoinInvestAmount( '0' )
				setIsBuyLoading( false )
				loadBalances()

			} catch ( error ) {
				console.error( 'TX rejected:', error )
				setSnackbarMessage( `TX rejected: ${error.message}` )
				setIsBuyLoading( false )
				setIsOpenSnackbar( true )
			}
		}
	}

	const handleWithdrawal = async () => {
		setSnackbarMessage( `Processing withdrawal request ${stableCoinContractBalance} ${stableCoinOption}. Please wait...` )
		setIsOpenSnackbar( true )
	
		try {

			//Withdrawal transaction
			const txBuyResponse = await icoContract.withdrawal( ethers.utils.parseUnits( stableCoinContractBalance, 6 ), stableCoinAddress )
			const txBuyReceipt = await txBuyResponse.wait()
			setSnackbarMessage( `Withdrawal transaction succeeded. TX Hash: ${txBuyReceipt.transactionHash}. Please wait...` )
			setIsOpenSnackbar( true )
				
			loadBalances()

		} catch ( error ) {
			console.error( 'TX rejected:', error )
			setSnackbarMessage( `TX rejected: ${error.message}` )
			setIsOpenSnackbar( true )
		}
	}

	const handleClose = ( event?: React.SyntheticEvent | Event, reason?: string ) => {
		if ( reason === 'clickaway' ) {
			return
		}
		setIsOpenSnackbar( false )
	}

	const handleStableCoinOptionChange = ( e: any ) => {
		setStableCoinOption( e.target.value )
		if( e.target.value === 'USDC' ){
			setStableCoinAddress( process.env.NEXT_PUBLIC_USDC_ADDRESS )
		}
		if( e.target.value === 'USDT' ){
			setStableCoinAddress( process.env.NEXT_PUBLIC_USDT_ADDRESS )
		}

	}

	const handleInvestAmountChange = ( e: any ) => {
		const investingAmount = Number( e.target.value )
		validateInputStablecoin( e.target.value )
		setStableCoinInvestAmount( e.target.value )
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
				<Grid item xs={12}>
					<Typography variant='h5' textAlign={'center'}  color={palette.yellow}>
                    		INVEST IN GOLD KARMA
					</Typography>
					<Typography variant="body2" textAlign={'center'} color='whitesmoke' >
                        The transaction process involves two steps. Initially, you authorize the smart contract to access your stablecoin. Following this, you can exchange your stablecoin for GLDKRM.
					</Typography>
				</Grid>

				<Grid item xs={12}>
					{Boolean( process.env.NEXT_PUBLIC_IS_TEST ) ? (
						<Typography variant='h6' textAlign={'center'} color={palette.yellow}>
                        		TESTNET VERSION
						</Typography>
					) : null}
				</Grid>

				<Grid item xs={12}>
					<Typography textAlign={'center'} variant="h6" color={palette.cyano} gutterBottom>
                    		YOUR BALANCE: {gldkrmUserBalance} GLDKRM
					</Typography>
				</Grid>
						
				<Grid item xs={12} sx={{display:'flex', flexDirection:'columns', justifyContent: 'center', alignItems: 'center'}}>
					<TextField
						label={'buy gldkrm'.toUpperCase()}
						value={stableCoinInvestAmount}
						type="number"
						onChange={handleInvestAmountChange}
						error={Boolean( stableCoinError )}
						helperText={stableCoinHelperText}
						fullWidth
						color='primary'
						margin="normal"
						sx={{ backgroundColor: palette.purple_light, input: { color: 'whitesmoke' }, label: { color: 'whitesmoke' }, width:{xs:'100%', md:'50%'}  }}
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
															<Image src={usdcIcon} alt="USDC ICON" style={{ width: 24, height: 'auto', marginRight: '8px' }} />
															: <Image src={tetherIcon} alt="USDT ICON" style={{ width: 24, height: 'auto', marginRight: '8px' }} /> }
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
				</Grid>

				<Grid item xs={12} sx={{display:'flex', flexDirection:'columns', justifyContent: 'center', alignItems: 'center'}}>
					<GradientButton	
						onClick={handleBuy}
						disabled={checkInvestErrors()}
						sx={{width:{xs:'100%', md:'50%'}}}
					>
						<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<PaymentIcon sx={{ marginRight: 1 }} />
                    		<Typography variant='body2'> BUY {gldkrmBuyingAmount} GLDKRM </Typography>
						</Box>
					</GradientButton>		
				</Grid>
				{isAdmin ? <Grid item xs={12} sx={{display:'flex', flexDirection:'columns', justifyContent: 'center', alignItems: 'center', marginBottom:1}}> 
					<GradientButton
						variant="contained"
						onClick={handleWithdrawal}
						sx={{width:{xs:'100%', md:'50%'}}}
					>
						<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<PaymentIcon sx={{ marginRight: 1 }} />
							<Typography variant='body2'> Withdraw {stableCoinContractBalance} {stableCoinOption} </Typography>
						</Box>
					</GradientButton> </Grid>: ''}
			</> )
		}
		else {
			return ( <> <PleaseConnect /> </> )
		}
	}

	const PleaseConnect = () => {
		return (
			<> 
				<Grid item xs={12}>
					<Typography variant='h5' textAlign={'center'} color={palette.pink} sx={{marginBottom: 2}}> {gldkrm_ico.title_not_connected.toUpperCase()} </Typography>
				</ Grid> 
			</>
		)
	}


	return ( <>
		<Paper elevation={9} sx={{backgroundColor: palette.purple }}>
			<Grid container spacing={1} sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{loadingComponents()}
			</Grid>

			<Dialog open={isBuyLoading} aria-labelledby="loading-dialog">
				<IconButton
					aria-label="close"
					onClick={() => {setIsBuyLoading( false )}}
					sx={{ 
						position: 'absolute', 
						right: 8, 
						top: 8, 
						color: ( theme ) => theme.palette.grey[500]
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent sx={{
					backgroundColor: palette.purple_light, 
					borderColor: 'whitesmoke',
					borderStyle: 'solid',
					borderWidth: '1px',
					display: 'flex', 
					flexDirection: 'column', 
					justifyContent: 'center',
					alignItems: 'center', 
				}}>
					<Typography variant='h6' color={palette.cyano} textAlign={'center'} sx={{paddingTop:2, marginBottom: 1}}> PLEASE WAIT </Typography>
					<CircularProgress sx={{color:palette.cyano, marginBottom: 4}}/>
					<Typography variant='body1' color={palette.yellow} textAlign={'center'} sx={{marginBottom:1}}> CHECK YOUR WALLET </Typography>
					<Typography variant='body2' color='whitesmoke' textAlign={'center'} sx={{paddingRight: 2, paddingLeft:2, paddingBottom:2}}> {dialogMessage} </Typography>
				</DialogContent>
			</Dialog>

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
		</ Paper> 
	</> )

}


export default Ico