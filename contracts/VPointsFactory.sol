// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {VPoints} from "./VPoints.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract VPointsFactory is Context {
    event Created(address indexed owner, address vPoints);

    constructor() {}

    function createVPoints(
        address miner,
        string calldata name,
        string calldata symbol
    ) external {
        VPoints vPoints = new VPoints{
            salt: keccak256(abi.encode(_msgSender(), name, symbol))
        }(name, symbol);
        vPoints.updateMiner(miner);

        emit Created(_msgSender(), address(vPoints));
    }
}
