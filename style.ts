import { createTheme } from '@mui/material'

export const palette = {
	purple: '#37326E',
	purple_light:'#5d56a3',
	cyano: '#74C4C4',
	pink: '#D8438C',
	yellow: '#F9BE38',
	grey: 'C8CCCC'
}

export const theme = createTheme({
	palette: {
		background: {
			default: palette.purple_light,  // Replace with your desired color or gradient
		},
	},
})