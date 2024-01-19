"use client"
import React from 'react';

interface Token {
    symbol: string;
    image: string;
}

const Bridge = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [fromToken, setFromToken] = React.useState<Token>();
    const [toToken, setToToken] = React.useState<Token>();
    const [amount, setAmount] = React.useState(0);
    const tokenList = [
        {symbol: 'ETH', image: 'https://statics.mayan.finance/eth.png'},
        {symbol: 'SOL', image: 'https://statics.mayan.finance/SOL.png'},
        {
            symbol: 'PYTH',
            image: 'https://assets.coingecko.com/coins/images/31924/small/Pyth_Logomark_%281%29.png?1696530732'
        },
        {
            symbol: 'WBTC',
            image: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744'
        },
        {symbol: 'BSOL', image: 'https://assets.coingecko.com/coins/images/26636/small/blazesolana.png?1659328728'},
        {symbol: 'BONK', image: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1672304290'},
    ];
    return (<div
        className="w-full h-fit z-0 flex flex-col justify-start items-center gap-10 relative py-24 px-24 overflow-y-scroll">
        <div className="w-1/2 h-full flex flex-col justify-evenly items-center">
            <div className="w-full h-full widget-base flex justify-center bg-white p-4">
                <div className="flex flex-row justify-between items-center mb-8">
                    <div className="hs-dropdown relative inline-flex">
                        <button id="hs-dropdown-basic" type="button"
                                className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                            {
                                !fromToken ?
                                    <>
                                        Select Token
                                        <svg className="hs-dropdown-open:rotate-180 w-4 h-4 text-gray-600"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>
                                    </> :
                                    <span
                                        className="flex items-center gap-x-3.5 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                                        <img src={fromToken!.image} alt={fromToken!.symbol} className="w-8 h-8"/>
                                        {fromToken!.symbol}
                                    </span>
                            }
                        </button>

                        <ul className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                            aria-labelledby="hs-dropdown-basic">
                            {tokenList.map((token) => (
                                <li key={token.symbol} onClick={() => setFromToken(token)}
                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                                    <img src={token.image} alt={token.symbol} className="w-8 h-8"/>
                                    {token.symbol}
                                </li>
                            ))}
                        </ul>

                    </div>

                    <button
                        className="w-40 justify-center bg-blue-500 text-white p-2 rounded-full flex items-center mt-2">
                        <img className="w-6 h-6" src="https://statics.mayan.finance/assets/eth.png" alt="Ethereum"/>
                        <span className="ml-2">Ethereum</span>
                    </button>
                </div>
                <div className="mb-8">
                    <div className="flex items-center">
                        <input
                            className="border border-gray-300 p-2"
                            type="number"
                            step={0.01}
                            placeholder="0.00"
                            value={amount}
                            onChange={e => setAmount(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6 text-white text-5xl">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"/>
            </svg>
            <div className="w-full h-full widget-base flex justify-center bg-white p-4">
                <div className="flex flex-row justify-between items-center mb-8">
                    <div className="hs-dropdown relative inline-flex">
                        <button id="hs-dropdown-basic" type="button"
                                className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                            {
                                !toToken ?
                                    <>
                                        Select Token
                                        <svg className="hs-dropdown-open:rotate-180 w-4 h-4 text-gray-600"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round">
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>
                                    </> :
                                    <span
                                        className="flex items-center gap-x-3.5 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                                        <img src={toToken!.image} alt={toToken!.symbol} className="w-8 h-8"/>
                                        {toToken!.symbol}
                                    </span>
                            }
                        </button>

                        <ul className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2"
                            aria-labelledby="hs-dropdown-basic">
                            {tokenList.map((token) => (
                                <li key={token.symbol} onClick={() => setToToken(token)}
                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
                                    <img src={token.image} alt={token.symbol} className="w-8 h-8"/>
                                    {token.symbol}
                                </li>
                            ))}
                        </ul>

                    </div>
                    <button
                        className="w-40 justify-center bg-blue-500 text-white p-2 rounded-full flex items-center mt-2">
                        <img className="w-6 h-6" src="https://statics.mayan.finance/assets/SOL.png" alt="Solana"/>
                        <span className="ml-2">Solana</span>
                    </button>
                </div>
                <div className="mb-8">
                    <span className="text-lg font-bold">0.00</span>
                </div>
            </div>
                <button className="bg-blue-500 text-white p-4 rounded-full w-full mt-5">
                    Connect Wallet
                </button>
        </div>
    </div>);
};

export default Bridge;
