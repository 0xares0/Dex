// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tokenn is ERC20 {
    // initialize contract with 2 million tokens minted to contract creator
    constructor() ERC20("Tokenn", "TKNN") {
        _mint(msg.sender, 2000000 * 10 ** decimals());
    }
}