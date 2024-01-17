import React from 'react';

const DashboardPage = () => {
    // Mock data for assets
    const assetsData = [{
        symbol: 'ETH',
        balance: '0.4988',
        apy: '1.0509%',
        canBeCollateral: true,
        img: 'ethereum.svg'
    }, // ... other asset objects
    ];

    // Mock data for borrows
    const borrowsData = [
        {symbol: 'USDC', available: '0', apy: '1.07791%', img: 'usdc.svg'},
        {
            symbol: 'ETH',
            available: '0',
            apy: '1.15106%',
            img: 'ethereum.svg'
        },
        {symbol: 'OP', available: '0', apy: '1.14779%', img: 'optimism.svg'},
        {symbol: 'ARB', available: '0', apy: '1.13791%', img: 'arbitrum.svg'}
        // ... other borrow objects
    ];

    return (<div
        className="w-full h-fit z-0 flex flex-col justify-start items-center gap-10 relative py-24 px-24 overflow-y-scroll">
        <div className="widget-base flex justify-center bg-white text-5xl p-4">
            <div className="flex items-center gap-12">
                {/* Net worth */}
                <div className="flex flex-col gap-y-1">
                    <div className="text-sm text-gray-400">Net worth</div>
                    <div className="flex items-center gap-x-1.5">
                        <h5 className="text-gray-500">$</h5>
                        <h4 className="font-semibold">
                            0.00
                        </h4>
                    </div>
                </div>

                {/* Net APY */}
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <span>Net APY</span>
                        <div className="relative max-w-max flex items-center">
                            {/* Net APY icon */}
                            <svg className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="help-circle" clipPath="url(#clip0_9744_43712)" opacity="1">
                                    <path id="Icon"
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A3A3A3" strokeWidth="1.33333" strokeLinecap="round"
                                          strokeLinejoin="round"></path>
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
                            <svg className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="help-circle" clipPath="url(#clip0_9744_43712)" opacity="1">
                                    <path id="Icon"
                                          d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                          stroke="#A3A3A3" strokeWidth="1.33333" strokeLinecap="round"
                                          strokeLinejoin="round"></path>
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

        <div
            className="w-full h-full flex flex-row justify-evenly items-start gap-10">

            {/* Your Supplies section */}
            <div className="flex-1 w-1/4">
                <div className="widget-base px-10 py-5 mb-6">
                    <div className="text-xl font-semibold">
                        Your Supplies
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                        List of assets that you are supplying to the protocol.
                    </div>
                </div>
                <div className="widget-base px-10 py-5">
                    <div className="flex justify-between">
                        <p className="widget-title">Assets to supply</p>
                        <div className="flex">
                            <label className="group flex items-center gap-x-2">
                                <div className="flex items-end group-active:bg-gray-900/50">
                                    <label className="relative cursor-pointer flex items-center gap-x-3">
                                        <input className="checkbox-base" type="checkbox"/>
                                    </label>
                                </div>
                                <span className="cursor-pointer text-sm font-normal text-gray-300">Show assets with 0 balance</span></label>
                        </div>
                    </div>
                    <div className="asset-table-base mt-6">
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th><span className="flex items-center gap-x-1">Asset &amp; chain</span></th>
                                <th className="text-center"><span
                                    className="flex items-center justify-center gap-x-1">Wallet balance</span></th>
                                <th className="text-center"><span
                                    className="flex items-center justify-center gap-x-1">APY</span></th>
                                <th className="text-center"><span
                                    className="flex items-center justify-center gap-x-1">Can be collateral</span>
                                </th>
                                <th className="pr-6"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {assetsData.map((asset, index) => (<tr key={index}>
                                <td className="pl-6">
                                    <div className="flex items-center gap-x-2">
                                        <img
                                            src={`https://testnet.pike.finance/icons/crypto/${asset.img.toLowerCase()}`}
                                            alt={`${asset.symbol} logo`}
                                            className="h-6 w-6"
                                        />
                                        <span className="text-base font-medium text-white">{asset.symbol}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-center"><span>{asset.balance}</span></td>
                                <td className="py-4 text-center"><span className="">{asset.apy}</span></td>
                                <td className="py-[23px]">
                                    {asset.canBeCollateral ? (<div className="flex items-center justify-center">
                                        <span className="bg-green-500 rounded-full h-2 w-2 mr-1"></span>
                                        <span className="text-green-500 text-xs">Yes</span>
                                    </div>) : (<div className="flex items-center justify-center">
                                        <span className="bg-red-500 rounded-full h-2 w-2 mr-1"></span>
                                        <span className="text-red-500 text-xs">No</span>
                                    </div>)}
                                </td>
                                <td className="py-4 pr-6">
                                    <button className="text-primary">Manage</button>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Your Borrows section */}
            <div className="flex-1 w-1/4">
                <div className="widget-base px-10 py-5 mb-6">
                    <div className="text-xl font-semibold">
                        Your Borrows
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                        List of assets that you have borrowed from the protocol.
                    </div>
                </div>
                <div className="widget-base px-10 py-5">
                    <div className="flex justify-between">
                        <p className="widget-title">Assets to borrow</p>
                    </div>
                    <div className="asset-table-base mt-6">
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th><span className="flex items-center gap-x-1">Asset &amp; chain</span></th>
                                <th className="text-center"><span
                                    className="flex items-center justify-center gap-x-1">Available</span></th>
                                <th className="text-center"><span
                                    className="flex items-center justify-center gap-x-1">APY</span></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {borrowsData.map((borrow, index) => (<tr key={index}>
                                <td className="pl-6">
                                    <div className="flex items-center gap-x-2">
                                        <img
                                            src={`https://testnet.pike.finance/icons/crypto/${borrow.img.toLowerCase()}`}
                                            alt={`${borrow.symbol} logo`}
                                            className="h-6 w-6"
                                        />
                                        <span
                                            className="text-base font-medium text-white">{borrow.symbol}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-center"><span
                                    className="text-gray">{borrow.available}</span></td>
                                <td className="py-4 text-center"><span className="">{borrow.apy}</span></td>
                                <td className="py-4 pr-6">
                                    <button className="text-primary">Repay</button>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        {/* ... rest of the JSX ... */}
    </div>);
}

export default DashboardPage;
