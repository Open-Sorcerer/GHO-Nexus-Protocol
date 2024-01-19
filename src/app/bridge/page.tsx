import React from 'react';

const MayanSwap = () => {
    return (
        <div
            className="w-full h-fit z-0 flex flex-col justify-start items-center gap-10 relative py-24 px-24 overflow-y-scroll">
            <div className="w-1/2">
                <div className="w-full h-full widget-base flex justify-center bg-white p-4">
                    <div className="flex flex-row justify-between items-center mb-8">
                        <button className="w-40 justify-center bg-blue-500 text-white p-2 rounded-full flex items-center">
                            <img className="w-6 h-6" src="https://statics.mayan.finance/eth.png" alt="ETH"/>
                            <span className="ml-2">ETH</span>
                        </button>
                        <button className="w-40 justify-center bg-blue-500 text-white p-2 rounded-full flex items-center mt-2">
                            <img className="w-6 h-6" src="https://statics.mayan.finance/assets/eth.png" alt="Ethereum"/>
                            <span className="ml-2">Ethereum</span>
                        </button>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-center">
                            <input
                                className="border border-gray-300 p-2"
                                type="text"
                                placeholder="0.00"
                                value=""
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <button className="bg-blue-500 text-white p-2 rounded-full">
                        Swap to
                    </button>
                </div>
                <div className="w-full h-full widget-base flex justify-center bg-white p-4">
                    <div className="flex flex-row justify-between items-center mb-8">
                        <button className="w-40 justify-center bg-blue-500 text-white p-2 rounded-full">
                            Select Token
                        </button>
                        <button className="w-40 justify-center bg-blue-500 text-white p-2 rounded-full flex items-center mt-2">
                            <img className="w-6 h-6" src="https://statics.mayan.finance/assets/SOL.png" alt="Solana"/>
                            <span className="ml-2">Solana</span>
                        </button>
                    </div>
                    <div className="mb-8">
                        <span className="text-lg font-bold">0.00</span>
                    </div>
                </div>
                <div className="mb-8">
                    <button className="bg-blue-500 text-white p-4 rounded-full w-full">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MayanSwap;
