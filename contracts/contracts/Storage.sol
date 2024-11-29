// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Storage {
    // Nested mapping: address -> (id -> value)
    mapping(address => mapping(uint256 => string)) private items;
    mapping(address => uint256) private userItemCount;

    // Events
    event ItemCreated(address indexed owner, uint256 indexed id, string value);
    event ItemUpdated(address indexed owner, uint256 indexed id, string value);
    event ItemDeleted(address indexed owner, uint256 indexed id);

    // Create
    function create(string memory _value) public returns (uint256) {
        userItemCount[msg.sender]++;
        uint256 newId = userItemCount[msg.sender];
        items[msg.sender][newId] = _value;
        emit ItemCreated(msg.sender, newId, _value);
        return newId;
    }

    // Read
    function read(uint256 _id) public view returns (string memory) {
        require(
            _id <= userItemCount[msg.sender] && _id > 0,
            "Item does not exist"
        );
        return items[msg.sender][_id];
    }

    // Update
    function update(uint256 _id, string memory _value) public {
        require(
            _id <= userItemCount[msg.sender] && _id > 0,
            "Item does not exist"
        );
        items[msg.sender][_id] = _value;
        emit ItemUpdated(msg.sender, _id, _value);
    }

    // Delete
    function remove(uint256 _id) public {
        require(
            _id <= userItemCount[msg.sender] && _id > 0,
            "Item does not exist"
        );
        delete items[msg.sender][_id];
        emit ItemDeleted(msg.sender, _id);
    }

    // Get user's total items count
    function getCount() public view returns (uint256) {
        return userItemCount[msg.sender];
    }

    // Get item by owner and id
    function getItemByOwner(
        address _owner,
        uint256 _id
    ) public view returns (string memory) {
        require(_id <= userItemCount[_owner] && _id > 0, "Item does not exist");
        return items[_owner][_id];
    }

    // Get all items of the current user
    function getMyItems() public view returns (string[] memory) {
        uint256 count = userItemCount[msg.sender];
        require(count > 0, "You have no items");

        string[] memory userItems = new string[](count);
        for (uint256 i = 1; i <= count; i++) {
            userItems[i - 1] = items[msg.sender][i];
        }
        return userItems;
    }
}
