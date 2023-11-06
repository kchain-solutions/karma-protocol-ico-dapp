export function isParsableToNumber( value: string ): boolean {
	const number = +value
	return !isNaN( number ) && isFinite( number )
}