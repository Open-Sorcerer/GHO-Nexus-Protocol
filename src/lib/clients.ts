import { createPublicClient, http } from 'viem'

import { sepolia, arbitrumSepolia } from 'viem/chains'

export const sepoliaPublicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})

export const arbitrumSepoliaPublicClient = createPublicClient({
	chain: arbitrumSepolia,
	transport: http(),
})

// export const walletClient = createPublicClient({
// 	chain: sepolia,
// 	// transport:
// })
