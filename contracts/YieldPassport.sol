// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;


library ECDSA {
    function recover(bytes32 hash, bytes memory signature) internal pure returns (address) {
        require(signature.length == 65, "ECDSA: invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }
       
        require(uint256(s) <= 0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, "ECDSA: invalid s");
        require(v == 27 || v == 28, "ECDSA: invalid v");
        return ecrecover(hash, v, r, s);
    }

    function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}

contract YieldPassport {
    using ECDSA for bytes32;

    struct Passport {
        uint256 score;          
        uint256 lastUpdated;    
        uint256 nonce;          
        address attester;       
    }

    // Wallet => passport
    mapping(address => Passport) public passports;

    // Admin / owner
    address public owner;

    // Permitted attesters (oracle keys)
    mapping(address => bool) public attesters;

    // Event emitted when passport updated on-chain
    event PassportUpdated(
        address indexed wallet,
        uint256 score,
        uint256 lastUpdated,
        address indexed attester,
        uint256 nonce
    );

    // Admin events
    event AttesterAdded(address indexed attester);
    event AttesterRemoved(address indexed attester);
    event OwnerTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address[] memory initialAttesters) {
        owner = msg.sender;
        for (uint i=0; i<initialAttesters.length; i++) {
            attesters[initialAttesters[i]] = true;
            emit AttesterAdded(initialAttesters[i]);
        }
    }

    /// Add or remove attester oracle keys
    function setAttester(address a, bool allowed) external onlyOwner {
        attesters[a] = allowed;
        if (allowed) emit AttesterAdded(a);
        else emit AttesterRemoved(a);
    }

    function transferOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero addr");
        emit OwnerTransferred(owner, newOwner);
        owner = newOwner;
    }

    /// Direct update by owner
    function adminUpdate(address wallet, uint256 score) external onlyOwner {
        passports[wallet].score = score;
        passports[wallet].lastUpdated = block.timestamp;
        passports[wallet].nonce += 1;
        passports[wallet].attester = msg.sender;
        emit PassportUpdated(wallet, score, passports[wallet].lastUpdated, msg.sender, passports[wallet].nonce);
    }

    /// Update by attester oracle
    function updateWithSignature(
        address wallet,
        uint256 score,
        uint256 ts,
        uint256 nonce,
        bytes calldata signature
    ) external {
        // 1) Basic sanity
        require(wallet != address(0), "invalid wallet");
        require(ts <= block.timestamp + 60, "future ts"); 
        // 2) Prevent replay by nonce: require provided nonce > stored nonce
        require(nonce > passports[wallet].nonce, "invalid nonce");

        // 3) Build message hash to verify signature
        bytes32 payload = keccak256(abi.encodePacked(wallet, score, ts, nonce, address(this)));
        bytes32 ethHash = payload.toEthSignedMessageHash();

        address signer = ethHash.recover(signature);
        require(attesters[signer], "unauthorized attester");

        // 4) Accept attestation
        passports[wallet].score = score;
        passports[wallet].lastUpdated = ts;
        passports[wallet].nonce = nonce;
        passports[wallet].attester = signer;

        emit PassportUpdated(wallet, score, ts, signer, nonce);
    }

    /// Read function: returns the score, lastUpdated, nonce, attester
    function getPassport(address wallet) external view returns (uint256 score, uint256 lastUpdated, uint256 nonce, address attester) {
        Passport memory p = passports[wallet];
        return (p.score, p.lastUpdated, p.nonce, p.attester);
    }
}