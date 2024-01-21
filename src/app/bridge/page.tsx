'use client'
import React from 'react'
interface Token {
	symbol: string
	image: string
}

interface Chain {
	symbol: string
	image: string
	alt: string
}

import { parseEther } from 'viem'
import useBridge from '@lib/smartContractUtils'
import { GhoTokenAddressEthSepolia } from '@lib/consts'
import { useAccount, useNetwork, useWalletClient } from 'wagmi'

const tokenList = [
	{ symbol: 'mockEth', image: 'https://statics.mayan.finance/eth.png' },
	{
		symbol: 'GHO',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCklVeZwUDdGVnF5br6tra6RBzfsrtrzhF5TQKuPITvI1Aia1CoMtKi6mWKUm8DDK2y4&usqp=CAU', // change this to GHO
	},
]

const chainList = [
	{ symbol: 'Ethereum', image: 'https://statics.mayan.finance/assets/eth.png', alt: 'Ethereum' },

	{ symbol: 'Arbitrum', image: 'https://cdn.mayan.finance/arbitrum-logo.png', alt: 'Arbitrum' },
]

const Bridge = () => {
	const { data: walletClient } = useWalletClient()
	const [fromToken, setFromToken] = React.useState<Token>()
	const [amount, setAmount] = React.useState<number>(0)
	const [buttonName, setButtonName] = React.useState<string>('Cross Chain Sorcery')
	const [fromChain, setFromChain] = React.useState<Chain>({
		symbol: 'Ethereum',
		image: 'https://statics.mayan.finance/assets/eth.png',
		alt: 'Ethereum',
	})
	const [toChain, setToChain] = React.useState<Chain>({
		symbol: 'Arbitrum',
		image: 'https://cdn.mayan.finance/arbitrum-logo.png',
		alt: 'Arbitrum',
	})
	const [isAnotherWallet, setIsAnotherWallet] = React.useState<boolean>(false)
	const currentUser = useAccount()
	const [toAddress, setToAddress] = React.useState<string>(currentUser.address!)
	const { callBridge, checkingAllowance, sendAllowanceTransaction, sendBridgeTransaction } = useBridge({
		amount: BigInt(amount * 10 ** 18),
		toChain,
		fromToken,
		toAddress,
	})

	const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms))

	const handleAction = async () => {
		let currentChainId = String(walletClient?.chain.id)

		setButtonName("It's happening...")

		let allowanceAmount = await checkingAllowance(currentChainId, fromToken?.symbol!) // tokenAddress needs to be variable
		console.log('allowanceAmount', allowanceAmount)

		if (parseFloat(allowanceAmount) < amount) {
			console.log('allowanceAmount is less than amount')
			await sendAllowanceTransaction(currentChainId, fromToken?.symbol!)
			console.log('Waiting for approval')
			setButtonName('Waiting for approval')
			// sleep for 10 seconds for letting the transaction to be mined
			await delay(10000)
		}

		console.log('sending bridge transaction')

		await sendBridgeTransaction(currentChainId, fromToken?.symbol!)
		await delay(10000)
		setButtonName("It's done!")

		await delay(5000)
		setButtonName('Cross Chain Sorcery')
	}

	return (
		<div className="w-full h-fit z-0 flex flex-col justify-start items-center gap-10 relative py-24 px-24 overflow-y-scroll">
			<div className="w-7/12 h-full flex flex-col justify-evenly items-center">
				<div className="w-full h-full flex flex-col bg-white/95 border shadow-sm rounded-xl py-3 px-4 md:py-4 md:px-5 mb-5">
					<div className="w-full h-full flex flex-row justify-between items-center gap-16 mb-8">
						<div className="w-5/12 h-full flex flex-col justify-between items-start gap-3">
							{/* From Chain */}
							<div className="w-full hs-dropdown relative inline-flex">
								<button
									id="hs-dropdown-basic"
									type="button"
									className="w-full hs-dropdown-toggle py-3 px-4 inline-flex justify-between items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
								>
									<span className="flex items-center gap-x-3.5 rounded-lg text-sm text-gray-800">
										<img src={fromChain!.image} alt={fromChain!.symbol} className="w-8 h-8" />
										{fromChain!.symbol}
									</span>
									<svg
										className="hs-dropdown-open:rotate-180 w-4 h-4 text-gray-600"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="m6 9 6 6 6-6" />
									</svg>
								</button>

								<ul
									className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
									aria-labelledby="hs-dropdown-basic"
								>
									{chainList.map(chain => (
										<li
											key={chain.symbol}
											onClick={() => setFromChain(chain)}
											className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
										>
											<img src={chain.image} alt={chain.symbol} className="w-8 h-8" />
											{chain.symbol}
										</li>
									))}
								</ul>
							</div>

							<div className="w-full flex flex-col justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-16 h-16"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
									/>
								</svg>
							</div>

							{/* To Chain */}
							<div className="w-full hs-dropdown relative inline-flex">
								<button
									id="hs-dropdown-basic"
									type="button"
									className="w-full hs-dropdown-toggle py-3 px-4 inline-flex justify-between items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
								>
									<span className="flex items-center gap-x-3.5 rounded-lg text-sm text-gray-800">
										<img src={toChain!.image} alt={toChain!.symbol} className="w-8 h-8" />
										{toChain!.symbol}
									</span>
									<svg
										className="hs-dropdown-open:rotate-180 w-4 h-4 text-gray-600"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="m6 9 6 6 6-6" />
									</svg>
								</button>

								<ul
									className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
									aria-labelledby="hs-dropdown-basic"
								>
									{chainList.map(chain => (
										<li
											key={chain.symbol}
											onClick={() => setToChain(chain)}
											className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
										>
											<img src={chain.image} alt={chain.symbol} className="w-8 h-8" />
											{chain.symbol}
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="w-full h-full flex flex-col justify-end items-center gap-2 relative">
							<div className="w-full h-16 flex justify-end items-center">
								{/* Amount TextBox */}
								<div className="w-3/4 h-full flex py-2 px-3 bg-white border border-gray-200 rounded-l-lg">
									<div className="w-full flex justify-between items-center gap-x-5">
										<div className="grow">
											<span className="block text-xs text-gray-500 dark:text-gray-400">
												Select quantity
											</span>
											<input
												className="w-full p-0 bg-transparent border-0 text-gray-800 decoration-0 outline-0"
												type="text"
												min={0}
												step={0.01}
												placeholder="0.00"
												value={amount}
												onChange={e => setAmount(parseFloat(e.target.value))}
											/>
										</div>
										<div className="flex justify-end items-center gap-x-1.5">
											<button
												type="button"
												className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
												onClick={() => setAmount(parseFloat((amount - 0.01).toFixed(2)))}
											>
												<svg
													className="flex-shrink-0 w-3.5 h-3.5"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M5 12h14" />
												</svg>
											</button>
											<button
												type="button"
												className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
												onClick={() => setAmount(parseFloat((amount + 0.01).toFixed(2)))}
											>
												<svg
													className="flex-shrink-0 w-3.5 h-3.5"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M5 12h14" />
													<path d="M12 5v14" />
												</svg>
											</button>
										</div>
									</div>
								</div>

								{/* Token */}
								<div className="h-full hs-dropdown relative inline-flex">
									<button
										id="hs-dropdown-basic"
										type="button"
										className="h-full hs-dropdown-toggle py-3 px-4 whitespace-nowrap inline-flex items-center gap-x-2 text-sm font-medium rounded-r-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
									>
										{!fromToken ? (
											<> Select Token </>
										) : (
											<div className="flex items-center gap-x-3.5 rounded-lg text-sm text-gray-800">
												<img
													src={fromToken!.image}
													alt={fromToken!.symbol}
													className="w-8 h-8"
												/>
												{fromToken!.symbol}
											</div>
										)}
										<svg
											className="hs-dropdown-open:rotate-180 w-4 h-4 text-gray-600"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="m6 9 6 6 6-6" />
										</svg>
									</button>

									<ul
										className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
										aria-labelledby="hs-dropdown-basic"
									>
										{tokenList.map(token => (
											<li
												key={token.symbol}
												onClick={() => setFromToken(token)}
												className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
											>
												<img src={token.image} alt={token.symbol} className="w-8 h-8" />
												{token.symbol}
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="flex w-full gap-4 justify-start items-center">
								<span className="flex items-center group-active:bg-gray-900/50 whitespace-nowrap">
									<input
										className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
										type="checkbox"
										checked={isAnotherWallet}
										id="hs-default-checkbox"
										onChange={() => setIsAnotherWallet(!isAnotherWallet)}
									/>
									<label htmlFor="hs-default-checkbox" className="text-sm text-gray-500 ms-3">
										Send to another Wallet
									</label>
								</span>

								<input
									type="text"
									className={`${
										!isAnotherWallet && 'invisible'
									} py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
									placeholder="Receiver's Wallet Address"
									value={toAddress}
									onChange={e => setToAddress(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
				<button
					type="button"
					onClick={() => handleAction()}
					className="w-full mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
				>
					{buttonName}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
export default Bridge
