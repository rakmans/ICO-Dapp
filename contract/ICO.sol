// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25 .0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ICO is Ownable {
    error notCorrectValue(uint256 value, uint256 price);

    IERC20 public immutable token;
    uint256 public immutable tokenRate;

    uint256 public immutable maxAirdropAmount;
    uint256 public immutable holderAirdropAmount;
    uint256 public totalAirdrops;

    uint256 public icoEndTime;

    enum Stage {
        disable,
        airdrop,
        sale
    }
    Stage public stage;

    uint256 public holdersCount;

    struct inventory {
        bool airdropWithdrawn;
        uint256 holders;
        bool isHolder;
    }
    mapping(address => inventory) private userInventory;

    event Buy(address indexed buyer, uint256 indexed amount);
    event Airdrop(address indexed receiver, uint256 indexed amount);

    constructor(
        address _token,
        uint256 _maxAirdropAmount,
        uint256 _holderAirdropAmount,
        uint256 _tokenRate
    ) payable Ownable(msg.sender) {
        token = IERC20(_token);
        maxAirdropAmount = _maxAirdropAmount;
        holderAirdropAmount = _holderAirdropAmount;
        tokenRate = _tokenRate;
    }

    modifier isActive() {
        require(
            icoEndTime > 0 && block.timestamp < icoEndTime,
            "ICO have been ended!"
        );
        _;
    }

    modifier isInActive() {
        require(icoEndTime == 0, "ICO alrerady activated!");
        _;
    }

    modifier isAirdrop() {
        require(stage == Stage.airdrop, "Airdrop isn't active!");
        _;
    }

    modifier isSale() {
        require(stage == Stage.sale, "ICO Sale isn't active!");
        _;
    }

    function active(uint256 duration, uint8 _stage)
        external
        onlyOwner
        isInActive
    {
        require(duration != 0, "duration must be > 0.");
        icoEndTime = block.timestamp + duration;
        stage = Stage(_stage);
    }

    function deActive() external onlyOwner isActive {
        icoEndTime = 0;
        stage = Stage.disable;
    }

    function airdrop() external isActive isAirdrop {
        inventory memory UserInventory = userInventory[msg.sender];
        require(!UserInventory.airdropWithdrawn, "You received your airdrop.");
        require(
            totalAirdrops + holderAirdropAmount <= maxAirdropAmount,
            "All Airdrops were released!"
        );

        require(
            balanceOfTokens(address(this)) >= holderAirdropAmount,
            "No enough tokens for airdrop!"
        );

        UserInventory.airdropWithdrawn = true;

        totalAirdrops = totalAirdrops + holderAirdropAmount;

        if (!UserInventory.isHolder) {
            UserInventory.isHolder = true;
            holdersCount++;
        }

        UserInventory.holders = UserInventory.holders + holderAirdropAmount;

        userInventory[msg.sender] = UserInventory;

        token.transfer(msg.sender, holderAirdropAmount);

        emit Airdrop(msg.sender, holderAirdropAmount);
    }

    function purchase(uint256 amount) external payable isActive isSale {
        uint256 price = amount * tokenRate;
        if (msg.value != amount * price) {
            revert notCorrectValue(msg.value, amount * price);
        }

        if (!userInventory[msg.sender].isHolder) {
            userInventory[msg.sender].isHolder = true;
            holdersCount++;
        }

        userInventory[msg.sender].holders =
            userInventory[msg.sender].holders +
            amount;

        token.transfer(msg.sender, amount);

        emit Buy(msg.sender, amount);
    }

    function depositTokens(uint256 amount) external onlyOwner isInActive {
        token.transferFrom(owner(), address(this), amount);
    }

    function withdrawTokens(uint256 amount) external onlyOwner isInActive {
        require(amount <= balanceOfTokens(address(this)), "amount > balance.");

        token.transfer(owner(), amount);
    }

    function withdrawEth(uint256 amount) external onlyOwner isInActive {
        require(amount <= balanceOfEth(address(this)), "amount > balance.");

        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transmission problem");
    }

    function balanceOfTokens(address account) public view returns (uint256) {
        return token.balanceOf(account);
    }

    function balanceOfEth(address account) public view returns (uint256) {
        return account.balance;
    }
}
