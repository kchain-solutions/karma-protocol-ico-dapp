// Sets if the example should run locally or on chain
export enum Chain {
  POLYGON,
  MAINNET,
  SEPOLIA,
  MUMBAI,
}

// Inputs that configure this example to run
interface ExampleConfig {
  chain: Chain
  rpc: {
    polygon: string
    mainnet: string
    sepolia: string
    mumbai: string
  }
}

// Example Configuration
export const CurrentConfig: ExampleConfig = {
	chain: Chain.MAINNET,
	rpc: {
		polygon: '',
		mainnet: '',
		sepolia: '',
		mumbai: ''
	},
}
