// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Storage {
    // Nested mapping: address -> (id -> value)
    mapping(address => mapping(uint256 => string)) private items;
    mapping(address => uint256) private userItemCount;
    mapping(address => mapping(uint256 => bool)) private itemExists;

    event ItemCreated(address indexed owner, uint256 indexed id, string value);
    event ItemUpdated(address indexed owner, uint256 indexed id, string value);
    event ItemDeleted(address indexed owner, uint256 indexed id);

    function create(string memory _value) public returns (uint256) {
        require(bytes(_value).length > 0, "Value cannot be empty");

        userItemCount[msg.sender]++;
        uint256 newId = userItemCount[msg.sender];
        items[msg.sender][newId] = _value;
        itemExists[msg.sender][newId] = true;

        emit ItemCreated(msg.sender, newId, _value);
        return newId;
    }

    function read(uint256 _id) public view returns (string memory) {
        require(itemExists[msg.sender][_id], "Item does not exist");
        return items[msg.sender][_id];
    }

    function update(uint256 _id, string memory _value) public {
        require(itemExists[msg.sender][_id], "Item does not exist");
        require(bytes(_value).length > 0, "Value cannot be empty");

        items[msg.sender][_id] = _value;
        emit ItemUpdated(msg.sender, _id, _value);
    }

    function remove(uint256 _id) public {
        require(itemExists[msg.sender][_id], "Item does not exist");

        delete items[msg.sender][_id];
        delete itemExists[msg.sender][_id];
        emit ItemDeleted(msg.sender, _id);
    }

    function fetchAll()
        public
        view
        returns (uint256[] memory, string[] memory)
    {
        uint256 itemCount = userItemCount[msg.sender];
        uint256[] memory ids = new uint256[](itemCount);
        string[] memory values = new string[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 id = i + 1;
            if (itemExists[msg.sender][id]) {
                ids[i] = id;
                values[i] = items[msg.sender][id];
            }
        }

        return (ids, values);
    }
}
