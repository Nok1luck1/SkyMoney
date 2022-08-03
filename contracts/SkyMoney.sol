//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Address.sol";

contract SkyMoney is Ownable,ReentrancyGuard{

    struct User{
        address user;
        address referral;
        uint currentlvl;
        uint deposited;
        uint earned;
        uint countOfBuyingLevels;
        address[] referals;
    }
    struct Level{
        uint numberLvl;
        uint priceToStart;
        uint refillCount;
        uint refillPercent;
        address[] currentLvlLine;
    }
    IERC20 public Token;
    mapping(address => User) public users;
    mapping(uint => Level) public levels;
    uint public ReferallBonusPercent = 3;
    uint public TotalUsers;  
    event CreatedNewLevel(uint LevelNumber,uint PriseToStart,uint RefillCount,uint RefillPercent,uint Time);
    event LevelBought(uint LevelNumber,uint Time,address User);
    event ReferallGetBonus(address Referall, address User,uint Time,uint LevelNumber);
    event EmergencyWithdraw(address User,uint Time,uint amount,uint LevelNumber);
constructor(IERC20 token_,address owner_){
    Token = token_;
    transferOwnership(owner_);
    createNewLvl(0, 30*(10**18), 5, 200);
    createNewLvl(1, 70*(10**18), 4, 150);
    createNewLvl(2, 130*(10**18),5, 175);
    createNewLvl(3, 180*(10**18), 6, 200);
    createNewLvl(4, 200*(10**18), 6, 225);
    createNewLvl(5, 220*(10**18), 8, 250);
    createNewLvl(6, 250*(10**18), 8, 275);
    createNewLvl(7, 325*(10**18), 9, 300);
}
//set refill percent in actual percentage
//refillcount set with active count of percent who will stand in queue for waiting last man
function createNewLvl(uint _numberLvl,uint _priceStart,uint _refillCount,uint _refillPercent)public onlyOwner returns(uint){
    Level storage lvl = levels[_numberLvl];
    lvl.numberLvl = _numberLvl;
    lvl.priceToStart = _priceStart;
    lvl.refillCount = _refillCount;
    lvl.refillPercent = _refillPercent;
    emit CreatedNewLevel(_numberLvl, _priceStart, _refillCount, _refillPercent, block.timestamp);
    return _numberLvl;
}
//require refferal is exist and buy some lvl
function buyLevel(uint buyLvl,address _refferal)public nonReentrant {
    User storage user = users[msg.sender];
    Level storage lvl = levels[buyLvl];
    require(_refferal != 0x0000000000000000000000000000000000000000,"if you dont have refferal address use address owner");
    user.referral = _refferal;
    require(user.currentlvl+1 >= buyLvl,"You need to buy earlier level");
    Token.transferFrom(msg.sender, address(this), lvl.priceToStart);
    user.currentlvl = buyLvl;
    user.deposited += lvl.priceToStart;
    user.user = msg.sender;
    user.countOfBuyingLevels++;
    address[] storage current = lvl.currentLvlLine;
    if (lvl.refillCount == current.length){
        _sendPaymentaAndPushInQueue(lvl.currentLvlLine, msg.sender, buyLvl);
    }
    else{
        lvl.currentLvlLine.push(msg.sender);
    }
    TotalUsers++;
    emit LevelBought(buyLvl, block.timestamp, msg.sender);
}
function changeToken(IERC20 _token)private onlyOwner{
    Token = _token;
}
function closeLevelAndSendReward(uint _level)public onlyOwner{
    Level storage level = levels[_level];
    address currentUserAddress;
    address[]storage usersArray = level.currentLvlLine;
    for (uint i = 0; i < usersArray.length; i++){
        currentUserAddress = usersArray[i];
        Token.transfer(currentUserAddress, level.priceToStart);
        emit EmergencyWithdraw(currentUserAddress, block.timestamp, level.priceToStart, level.numberLvl);
    }
    delete level.currentLvlLine;

}
function _sendPaymentaAndPushInQueue(address[]storage array,address newUser,uint _lvle) internal {
    Level storage lvl = levels[_lvle];
    address paymentToUser = array[0];
    User storage user = users[paymentToUser];
    uint amountForlvl = (lvl.priceToStart/100)*lvl.refillPercent ;
    user.earned = user.earned + amountForlvl;
    Token.transfer(paymentToUser, amountForlvl);
    array = _remove(array, 0);
    array.push(newUser);
    _sendToRefferalPercent(paymentToUser);
    lvl.currentLvlLine = array;
    emit ReferallGetBonus(user.referral, user.user, block.timestamp, lvl.numberLvl);
}
function _sendToRefferalPercent(address _user) internal {
    User storage user = users[_user];
    address reseiver = user.referral;
    uint lvlCurrentUser = user.currentlvl;
    Level storage lvl = levels[lvlCurrentUser];
    uint amountBonus = (lvl.priceToStart / 100) * ReferallBonusPercent;
    User storage refUser = users[user.referral];
    refUser.earned = refUser.earned + amountBonus;
    refUser.referals.push(_user);
    Token.transfer(reseiver, amountBonus);
    emit ReferallGetBonus(reseiver, _user, block.timestamp, lvlCurrentUser);
}
function currentQueueInLevel(uint levelNumber)public view returns(address[] memory){
    Level storage lvl = levels[levelNumber];
    return lvl.currentLvlLine;
}
function _remove(address[]storage arr,uint _index) internal returns(address[]storage) {
    require(_index < arr.length, "index out of bound");
    for (uint i = _index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr.pop();
    return arr;
    }
function changeReferallPercent(uint percent)public onlyOwner returns(uint){
    ReferallBonusPercent = percent;
    return percent;
}
function witdhraw(address token,uint amount) private onlyOwner{
    IERC20(token).transfer(address(msg.sender), amount);
}
}