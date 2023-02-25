// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MarriageRegistry {
    uint256 numberOfRecords = 0;
    struct Record {
        string firstPartnerName;
        string secondPartnerName;
        string firstWitnessName;
        string secondWitnessName;
        address firstPartnerAddress;
        address secondPartnerAddress;
        address firstWitnessAddress;
        address secondWitnessAddress;
        address officiantAddress;
        string weddingDate;
        string weddingLocation;
        bool secondPartnerSigned;
        bool firstWitnessSigned;
        bool secondWitnessSigned;
        bool officiantSigned;
    }
    struct OfficiantRecord {
        string officiantName;
        address officiantAddress;
        string officiantLocation;
        address issuingAuthority;
        address rootAuthority;
        PermissionLevel permissions;
        bool isActive;
    }
    // Enum for permission levels
    enum PermissionLevel {
        LEAF,
        INTERMEDIATE,
        ROOT
    }

    mapping(address => Record[]) public records;
    mapping(address => OfficiantRecord) public officiants;

    // TODO Events allow for logging of activity on the blockchain.
    // Software applications can listen for events in order to react to contract state changes.
    event LogDeposit(uint256 amount, address indexed sender);

    function firstPartnerSign(
        string memory firstPartnerName,
        string memory secondPartnerName,
        string memory firstWitnessName,
        string memory secondtWitnessName,
        address secondPartnerAddress,
        address firstWitnessAddress,
        address secondWitnessAddress,
        string memory marriageDate,
        string memory marriageLocation
    ) public {
        records[msg.sender].push(
            Record(
                firstPartnerName,
                secondPartnerName,
                firstWitnessName,
                secondtWitnessName,
                msg.sender,
                secondPartnerAddress,
                firstWitnessAddress,
                secondWitnessAddress,
                address(0),
                marriageDate,
                marriageLocation,
                false,
                false,
                false,
                false
            )
        );
        numberOfRecords += 1;
    }

    function secondPartnerSign(address firstPartnerAddress) public {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        require(
            records[firstPartnerAddress][lastIndex].secondPartnerAddress ==
                msg.sender,
            "Only second partner can sign"
        );
        records[firstPartnerAddress][lastIndex].secondPartnerSigned = true;
    }

    function firstWitnessSignOff(address firstPartnerAddress) public {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        require(
            records[firstPartnerAddress][lastIndex].firstWitnessAddress ==
                msg.sender,
            "Only first witness can sign"
        );
        require(
            records[firstPartnerAddress][lastIndex].secondPartnerSigned == true,
            "Second partner must sign"
        );
        records[firstPartnerAddress][lastIndex].firstWitnessSigned = true;
    }

    function secondWitnessSignOff(address firstPartnerAddress) public {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        require(
            records[firstPartnerAddress][lastIndex].secondWitnessAddress ==
                msg.sender,
            "Only second witness can sign"
        );
        require(
            records[firstPartnerAddress][lastIndex].secondPartnerSigned == true,
            "Second partner must sign"
        );
        records[firstPartnerAddress][lastIndex].secondWitnessSigned = true;
    }

    function officiantSignOff(address firstPartnerAddress) public {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        require(
            records[firstPartnerAddress][lastIndex].secondPartnerSigned == true,
            "Second partner must sign"
        );
        require(
            records[firstPartnerAddress][lastIndex].firstWitnessSigned == true,
            "First witness must sign"
        );
        require(
            records[firstPartnerAddress][lastIndex].secondWitnessSigned == true,
            "Second witness must sign"
        );
        records[firstPartnerAddress][lastIndex].officiantAddress = msg.sender;
        records[firstPartnerAddress][lastIndex].officiantSigned = true;
    }

    function addFirstRootOfficiant(
        string memory officiantName,
        address officiantAddress,
        string memory officiantLocation
    ) public {
        // When a new officiant adds himself, he must be the root authority, issuing authority, and have all permissions
        require(
            officiantAddress == msg.sender,
            "Officiant address must be yours"
        );
        officiants[officiantAddress] = OfficiantRecord(
            officiantName,
            officiantAddress,
            officiantLocation,
            officiantAddress,
            officiantAddress,
            PermissionLevel.ROOT,
            true
        );
    }

    function addOfficiant(
        string memory officiantName,
        address officiantAddress,
        string memory officiantLocation,
        address issuingAuthority,
        address rootAuthority,
        PermissionLevel permissions
    ) public {
        require(
            issuingAuthority == msg.sender,
            "You must be the issuing authority"
        );
        require(
            officiants[issuingAuthority].isActive,
            "Issuing authority must be active"
        );
        require(
            officiants[issuingAuthority].permissions >= permissions,
            "Cannot issue permissions higher than your own"
        );
        require(
            hasSameRootAuthority(issuingAuthority, rootAuthority),
            "Issuing authority and declared root authority must descend from the same root authority"
        );
        officiants[officiantAddress].permissions = permissions;
        officiants[officiantAddress].rootAuthority = rootAuthority;
        officiants[officiantAddress].issuingAuthority = issuingAuthority;
        officiants[officiantAddress].officiantLocation = officiantLocation;
        officiants[officiantAddress].officiantName = officiantName;
        officiants[officiantAddress].officiantAddress = officiantAddress;
        officiants[officiantAddress].isActive = true;
    }

    function removeOfficiant(address officiantAddress) public {
        require(
            officiants[msg.sender].permissions >=
                officiants[officiantAddress].permissions,
            "You must have higher or equal permissions to remove this officiant"
        );
        require(
            officiants[msg.sender].permissions != PermissionLevel.LEAF,
            "Leaf officiants are not allowed to remove officiants"
        );
        officiants[officiantAddress].isActive = false;
    }

    function hasSameRootAuthority(
        address issuingAuthority,
        address rootAuthority
    ) public view returns (bool) {
        if (officiants[issuingAuthority].issuingAuthority == rootAuthority) {
            return true;
        } else {
            address currentRootAuthority = officiants[issuingAuthority]
                .issuingAuthority;
            while (true) {
                if (currentRootAuthority == rootAuthority) {
                    return true;
                } else if (
                    officiants[currentRootAuthority].issuingAuthority ==
                    officiants[currentRootAuthority].rootAuthority
                ) {
                    return false;
                }
                currentRootAuthority = officiants[currentRootAuthority]
                    .issuingAuthority;
            }
        }
        return false;
    }

    function getRecords(address addr) public view returns (Record[] memory) {
        return records[addr];
    }
    
    // Returns number of marriage records
    function getNumRecords() public view returns (uint256) {
        return numberOfRecords;
    }

    function getSecondPartnerSigned(address firstPartnerAddress)
        public
        view
        returns (bool)
    {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        return records[firstPartnerAddress][lastIndex].secondPartnerSigned;
    }

    function getFirstWitnessSigned(address firstPartnerAddress)
        public
        view
        returns (bool)
    {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        return records[firstPartnerAddress][lastIndex].firstWitnessSigned;
    }

    function getSecondWitnessSigned(address firstPartnerAddress)
        public
        view
        returns (bool)
    {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        return records[firstPartnerAddress][lastIndex].secondWitnessSigned;
    }

    function getOfficiantSigned(address firstPartnerAddress)
        public
        view
        returns (bool)
    {
        uint256 lastIndex = records[firstPartnerAddress].length - 1;
        return records[firstPartnerAddress][lastIndex].officiantSigned;
    }

    function isOfficiantActive(address officiantAddress)
        public
        view
        returns (bool)
    {
        return officiants[officiantAddress].isActive;
    }

    function getOfficiantPermissions(address officiantAddress)
        public
        view
        returns (PermissionLevel)
    {
        return officiants[officiantAddress].permissions;
    }
}
