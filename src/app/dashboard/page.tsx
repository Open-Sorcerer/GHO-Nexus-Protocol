'use client'
import React from 'react'
import useBridge from '@lib/smartContractUtils'

const DashboardPage = () => {
	const { lendingGHO, approvingGHO } = useBridge({ lendingAmount: 1000000000000000000n })
	const [isShowZeroBalance, setIsShowZeroBalance] = React.useState(false)
	// Mock data for assets
	const assetsData = [
		{
			symbol: 'mockETH',
			balance: '0.4988',
			apy: '1.0509%',
			canBeCollateral: true,
			img: 'ethereum.svg',
		},
		{
			symbol: 'GHO',
			balance: '0.0000',
			apy: '0.0000%',
			canBeCollateral: false,
			img: 'ghost.svg',
		},
	]

	const handleAction = async () => {
		await approvingGHO('421614')

		// sleep for 15 seconds
		await new Promise(resolve => setTimeout(resolve, 15000))

		await lendingGHO('421614')
	}

	// Mock data for borrows
	const borrowsData = [
		{ symbol: 'USDC', available: '0', apy: '1.07791%', img: 'usdc.svg' },
		{
			symbol: 'ETH',
			available: '0',
			apy: '1.15106%',
			img: 'ethereum.svg',
		},
		{ symbol: 'OP', available: '0', apy: '1.14779%', img: 'optimism.svg' },
		{ symbol: 'ARB', available: '0', apy: '1.13791%', img: 'arbitrum.svg' },
		// ... other borrow objects
	]

	return (
		<div className="w-full h-fit z-0 flex flex-col justify-start items-center gap-10 relative py-24 px-24 overflow-y-scroll">
			<div className="widget-base flex justify-center bg-white/95 text-5xl p-4">
				<div className="flex items-center gap-12">
					{/* Net worth */}
					<div className="flex flex-col gap-y-1">
						<div className="text-sm text-gray-400">Net worth</div>
						<div className="flex items-center gap-x-1.5">
							<h5 className="text-gray-500">$</h5>
							<h4 className="font-semibold">0.00</h4>
						</div>
					</div>

					{/* Net APY */}
					<div className="flex flex-col gap-y-1">
						<div className="flex items-center space-x-1 text-sm text-gray-400">
							<span>Net APY</span>
							<div className="relative max-w-max flex items-center">
								{/* Net APY icon */}
								<svg
									className="icon-base cursor-pointer h-4 w-4"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g id="help-circle" clipPath="url(#clip0_9744_43712)" opacity="1">
										<path
											id="Icon"
											d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
											stroke="#A3A3A3"
											strokeWidth="1.33333"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</g>
									<defs>
										<clipPath id="clip0_9744_43712">
											<rect width="16" height="16" fill="white"></rect>
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
						<h4 className="font-semibold">0</h4>
					</div>

					{/* Health factor */}
					<div className="flex flex-col gap-y-1">
						<div className="flex items-center space-x-1 text-sm text-gray-400">
							<span>Health factor</span>
							<div className="relative max-w-max flex items-center">
								{/* Health factor icon */}
								<svg
									className="icon-base cursor-pointer h-4 w-4"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g id="help-circle" clipPath="url(#clip0_9744_43712)" opacity="1">
										<path
											id="Icon"
											d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
											stroke="#A3A3A3"
											strokeWidth="1.33333"
											strokeLinecap="round"
											strokeLinejoin="round"
										></path>
									</g>
									<defs>
										<clipPath id="clip0_9744_43712">
											<rect width="16" height="16" fill="white"></rect>
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
						<h4 className="font-semibold">0.00x</h4>
					</div>
				</div>
			</div>

			<div className="w-full h-full flex flex-row justify-evenly items-start gap-10">
				{/* Your Supplies section */}
				<div className="flex-1 w-1/4">
					<div className="flex flex-col bg-white/95 border shadow-sm rounded-xl py-3 px-4 md:py-4 md:px-5 mb-5">
						<div className="text-lg font-bold text-gray-800">Your Supplies</div>
						<div className="mt-1 text-xs font-medium uppercase text-gray-500">
							List of assets that you are supplying to the protocol.
						</div>
					</div>
					<div className="flex flex-col bg-white/95 border shadow-sm rounded-xl">
						<div className="flex justify-between items-center bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
							<p className="mt-1 text-sm font-semibold text-gray-500">Assets to supply</p>
							<div className="flex items-center group-active:bg-gray-900/50">
								<input
									className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
									type="checkbox"
									checked={isShowZeroBalance}
									id="hs-default-checkbox"
									onChange={() => setIsShowZeroBalance(!isShowZeroBalance)}
								/>
								<label htmlFor="hs-default-checkbox" className="text-sm text-gray-500 ms-3">
									Show assets with 0 balance
								</label>
							</div>
						</div>
						<div className="p-1.5 min-w-full inline-block align-middle overflow-hidden mt-6">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Asset &amp; chain
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Wallet balance
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											APY
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Can be collateral
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{assetsData.map((asset, index) => (
										<tr className="hover:bg-gray-100 " key={index}>
											<td className="flex items-center gap-x-2 p-4 whitespace-nowrap text-sm font-medium text-gray-800">
												<img
													src={`https://testnet.pike.finance/icons/crypto/${asset.img.toLowerCase()}`}
													alt={`${asset.symbol} logo`}
													className="h-6 w-6"
												/>
												{asset.symbol}
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{asset.balance}
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{asset.apy}
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{asset.canBeCollateral ? (
													<div className="flex items-center justify-center">
														<span className="bg-green-500 rounded-full h-2 w-2 mr-1"></span>
														<span className="text-green-500 text-xs">Yes</span>
													</div>
												) : (
													<div className="flex items-center justify-center">
														<span className="bg-red-500 rounded-full h-2 w-2 mr-1"></span>
														<span className="text-red-500 text-xs">No</span>
													</div>
												)}
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium">
												<button
													className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
													onClick={handleAction}
												>
													Supply
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Your Borrows section */}
				<div className="flex-1 w-1/4">
					<div className="flex flex-col bg-white/95 border shadow-sm rounded-xl py-3 px-4 md:py-4 md:px-5 mb-5">
						<div className="text-lg font-bold text-gray-800">Your Borrows</div>
						<div className="mt-1 text-xs font-medium uppercase text-gray-500">
							List of assets that you have borrowed from the protocol.
						</div>
					</div>

					<div className="flex flex-col bg-white/95 border shadow-sm rounded-xl">
						<div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
							<p className="mt-1 text-sm font-semibold text-gray-500">Assets to borrow</p>
						</div>
						<div className="p-1.5 min-w-full inline-block align-middle overflow-hidden mt-6">
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Asset &amp; chain
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Available
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											APY
										</th>
										<th
											scope="col"
											className="p-3 text-start text-xs font-medium text-gray-500 uppercase"
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{borrowsData.map((borrow, index) => (
										<tr className="hover:bg-gray-100" key={index}>
											<td className="pl-6">
												<div className="flex items-center gap-x-2">
													<img
														src={`https://testnet.pike.finance/icons/crypto/${borrow.img.toLowerCase()}`}
														alt={`${borrow.symbol} logo`}
														className="h-6 w-6"
													/>
													{borrow.symbol}
												</div>
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{borrow.available}
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">
												{borrow.apy}
											</td>
											<td className="p-4 whitespace-nowrap text-sm font-medium">
												<button className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
													Borrow
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* ... rest of the JSX ... */}
		</div>
	)
}

export default DashboardPage
