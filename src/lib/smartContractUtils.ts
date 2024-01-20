import tokenBridgeABI from './tokenBridgeABI.json'
import { tokenBridgeEthSepoliaAddress } from './consts'

import { getContract } from 'viem'
import { sepoliaPublicClient } from './clients'
import { useAccount, useWalletClient } from 'wagmi'
import { simulateContract } from 'viem/_types/actions/public/simulateContract'

const useBridge = () => {
	const { address } = useAccount()
	const walletClient = useWalletClient()

	const callBridge = async () => {
		console.log('hello')
	}

	return {
		callBridge,
	}
}

export default useBridge
