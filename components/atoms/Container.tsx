import { Paper } from '@mui/material'
import { palette } from 'style'

export const PurplePaper = ( { children }: { children: React.ReactNode } ) => {
	return ( <>
		<Paper elevation={9} sx={{backgroundColor: palette.purple, padding: '10px'}}>
			{children}
		</Paper>
	</> )

}