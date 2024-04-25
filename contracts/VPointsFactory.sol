// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {VPoints} from "./VPoints.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract VPointsFactory is Context {
    event Created(address indexed owner, address indexed vPoints);

    constructor() {}

    function createVPoints(
        string calldata name,
        string calldata symbol
    ) external {
        VPoints vPoints = new VPoints{
            salt: keccak256(abi.encode(_msgSender(), name, symbol))
        }(_msgSender(), name, symbol);

        emit Created(_msgSender(), address(vPoints));
    }
}
