//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./HederaTokenService.sol";
import "./HederaResponseCodes.sol";

contract Verifier is HederaTokenService {

    // the contract's owner, set in the constructor
    address payer;
    address payee;
    // the message we're storing
    string[3] requirements;

    uint256 price;
    uint256 amount = 0;
    bool verified = false;

    constructor(address _payee) {
        payer = msg.sender;
        payee = _payee;
    }

    receive() external payable {}

    fallback() external payable {}

    function tokenAssociate(address _account, address _htsToken) payable external {
        require(msg.value > 2000000000,"Send more HBAR");
        
        int response = HederaTokenService.associateToken(_account, _htsToken);
        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Token association failed");
        }
    }
        
    //============================================ 
    // GETTING HBAR FROM THE CONTRACT
    //============================================ 
    function transferHbar(address payable _receiverAddress, uint _amount) public {
        _receiverAddress.transfer(_amount);
    }

    function sendHbar(address payable _receiverAddress, uint _amount) public {
        require(_receiverAddress.send(_amount), "Failed to send Hbar");
    }

    function callHbar(address payable _receiverAddress, uint _amount) public {
        (bool sent, ) = _receiverAddress.call{value:_amount}("");
        require(sent, "Failed to send Hbar");
    }
    
    //============================================ 
    // CHECKING THE HBAR BALANCE OF THE CONTRACT
    //============================================ 
    function getBalance() public view returns (uint) {
        return address(this).balance; // might have to change it
    }

    // constructor(string memory message_) {
    //     // set the owner of the contract for `kill()`
    //     payer = msg.sender;
    //     message = message_;
    // }

    modifier onlyPayer() {
        require(msg.sender == payer, "Only the payer can call this.");
        _;
    }

    modifier onlyPayee() {
        require(msg.sender == payee, "Only the payee can call this.");
        _;
    }

    function deposit() external payable onlyPayer {
        require(msg.value > 0, "Amount should be greater than 0");
        require(msg.value == price, "Wrong price input");
        amount += msg.value;
    }

    function verifyTransaction(bool verifiedState) external { // only AI
        // In a real-world scenario, there would be additional checks here or only a specific trusted entity would be able to call this.
        verified = verifiedState;
    }

    function withdraw() external onlyPayee { // call function when AI verification is done.

        require(verified, "Transaction is not verified yet.");
        require(amount > 0, "No funds to withdraw.");

        uint256 withdrawalAmount = amount;  // Save the amount to be withdrawn
        amount = 0;                          // Set the amount to 0 to prevent re-entrancy attacks
        payable(payee).transfer(withdrawalAmount);
    }

    function set_price(uint256 price_) public {
        // only allow the owner to update the message
        if (msg.sender != payee) return;
        price = price_;
    }

    function getRequirement(uint index) public view returns (string memory) {
        require(index < requirements.length, "Index out of bounds");
        return requirements[index];
    }

    // If you wish to get all requirements, you can return the entire array. However, keep in mind that if the array becomes too large, you might face gas issues.
    // function getAllRequirements() public view returns (string[] memory) {
    //     return requirements;
    // }

}