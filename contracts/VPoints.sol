// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";

error UnauthorizedMiner(address miner);
error InvalidMiner(address miner);
error InvalidReceiver(address receiver);

contract VPoints is Ownable {
    address private _miner;

    mapping(address account => uint256) private _balances;
    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    event UpdatedMiner(address indexed previousMiner, address indexed newMiner);
    event Minted(address indexed account, uint value);

    constructor(
        string memory name_,
        string memory symbol_
    ) Ownable(_msgSender()) {
        _name = name_;
        _symbol = symbol_;
    }

    modifier onlyMiner() {
        if (miner() != _msgSender()) {
            revert UnauthorizedMiner(_msgSender());
        }
        _;
    }

    function miner() public view returns (address) {
        return _miner;
    }

    function updateMiner(address newMiner) public onlyOwner {
        if (newMiner == address(0)) {
            revert InvalidMiner(address(0));
        }

        address oldMiner = _miner;
        _miner = newMiner;
        emit UpdatedMiner(oldMiner, newMiner);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function mint(
        address to,
        uint256 amount,
        string calldata data
    ) public onlyMiner {
        data;
        _mint(to, amount);
    }

    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert InvalidReceiver(address(0));
        }

        // Overflow check required: The rest of the code assumes that totalSupply never overflows
        _totalSupply += value;

        unchecked {
            // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.
            _balances[account] += value;
        }

        emit Minted(account, value);
    }
}
