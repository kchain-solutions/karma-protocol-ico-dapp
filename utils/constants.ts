import { Chain, CurrentConfig } from './config'

// Chains
const MAINNET_CHAIN_ID = 1
const POLYGON_CHAIN_ID = 137
const MUMBAI_CHAIN_ID = 80001
const SEPOLIA_CHAIN_ID = 11155111

export const INPUT_CHAIN_ID = CurrentConfig.chain === Chain.POLYGON ? POLYGON_CHAIN_ID : MAINNET_CHAIN_ID
export const INPUT_CHAIN_URL =
  CurrentConfig.chain === Chain.POLYGON ? CurrentConfig.rpc.polygon : CurrentConfig.rpc.mainnet

export const CHAIN_TO_URL_MAP = {
	[POLYGON_CHAIN_ID]: CurrentConfig.rpc.polygon,
	[MAINNET_CHAIN_ID]: CurrentConfig.rpc.mainnet,
	[MUMBAI_CHAIN_ID]: CurrentConfig.rpc.mainnet,
	[SEPOLIA_CHAIN_ID]: CurrentConfig.rpc.mainnet,
}

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
	[MAINNET_CHAIN_ID]: {
		explorer: 'https://etherscan.io/',
		label: 'Ethereum',
		nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
		rpcUrl: CurrentConfig.rpc.mainnet,
	},
	[POLYGON_CHAIN_ID]: {
		explorer: 'https://polygonscan.com/',
		label: 'Polygon',
		nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
		rpcUrl: CurrentConfig.rpc.polygon,
	},
	[SEPOLIA_CHAIN_ID]: {
		explorer: 'https://sepolia.etherscan.io',
		label: 'Sepolia',
		nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
		rpcUrl: CurrentConfig.rpc.sepolia,
	},
	[MUMBAI_CHAIN_ID]: {
		explorer: 'https://mumbai.polygonscan.com/',
		label: 'Mumbai',
		nativeCurrency: { name: 'Polygon Matic', symbol: 'Matic', decimals: 18 },
		rpcUrl: CurrentConfig.rpc.mumbai,
	},
}

// URLs
export const METAMASK_URL = 'https://metamask.io/'
