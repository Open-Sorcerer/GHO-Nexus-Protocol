import { createPublicClient, http, createWalletClient, custom } from 'viem'

import { sepolia, arbitrumSepolia } from 'viem/chains'
declare var window: any

export const sepoliaPublicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})

export const arbitrumSepoliaPublicClient = createPublicClient({
	chain: arbitrumSepolia,
	transport: http(),
})

export const walletClient = createWalletClient({
	chain: sepolia,
	transport: custom(window.ethereum),
})

export const config = createConfig({
	publicClient: sepoliaPublicClient,
})
