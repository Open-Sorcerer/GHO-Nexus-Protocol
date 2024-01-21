import { usePermit } from 'wagmi-permit'
import GHOTokenABI from './GHOTokenABI.json'
import tokenBridgeABI from './tokenBridgeABI.json'
import LendingContractABI from './SourceContractABI.json'
import {
	useAccount,
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	usePublicClient,
	useWalletClient,
} from 'wagmi'
import {
	ArbSepoliaLendingContractAddress,
	BnMTokenAddressArbSepolia,
	BnMTokenAddressEthSepolia,
	chainIdArbitrumSepolia,
	chainIdEthereumSepolia,
	GhoTokenAddressArbSepolia,
	GhoTokenAddressEthSepolia,
	tokenBridgeArbSepoliaAddress,
	tokenBridgeEthSepoliaAddress,
} from './consts'

import { formatEther } from 'viem'

const useBridge = (props: any) => {
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

	const { data: BnMArbSepoliaAllowance } = useContractRead({
		address: BnMTokenAddressArbSepolia,
		abi: GHOTokenABI,
		functionName: 'allowance',
		args: [address, tokenBridgeArbSepoliaAddress],
	})

	const { data: BnMEthSepoliaAllowance } = useContractRead({
		address: BnMTokenAddressEthSepolia,
		abi: GHOTokenABI,
		functionName: 'allowance',
		args: [address, tokenBridgeEthSepoliaAddress],
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
			props?.amount,
		], // 1 GHO
	})

	const { write: GhoArbSepoliaApproval } = useContractWrite(GhoArbSepoliaApprovalConfig)

	const { config: BnMArbSepoliaApprovalConfig } = usePrepareContractWrite({
		address: BnMTokenAddressArbSepolia,
		abi: GHOTokenABI,
		functionName: 'approve',
		args: [
			tokenBridgeArbSepoliaAddress, // giving spending rights to the bridge
			props?.amount,
		], // 1 GHO
	})

	const { write: BnMArbSepoliaApproval } = useContractWrite(BnMArbSepoliaApprovalConfig)

	const { config: GhoEthSepoliaApprovalConfig } = usePrepareContractWrite({
		address: GhoTokenAddressEthSepolia,
		abi: GHOTokenABI,
		functionName: 'approve',
		args: [
			tokenBridgeEthSepoliaAddress, // giving spending rights to the bridge
			props?.amount, // 1 GHO
		], // 1 GHO, change to variable
	})

	const { write: GhoEthSepoliaApproval } = useContractWrite(GhoEthSepoliaApprovalConfig)

	const { config: BnMEthSepoliaApprovalConfig } = usePrepareContractWrite({
		address: BnMTokenAddressEthSepolia,
		abi: GHOTokenABI,
		functionName: 'approve',
		args: [
			tokenBridgeEthSepoliaAddress, // giving spending rights to the bridge
			props?.amount, // 1 GHO
		], // 1 GHO, change to variable
	})

	const { write: BnMEthSepoliaApproval } = useContractWrite(BnMEthSepoliaApprovalConfig)

	/// Call Bridge function

	const { config: GhoArbSepoliaBridgeConfig } = usePrepareContractWrite({
		address: tokenBridgeArbSepoliaAddress,
		abi: tokenBridgeABI,
		functionName: 'transferTokens',
		args: [
			chainIdEthereumSepolia, // sending to Ethereum Sepolia
			address, // receiver address
			GhoTokenAddressArbSepolia, // source chain token address (Arbitrum Sepolia)
			props?.amount, // amount
		],
	})

	const { write: GhoArbSepoliaBridge, data } = useContractWrite(GhoArbSepoliaBridgeConfig)

	const { config: BnMArbSepoliaBridgeConfig } = usePrepareContractWrite({
		address: tokenBridgeArbSepoliaAddress,
		abi: tokenBridgeABI,
		functionName: 'transferTokens',
		args: [
			chainIdEthereumSepolia, // sending to Ethereum Sepolia
			address, // receiver address
			BnMTokenAddressArbSepolia, // source chain token address (Arbitrum Sepolia)
			props?.amount, // amount
		],
	})

	const { write: BnMArbSepoliaBridge } = useContractWrite(BnMArbSepoliaBridgeConfig)

	const { config: GhoEthSepoliaBridgeConfig } = usePrepareContractWrite({
		address: tokenBridgeEthSepoliaAddress,
		abi: tokenBridgeABI,
		functionName: 'transferTokens',
		args: [
			chainIdArbitrumSepolia, // sending to Arbitrum Sepolia
			address, // receiver address
			GhoTokenAddressEthSepolia, // source chain token address (Ethereum Sepolia)
			props?.amount, // amount
		], // 1 GHO, change to variable
	})

	const {
		write: GhoEthSepoliaBridge,
		data: GhoEthSepoliaBridgeData,
		isSuccess,
		isLoading,
	} = useContractWrite(GhoEthSepoliaBridgeConfig)

	const { config: BnMEthSepoliaBridgeConfig } = usePrepareContractWrite({
		address: tokenBridgeEthSepoliaAddress,
		abi: tokenBridgeABI,
		functionName: 'transferTokens',
		args: [
			chainIdArbitrumSepolia, // sending to Arbitrum Sepolia
			address, // receiver address
			BnMTokenAddressEthSepolia, // source chain token address (Ethereum Sepolia)
			props?.amount, // amount
		], // 1 GHO, change to variable
	})

	const { write: BnMEthSepoliaBridge } = useContractWrite(BnMEthSepoliaBridgeConfig)

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

	/////
	// Lending Functions
	/////

	/// Approval

	const { config: LendingContractApprovalConfig } = usePrepareContractWrite({
		address: GhoTokenAddressArbSepolia,
		abi: GHOTokenABI,
		functionName: 'approve',
		args: [
			ArbSepoliaLendingContractAddress, // giving spending rights to the bridge
			1000000000000000000n, // 1 GHO
		], // 1 GHO, change to variable
	})

	const { write: LendingContractApproval } = useContractWrite(LendingContractApprovalConfig)

	const { config: LendingContractConfig } = usePrepareContractWrite({
		address: ArbSepoliaLendingContractAddress, // change address
		abi: LendingContractABI,
		functionName: 'lendToken',
		args: [
			GhoTokenAddressArbSepolia, // token to supply
			1000000000000000000n, // amount to supply
			chainIdEthereumSepolia, // chain to supply to
			'0x41cd49f1fb38b07e072a9c815c629a7a48b18061', // receiving contract address
		],
	})

	const { write: LendingContractWrite } = useContractWrite(LendingContractConfig)

	const approvingGHO = async (chainId: string) => {
		if (chainId === '421614') {
			LendingContractApproval?.()
		} else {
			console.log('wrong chain')
		}
	}

	const lendingGHO = async (chainId: string) => {
		if (chainId === '421614') {
			LendingContractWrite?.()
		} else {
			console.log('wrong chain')
		}
	}

	const callBridge = async () => {
		console.log('Approval', LendingContractConfig)

		// LendingContractApproval?.()
		LendingContractWrite?.()

		// console.log(props.amount)
		// console.log('publicClient', await publicClient.getChainId())
		// console.log('EthSepoliaData', formatEther(GhoEthSepoliaAllowance as bigint))

		// GhoEthSepoliaApproval?.()
		// GhoEthSepoliaBridge?.()
		// console.log(BigInt(Math.floor(Date.now() / 1000) + 100_000))
		// const permitSignature = await signPermit?.({
		// 	value: parseEther('1'),
		// 	deadline: BigInt(Math.floor(Date.now() / 1000) + 100_000),
		// })

		// console.log('permitSignature', permitSignature)
	}

	const checkingAllowance = async (chainId: string, tokenName: string): Promise<string> => {
		let allowanceAmount
		if (chainId === '11155111' && tokenName === 'GHO') {
			allowanceAmount = GhoEthSepoliaAllowance
			console.log('allowanceAmount', allowanceAmount)
		} else if (chainId === '11155111' && tokenName === 'mockEth') {
			allowanceAmount = BnMEthSepoliaAllowance
			console.log('allowanceAmount', allowanceAmount)
		} else if (chainId === '421614' && tokenName === 'GHO') {
			allowanceAmount = GhoArbSepoliaAllowance
			console.log('allowanceAmount', allowanceAmount)
		} else if (chainId === '421614' && tokenName === 'mockEth') {
			allowanceAmount = BnMArbSepoliaAllowance
			console.log('allowanceAmount', allowanceAmount)
		}
		return formatEther(allowanceAmount as bigint)
	}

	const sendAllowanceTransaction = async (chainId: string, tokenName: string) => {
		if (chainId === '11155111' && tokenName === 'GHO') {
			GhoEthSepoliaApproval?.()
		} else if (chainId === '11155111' && tokenName === 'mockEth') {
			BnMEthSepoliaApproval?.()
		} else if (chainId === '421614' && tokenName === 'GHO') {
			GhoArbSepoliaApproval?.()
		} else if (chainId === '421614' && tokenName === 'mockEth') {
			BnMArbSepoliaApproval?.()
		}
	}

	const sendBridgeTransaction = async (chainId: string, tokenName: string) => {
		if (chainId === '11155111' && tokenName === 'GHO') {
			GhoEthSepoliaBridge?.()
		} else if (chainId === '11155111' && tokenName === 'mockEth') {
			BnMEthSepoliaBridge?.()
		} else if (chainId === '421614' && tokenName === 'GHO') {
			GhoArbSepoliaBridge?.()
		} else if (chainId === '421614' && tokenName === 'mockEth') {
			BnMArbSepoliaBridge?.()
		}
	}

	return { callBridge, checkingAllowance, sendAllowanceTransaction, sendBridgeTransaction, lendingGHO, approvingGHO }
}

export default useBridge
