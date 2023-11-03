
import { Button }  from '@mui/material'
import { styled } from '@mui/material/styles'
import { palette } from 'style'

export const GradientButton = styled(Button)(() => ({
	background: `linear-gradient(20deg, ${palette.pink} 20%, ${palette.yellow} 90%)`,
	color: 'white',
	width: '100%',
	padding: '5px',
	marginTop: '3px',
	marginBottom:'3px',
}))


export const StandardButton = styled(Button)(() => ({
	background: palette.pink,
	color: 'white',
	padding: '5px',
	marginTop: '5px',
	marginBottom:'5px',
}))


