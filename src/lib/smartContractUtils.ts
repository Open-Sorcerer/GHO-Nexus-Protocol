import tokenBridgeABI from './tokenBridgeABI.json'
import { tokenBridgeEthSepoliaAddress } from './consts'

import { usePublicClient } from 'wagmi'
import { sepoliaPublicClient } from './clients'
import { getContract, WalletClient, createPublicClient } from 'viem'

const useBridge = () => {
	const ethSepoliaBridge = getContract({
		address: tokenBridgeEthSepoliaAddress,
		abi: tokenBridgeABI,
		publicClient: sepoliaPublicClient,
	})

	const callBridge = async () => {
		const res = ethSepoliaBridge
		console.log(res)
	}

	return { callBridge }
}
