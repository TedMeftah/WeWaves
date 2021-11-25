//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract WeWaves {
    uint256 total;
    uint256 private seed;

    Wave[] waves;

    mapping(address => uint256) public wavedAt;

    struct Wave {
        address from;
        string message;
        uint256 timestamp;
    }

    event NewWave(address indexed from, string message, uint256 timestamp);

    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory message) public {
        require(wavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15m");
        wavedAt[msg.sender] = block.timestamp;

        total += 1;

        waves.push(Wave(msg.sender, message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed <= 50) {
            uint256 amount = 0.0001 ether;
            require(
                amount <= address(this).balance,
                "Not enough funds for prize!"
            );

            (bool success, ) = (msg.sender).call{value: amount}("");
            require(success, "Prize payment failed!");
        }

        emit NewWave(msg.sender, message, block.timestamp);
    }

    function getWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotal() public view returns (uint256) {
        return total;
    }
}
