// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

  function getPrice()
    public
    view
    returns (uint256)
  {
    AggregatorV3Interface dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    (, int256 answer, , , ) = dataFeed.latestRoundData();
    // ETH/USD rate in 18 digit
    return uint256(answer * 10000000000);
  }


  function getEthInUsd(uint256 ethAmount)
    public
    view
    returns (uint256)
  {
    uint256 ethPrice = getPrice();
    // uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1_000_000_000_000_000_000;
    uint256 ethAmountInUsd = (ethPrice * ethAmount) / 10**18;
    // the actual ETH/USD conversation rate, after adjusting the extra 0s.
    return ethAmountInUsd;
  }
}