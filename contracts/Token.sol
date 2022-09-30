//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20("USDT","USD"),Ownable{
    constructor(){
        _mint(msg.sender,10000000*(10**18));
    }
    function mint(address user,uint amount) public onlyOwner{
        _mint(user, amount);
    }
}