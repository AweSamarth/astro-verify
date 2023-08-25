//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//total parts created
import "@openzeppelin/contracts/utils/Strings.sol";


contract AstroVerify{
    uint public company_id=0;
    uint public part_id=0;

    struct Company{
        uint companyId;
        string companyName;
        uint companyTimestamp;
        uint[] partsArray;
    }
    
    struct Part{
        uint partId;
        uint price;
        address companyAddress;
        string partName;
        uint counter;
        uint totalSupply;
        string description;
        uint partTimestamp;
        address[] allOwners;        
    }

    

    struct Registry{
        uint partId;
        string serialNo;
        uint registryTimestamp;   

    }

    mapping (address=>Company) companyMapping;
    mapping(uint=>Part) partMapping;
    mapping (string=>Registry) registryMapping;



    function newCompany(string memory _name) payable external {
        require(msg.value>50000000000000000, "failed");
        company_id++;
        companyMapping[msg.sender].companyId=company_id;
        companyMapping[msg.sender].companyName=_name;
        companyMapping[msg.sender].companyTimestamp=block.timestamp;

    }

    function viewCompany(address _address) public view returns(Company memory){
        return companyMapping[_address];
    }

    function newPart(string memory _name, uint _totalSupply, string memory _description, uint _price ) public{
        part_id++;
        partMapping[part_id].partId = part_id;
        partMapping[part_id].companyAddress = msg.sender;
        partMapping[part_id].partName = _name;
        partMapping[part_id].totalSupply = _totalSupply;
        partMapping[part_id].description = _description;
        partMapping[part_id].partTimestamp = block.timestamp;
        partMapping[part_id].price = _price;
        partMapping[part_id].allOwners.push(msg.sender);
        companyMapping[msg.sender].partsArray.push(part_id);
        
    }

    function brandNewRegistry(uint _id) external payable{

        require(msg.value>partMapping[_id].price, "not enough funds");
        string memory theCounter= Strings.toString(++partMapping[_id].counter);
        string memory tempString=string.concat(Strings.toString(_id), "_");
        string memory anotherTemp = string.concat(tempString, theCounter);
        registryMapping[anotherTemp].serialNo = anotherTemp;
        registryMapping[anotherTemp].partId=_id;
        registryMapping[anotherTemp].registryTimestamp=block.timestamp;
    }

    function viewPart(uint _id) public view returns(Part memory) {
        return partMapping[_id];
    }

    function viewRegistry(string memory _serialNo) public view returns(Registry memory){
        return registryMapping[_serialNo];
    }



    
    
    
    receive() external payable {}

    fallback() external payable {}


}