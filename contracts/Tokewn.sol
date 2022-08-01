//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tokewn is ERC20("Tokenw","TKNW"),Ownable{
    constructor(){
        _mint(msg.sender,10000000*(10**18));
    }
    function mint(uint amount) public onlyOwner{
        _mint(msg.sender, amount);
    }
}