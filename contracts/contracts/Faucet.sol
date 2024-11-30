//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Faucet {
    IERC20 public token;
    address payable public owner;

    uint256 public withdrawAmount = 50 * (10 ** 18);
    uint256 public lockTime = 1 minutes;
    bool public paused = false;

    event Withdrawal(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, address indexed to, uint256 value);
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);
    event ETHWithdrawal(address indexed to, uint256 amount);
    event Paused(address indexed account);
    event Unpaused(address indexed account);

    mapping(address => uint256) nextAccessTime;

    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public whenNotPaused {
        require(
            msg.sender != address(0),
            "Request must originate from a non-zero address"
        );
        require(
            token.balanceOf(address(this)) >= withdrawAmount,
            "Faucet has insufficient balance for the requested withdrawal amount"
        );
        require(
            block.timestamp >= nextAccessTime[msg.sender],
            "Insufficient time elapsed since last withdrawal - please try again later"
        );

        nextAccessTime[msg.sender] = block.timestamp + lockTime;

        token.transfer(msg.sender, withdrawAmount);
    }

    receive() external payable {
        emit Deposit(msg.sender, owner, msg.value);
    }

    function getBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function setWithdrawalAmount(
        uint256 _amount
    ) public onlyOwner whenNotPaused {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        withdrawAmount = _amount;
    }

    function setLockTime(
        uint256 _timeInMinutes
    ) public onlyOwner whenNotPaused {
        require(_timeInMinutes > 0, "Lock time must be greater than zero");
        lockTime = _timeInMinutes * 1 minutes;
    }

    function withdrawal() external onlyOwner whenNotPaused {
        uint256 balance = token.balanceOf(address(this));
        emit Withdrawal(msg.sender, balance);
        token.transfer(msg.sender, balance);
    }

    function withdrawETH() external onlyOwner whenNotPaused {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH balance to withdraw");
        (bool success, ) = owner.call{value: balance}("");
        require(success, "ETH withdrawal failed");
        emit ETHWithdrawal(owner, balance);
    }

    function changeOwner(address payable newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner must be a non-zero address");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    function pause() external onlyOwner {
        require(!paused, "Contract is already paused");
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyOwner {
        require(paused, "Contract is not paused");
        paused = false;
        emit Unpaused(msg.sender);
    }

    function recoverERC20(
        address tokenAddress,
        uint256 tokenAmount
    ) external onlyOwner {
        require(
            tokenAddress != address(token),
            "Cannot recover the faucet's own token"
        );
        IERC20(tokenAddress).transfer(owner, tokenAmount);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Access denied: Only the contract owner can call this function"
        );
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
}
