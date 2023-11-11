import { createTheme } from '@mui/material'

export const palette = {
	purple: '#37326E',
	purple_light:'#5d56a3',
	cyano: '#74C4C4',
	pink: '#D8438C',
	yellow: '#F9BE38',
	grey: '#C8CCCC'
}

export const theme = createTheme( {
	palette: {
		background: {
			default: palette.purple_light,  // Replace with your desired color or gradient
		},
	},
} )

export const formBoxStyle = {
	display: 'flex',
	flexGrow: 6,
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: 1
}

export const formFieldStyle = {
	width: '40%',
	marginTop: 1,
	marginBottom: 1
}