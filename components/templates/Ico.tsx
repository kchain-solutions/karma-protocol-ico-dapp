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

const STABLECOIN_OPTIONS = [{currency: 'USDC', address: process.env.NEXT_PUBLIC_USDC_ADDRESS}, {currency: 'USDT', address:process.env.NEXT_PUBLIC_USDT_ADDRESS}]
const RATE = Number( process.env.NEXT_PUBLIC_STABLECOIN_GLDKRM_CON_RATE )


const Ico = () => {

	const { isActive, account, provider,   } = useWeb3React()

	const [stableCoinOption, setStableCoinOption] = useState<string>( STABLECOIN_OPTIONS[0].currency )
	const [stableCoinAddress, setStableCoinAddress] = useState<string>( STABLECOIN_OPTIONS[0].address )
	const [stableCoinBalance, setstableCoinBalance] = useState<number> ( 0 )
	const [stableCoinInvestAmount, setStableCoinInvestAmount] = useState<number> ( 0 )
	const [gldkrmUserBalance, setGldkrmUserBalance] = useState<number>( 0 )
	const [gldkrmContractBalance, setGldkrmContractBalance] = useState<number>( 0 )
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
				setGldkrmUserBalance( Number( ethers.utils.formatUnits( balance, 'ether' ) ) )
			} )
			gldkrmContract.balanceOf( process.env.NEXT_PUBLIC_ICO_ADDRESS ).then( ( balance: BigNumber ) => {
				setGldkrmContractBalance( Number( ethers.utils.formatUnits( balance, 'ether' ) ) )
			} )
		}
		if( stableCoinContract ){
			stableCoinContract.balanceOf( account ).then( ( balance:BigNumber ) => {
				setstableCoinBalance( Number( ethers.utils.formatUnits( balance, 'ether' ) ) )
			} )
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
		}
		else{
			setIcoContract( undefined )
			setGldkrmContract( undefined )
		}
	}, [account, isActive, provider] )

	useEffect( () => {
		if( isActive ){
			const stablecoin = new Contract( stableCoinAddress, gldkrmAbi, getSignerOrProvider( provider ) )
			setStableCoinContract( stablecoin )
		}
		else{
			setStableCoinContract( undefined )
		}
	}, [isActive, stableCoinAddress, provider] )

	useEffect( () => {
		loadBalances()
	} , [stableCoinContract, gldkrmContract] )

	const handleDollarChange = ( e: any ) => {
		setstableCoinBalance( e.target.value )
	}

	const validateStablecoin = ( value: any ) => {

	}

	const checkInvestErrors = () => {
		return ( stableCoinInvestAmount >  stableCoinBalance  ) || ( stableCoinInvestAmount * RATE > gldkrmContractBalance ) 
	}

	const handleBuy = () => {
	}

	const handleClose = ( _event: any, reason: any ) => {
		if ( reason === 'clickaway' ) {
			return
		}
		setIsOpenSnackbar( false )
	}

	const handleStableCoinOptionChange = () => {

	}

	const handleInvestAmountChange = () => {

	}

	const loadingComponents = () => {
		if( isActive ){
			return( <> <IcoForm /> </> )
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

	const IcoForm = () => {

		return (
			<>
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

						<Button
							variant="contained"
							color="primary"
							sx={{ marginY: 2 }}
							onClick={handleBuy}
							disabled={checkInvestErrors()}
						>
                    		Buy GLDKRM
						</Button>
					</Box>
				</Paper>


				<Snackbar
					open={isOpenSnackbar}
					onClose={handleClose}
					autoHideDuration={30000}
					message={snackbarMessage}
					action={''}
				/>
			</>
		)
	}


	return ( <>
		{loadingComponents()}
	</> )

}


export default Ico