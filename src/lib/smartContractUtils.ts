import { usePermit } from 'wagmi-permit'
import GHOTokenABI from './GHOTokenABI.json'
import { sepoliaPublicClient } from './clients'
import tokenBridgeABI from './tokenBridgeABI.json'
import { simulateContract } from 'viem/_types/actions/public/simulateContract'
import { tokenBridgeEthSepoliaAddress, tokenBridgeArbSepoliaAddress } from './consts'
import {
	useAccount,
	useWalletClient,
	usePublicClient,
	usePrepareContractWrite,
	useContractRead,
	useContractWrite,
} from 'wagmi'

import { formatEther, parseEther } from 'viem'
import {
	chainIdArbitrumSepolia,
	chainIdEthereumSepolia,
	GhoTokenAddressEthSepolia,
	GhoTokenAddressArbSepolia,
} from './consts'

const useBridge = () => {
	const { address } = useAccount()
	const { data: walletClient } = useWalletClient()
	const publicClient = usePublicClient()

	/// first call GHO Token Address
	/// Call the function allowance to get the amount of tokens that the spender can spend from the owner
	//
	const { data: GhoArbSepoliaAllowance } = useContractRead({
		address: GhoTokenAddressArbSepolia,
		abi: GHOTokenABI,
		functionName: 'allowance',
		args: [address, tokenBridgeArbSepoliaAddress],
	})

	const { data: GhoEthSepoliaAllowance } = useContractRead({
		address: GhoTokenAddressEthSepolia,
		abi: GHOTokenABI,
		functionName: 'allowance',
		args: [address, tokenBridgeEthSepoliaAddress],
	})

	/// Allowance Address 1 = Owner Addre2 = Spender

	/// If allowed amount is less than the amount you want to transfer, call the function approve to allow the spender to spend the amount you want to transfer
	/// approval address = spender and amount = amount you want to transfer

	const { config: GhoArbSepoliaApprovalConfig } = usePrepareContractWrite({
		address: GhoTokenAddressArbSepolia,
		abi: GHOTokenABI,
		functionName: 'approve',
		args: [
			tokenBridgeArbSepoliaAddress, // giving spending rights to the bridge
			2000000000000000000n,
		], // 1 GHO
	})

	const { write: GhoArbSepoliaApproval } = useContractWrite(GhoArbSepoliaApprovalConfig)

	const { config: GhoEthSepoliaApprovalConfig } = usePrepareContractWrite({
		address: GhoTokenAddressEthSepolia,
		abi: GHOTokenABI,
		functionName: 'approve',
		args: [
			tokenBridgeEthSepoliaAddress, // giving spending rights to the bridge
			2000000000000000000n, // 1 GHO
		], // 1 GHO, change to variable
	})

	const { write: GhoEthSepoliaApproval } = useContractWrite(GhoEthSepoliaApprovalConfig)

	/// Call Bridge function

	const { config: GhoArbSepoliaBridgeConfig } = usePrepareContractWrite({
		address: tokenBridgeArbSepoliaAddress,
		abi: tokenBridgeABI,
		functionName: 'transferTokens',
		args: [
			chainIdEthereumSepolia, // sending to Ethereum Sepolia
			address, // receiver address
			GhoTokenAddressArbSepolia, // source chain token address (Arbitrum Sepolia)
			1000000000000000000n, // amount
		], // 1 GHO, change to variable
	})

	const { write: GhoArbSepoliaBridge, data } = useContractWrite(GhoArbSepoliaBridgeConfig)

	const { config: GhoEthSepoliaBridgeConfig } = usePrepareContractWrite({
		address: tokenBridgeEthSepoliaAddress,
		abi: tokenBridgeABI,
		functionName: 'transferTokens',
		args: [
			chainIdArbitrumSepolia, // sending to Arbitrum Sepolia
			address, // receiver address
			GhoTokenAddressEthSepolia, // source chain token address (Ethereum Sepolia)
			1000000000000000000n, // amount
		], // 1 GHO, change to variable
	})

	const { write: GhoEthSepoliaBridge } = useContractWrite(GhoEthSepoliaBridgeConfig)

	/// permit functions

	/// sign permit

	const { signPermit, signature, error } = usePermit({
		walletClient,
		ownerAddress: address,
		chainId: 11155111,
		spenderAddress: tokenBridgeEthSepoliaAddress,
		contractAddress: GhoTokenAddressEthSepolia,
		deadline: BigInt(Math.floor(Date.now() / 1000) + 100_000),
	})

	const callBridge = async () => {
		console.log('publicClient', await publicClient.getChainId())
		console.log('EthSepoliaData', formatEther(GhoEthSepoliaAllowance as bigint))

		// GhoEthSepoliaApproval?.()
		// GhoEthSepoliaBridge?.()
		console.log(BigInt(Math.floor(Date.now() / 1000) + 100_000))
		const permitSignature = await signPermit?.({
			value: parseEther('1'),
			deadline: BigInt(Math.floor(Date.now() / 1000) + 100_000),
		})

		console.log('permitSignature', permitSignature)
	}
	return { callBridge }
}

export default useBridge
