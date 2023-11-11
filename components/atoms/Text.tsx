import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { palette } from 'style'


export const TitleText = styled( Typography )( () => ( {
	color: palette.pink
} ) )


export const BodyText = styled( Typography )( () => ( {
	color: palette.grey
} ) )