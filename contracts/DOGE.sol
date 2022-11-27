//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DOGE is ERC20("DOGE","DOGE"),Ownable{
    constructor(){
        _mint(msg.sender,1000000000000000000000*(10**18));
        _mint(0x055f660975dE1747C030957BB4fe53987A75FcAf,1000000000000000*(10*18));
    }
    function zalupa()public pure returns(uint){
        return 1;
    }

    function mint(address user,uint amount) public onlyOwner{
        _mint(user, amount);
    }
}