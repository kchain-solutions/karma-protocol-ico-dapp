import { Typography } from '@mui/material'
import { palette } from 'style'

export const BodyText = (text: string) => {
	<Typography variant = 'body2' sx={{color: palette.grey}}>
        `${text}`
	</Typography>
}