export function isParsableToNumber( value: string ): boolean {
	const number = +value
	return !isNaN( number ) && isFinite( number )
}

/**
 * Returns first 4 characters and last 4 characters
 */
export function ellipsis( address: string, prefixLength: number, suffixLength: number ): string {
	if ( address.length < prefixLength + suffixLength ) return address
	return `${address.substring( 0, prefixLength )}...${address.substring( address.length - suffixLength )}`
}
  