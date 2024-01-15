const DashboardPage = () => {
    return (
        <div className="w-full h-fit flex-1 flex-col justify-evenly items-center gap-y-3 bg-white rounded-lg overflow-y-scroll">
            <div className="flex justify-center font-light bg-gray-800 text-white p-4">
                <div className="flex items-center gap-12">
                    {/* Net worth */}
                    <div className="flex flex-col gap-y-1">
                        <div className="text-sm text-gray-400">Net worth</div>
                        <div className="flex items-center gap-x-1.5">
                            <h5 className="text-gray-500">$</h5>
                            <h4 className="font-semibold text-base text-white">
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
                                <svg className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="help-circle" clipPath="url(#clip0_9744_43712)" opacity="1">
                                        <path id="Icon" d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z" stroke="#A3A3A3" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_9744_43712">
                                            <rect width="16" height="16" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <h4 className="font-semibold text-base text-white">0</h4>
                    </div>
                    {/* Health factor */}
                    <div className="flex flex-col gap-y-1">
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <span>Health factor</span>
                            <div className="relative max-w-max flex items-center">
                                {/* Health factor icon */}
                                <svg className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="help-circle" clipPath="url(#clip0_9744_43712)" opacity="1">
                                        <path id="Icon" d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z" stroke="#A3A3A3" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_9744_43712">
                                            <rect width="16" height="16" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <h4 className="font-semibold text-success"><span className="text-5xl leading-3">–</span></h4>
                    </div>
                </div>
            </div>
            <div className="px-6">
                <div className="my-16 flex space-x-6 px-6">
                    <div className="flex-1">
                        <div className="widget-base mb-6">
                            <div className="flex justify-between p-6 pb-0"><p className="widget-title">Your supplies</p>
                            </div>
                            <p className="widget-empty-content">Nothing supplied yet</p></div>
                        <div className="widget-base">
                            <div className="flex justify-between p-6 pb-0"><p className="widget-title">Assets to
                                supply</p>
                                <div className="flex"><label className="group flex items-center gap-x-2">
                                    <div className="flex items-end group-active:bg-gray-900/50"><label
                                        className="relative cursor-pointer flex items-center gap-x-3">
                                        <input
                                            className="checkbox-base" type="checkbox"/></label></div>
                                    <span className="cursor-pointer text-sm font-normal text-gray-300">Show assets with 0 balance</span></label>
                                </div>
                            </div>
                            <div className="asset-table-base mt-6">
                                <table>
                                    <thead>
                                    <tr>
                                        <th><span className="flex items-center gap-x-1">Asset &amp; chain</span></th>
                                        <th className="text-center"><span
                                            className="flex items-center justify-center gap-x-1">Wallet balance</span>
                                        </th>
                                        <th className="text-center"><span
                                            className="flex items-center justify-center gap-x-1">APY<div
                                            className="relative max-w-max flex items-center"><svg
                                            className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"><g id="help-circle"
                                                                                  clipPath="url(#clip0_9744_43712)"
                                                                                  opacity="1"><path id="Icon"
                                                                                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                                                                                    stroke="#A3A3A3"
                                                                                                    strokeWidth="1.33333"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"></path></g><defs><clipPath
                                            id="clip0_9744_43712"><rect width="16" height="16"
                                                                        fill="white"></rect></clipPath></defs></svg></div></span>
                                        </th>
                                        <th className="text-center"><span
                                            className="flex items-center justify-center gap-x-1">Can be collateral<div
                                            className="relative max-w-max flex items-center"><svg
                                            className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"><g id="help-circle"
                                                                                  clipPath="url(#clip0_9744_43712)"
                                                                                  opacity="1"><path id="Icon"
                                                                                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                                                                                    stroke="#A3A3A3"
                                                                                                    strokeWidth="1.33333"
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"></path></g><defs><clipPath
                                            id="clip0_9744_43712"><rect width="16" height="16"
                                                                        fill="white"></rect></clipPath></defs></svg></div></span>
                                        </th>
                                        <th className="pr-6"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="pl-6">
                                            <div className="flex space-x-3 items-center">
                                                <div className="relative h-10 w-10 flex-initial"><img alt="Ethereum"
                                                                                                      loading="lazy"
                                                                                                      decoding="async"
                                                                                                      data-nimg="fill"
                                                                                                      src="https://testnet.pike.finance/icons/crypto/ethereum.svg"/>
                                                </div>
                                                <div className="flex-initial">
                                                    <div className="flex flex-col space-y-0.5">
                                                        <div className="text-sm font-medium uppercase mb-0.5">ETH</div>
                                                        <div
                                                            className="flex items-center max-w-max text-xs rounded-[5px] bg-[#D0D8F9] text-[#384586] p-[1px] cursor-pointer">
                                                            <div className="relative w-4 h-4"><img alt="" loading="lazy"
                                                                                                   decoding="async"
                                                                                                   data-nimg="fill"
                                                                                                   src="/_next/static/media/ethereum-symbol.bcb0372a.svg"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center"><span>0.4988</span></td>
                                        <td className="py-4 text-center"><span className="">1.0509%</span></td>
                                        <td className="py-[23px]">
                                            <svg className="icon-base w-[25px] h-6 block mx-auto" viewBox="0 0 25 24"
                                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="check" opacity="1">
                                                    <path id="Icon" d="M20.5 6L9.5 17L4.5 12" stroke="#12B76A"
                                                          strokeWidth="2" stroke-linecap="round"
                                                          strokeLinejoin="round"></path>
                                                </g>
                                            </svg>
                                        </td>
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-end"><a href="/supply/ethereum">
                                                <button
                                                    className="btn-base border border-primary-600 bg-primary-600 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-primary-700 hover:bg-primary-700 disabled:border-gray-700 disabled:bg-gray-700 disabled:text-gray-400">Supply
                                                </button>
                                            </a></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="widget-base mb-6">
                            <div className="flex justify-between p-6 pb-0"><p className="widget-title">Your borrows</p>
                            </div>
                            <p className="widget-empty-content">Nothing borrowed yet</p></div>
                        <div className="widget-base">
                            <div className="flex justify-between p-6 pb-0"><p className="widget-title">Assets to
                                borrow</p></div>
                            <div className="asset-table-base mt-6">
                                <table>
                                    <thead>
                                    <tr>
                                        <th><span className="flex items-center gap-x-1">Asset &amp; chain</span></th>
                                        <th className="text-center"><span
                                            className="flex items-center justify-center gap-x-1">Available<div
                                            className="relative max-w-max flex items-center"><svg
                                            className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"><g id="help-circle"
                                                                                  clip-path="url(#clip0_9744_43712)"
                                                                                  opacity="1"><path id="Icon"
                                                                                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                                                                                    stroke="#A3A3A3"
                                                                                                    stroke-width="1.33333"
                                                                                                    stroke-linecap="round"
                                                                                                    stroke-linejoin="round"></path></g><defs><clipPath
                                            id="clip0_9744_43712"><rect width="16" height="16"
                                                                        fill="white"></rect></clipPath></defs></svg></div></span>
                                        </th>
                                        <th className="text-center"><span
                                            className="flex items-center justify-center gap-x-1">APY<div
                                            className="relative max-w-max flex items-center"><svg
                                            className="icon-base cursor-pointer h-4 w-4" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"><g id="help-circle"
                                                                                  clip-path="url(#clip0_9744_43712)"
                                                                                  opacity="1"><path id="Icon"
                                                                                                    d="M6.05992 5.99992C6.21665 5.55436 6.52602 5.17866 6.93322 4.93934C7.34042 4.70002 7.81918 4.61254 8.2847 4.69239C8.75022 4.77224 9.17246 5.01427 9.47664 5.3756C9.78081 5.73694 9.94729 6.19427 9.94659 6.66659C9.94659 7.99992 7.94659 8.66659 7.94659 8.66659M7.99992 11.3333H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
                                                                                                    stroke="#A3A3A3"
                                                                                                    stroke-width="1.33333"
                                                                                                    stroke-linecap="round"
                                                                                                    stroke-linejoin="round"></path></g><defs><clipPath
                                            id="clip0_9744_43712"><rect width="16" height="16"
                                                                        fill="white"></rect></clipPath></defs></svg></div></span>
                                        </th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="pl-6">
                                            <div className="flex space-x-3 items-center">
                                                <div className="relative h-10 w-10 flex-initial"><img alt="CCTP"
                                                                                                      loading="lazy"
                                                                                                      decoding="async"
                                                                                                      data-nimg="fill"
                                                                                                      src="https://testnet.pike.finance/icons/crypto/usdc.svg"/>
                                                </div>
                                                <div className="flex-initial">
                                                    <div className="flex flex-col space-y-0.5">
                                                        <div className="text-sm font-medium uppercase mb-0.5">USDC</div>
                                                        <div className="relative max-w-max flex items-center">
                                                            <div
                                                                className="flex items-center max-w-max text-xs rounded-[5px] bg-base-white/10 text-gray-200 space-x-0.5 pl-0.5 pr-1 cursor-pointer">
                                                                <div
                                                                    className="relative w-[14px] h-[14px] ml-[2px] mr-[1px]">
                                                                    <img alt="" loading="lazy" decoding="async"
                                                                         data-nimg="fill"
                                                                         src="/_next/static/media/circle-symbol.ca519e28.svg"/>
                                                                </div>
                                                                <span className="capitalize">CCTP</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center"><span className="text-gray">0</span></td>
                                        <td className="py-4 text-center"><span className="">1.07791%</span></td>
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-end"><a href="/borrow/base">
                                                <button
                                                    className="btn-base border border-base-white border-opacity-20 bg-transparent hover:bg-base-white hover:bg-opacity-5 focus:bg-base-white focus:bg-opacity-10 disabled:bg-base-black disabled:bg-opacity-70 disabled:text-gray"
                                                    disabled>Borrow
                                                </button>
                                            </a></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pl-6">
                                            <div className="flex space-x-3 items-center">
                                                <div className="relative h-10 w-10 flex-initial"><img alt="Ethereum"
                                                                                                      loading="lazy"
                                                                                                      decoding="async"
                                                                                                      data-nimg="fill"
                                                                                                      src="https://testnet.pike.finance/icons/crypto/ethereum.svg"
                                                /></div>
                                                <div className="flex-initial">
                                                    <div className="flex flex-col space-y-0.5">
                                                        <div className="text-sm font-medium uppercase mb-0.5">ETH</div>
                                                        <div
                                                            className="flex items-center max-w-max text-xs rounded-[5px] bg-[#D0D8F9] text-[#384586] p-[1px] cursor-pointer">
                                                            <div className="relative w-4 h-4"><img alt="" loading="lazy"
                                                                                                   decoding="async"
                                                                                                   data-nimg="fill"
                                                                                                   src="/_next/static/media/ethereum-symbol.bcb0372a.svg"
                                                            /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center"><span className="text-gray">0</span></td>
                                        <td className="py-4 text-center"><span className="">1.15106%</span></td>
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-end"><a href="/borrow/ethereum">
                                                <button
                                                    className="btn-base border border-base-white border-opacity-20 bg-transparent hover:bg-base-white hover:bg-opacity-5 focus:bg-base-white focus:bg-opacity-10 disabled:bg-base-black disabled:bg-opacity-70 disabled:text-gray"
                                                    disabled>Borrow
                                                </button>
                                            </a></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pl-6">
                                            <div className="flex space-x-3 items-center">
                                                <div className="relative h-10 w-10 flex-initial"><img alt="Optimism"
                                                                                                      loading="lazy"
                                                                                                      decoding="async"
                                                                                                      data-nimg="fill"
                                                                                                      src="https://testnet.pike.finance/icons/crypto/optimism.svg"
                                                /></div>
                                                <div className="flex-initial">
                                                    <div className="flex flex-col space-y-0.5">
                                                        <div className="text-sm font-medium uppercase mb-0.5">OP</div>
                                                        <div
                                                            className="flex items-center max-w-max text-xs rounded-[5px] bg-error-200 text-error-900 p-[1px] cursor-pointer">
                                                            <div className="relative w-4 h-4"><img alt="" loading="lazy"
                                                                                                   decoding="async"
                                                                                                   data-nimg="fill"
                                                                                                   src="/_next/static/media/optimism-symbol.7678209a.svg"
                                                            /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-center"><span className="text-gray">0</span></td>
                                        <td className="py-4 text-center"><span className="">1.14779%</span></td>
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-end"><a href="/borrow/optimism">
                                                <button
                                                    className="btn-base border border-base-white border-opacity-20 bg-transparent hover:bg-base-white hover:bg-opacity-5 focus:bg-base-white focus:bg-opacity-10 disabled:bg-base-black disabled:bg-opacity-70 disabled:text-gray"
                                                    disabled>Borrow
                                                </button>
                                            </a></div>
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;