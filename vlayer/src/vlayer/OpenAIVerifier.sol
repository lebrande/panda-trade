// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";
import {OpenAIProver} from "./OpenAIProver.sol";
import "forge-std/Test.sol";

contract OpenAIVerifier is Verifier {
    address public prover;
    string public lastResponse;
    string public expectedPrompt;
    string public lastId;
    string public lastObject;
    string public lastFinishReason;
    string public magicNumber;

    constructor(address _prover, string memory _magicNumber) {
        prover = _prover;
        magicNumber = _magicNumber;
    }

    function verify(Proof calldata, OpenAIProver.OpenAIResponse memory _response) public onlyVerified(prover, OpenAIProver.main.selector) {
        lastResponse = _response.content;
        lastId = _response.id;
        lastObject = _response.object;
        lastFinishReason = _response.finishReason;
    }

    function checkPromptMatch() public view returns (bool) {
        return keccak256(bytes(lastResponse)) == keccak256(bytes(expectedPrompt));
    }

    function isResponseValid() public view returns (bool) {
        bool validId = bytes(lastId).length > 0;
        bool validObject = keccak256(bytes(lastObject)) == keccak256(bytes("chat.completion"));
        bool validFinishReason = keccak256(bytes(lastFinishReason)) == keccak256(bytes("stop"));
        
        string memory expectedPrefix = string.concat("magic_number:", magicNumber);
        bytes memory responseBytes = bytes(lastResponse);
        bytes memory prefixBytes = bytes(expectedPrefix);
        
        bool validMagicNumber = responseBytes.length >= prefixBytes.length;
        
        if (validMagicNumber) {
            bytes memory responsePrefix = new bytes(prefixBytes.length);
            for (uint i = 0; i < prefixBytes.length; i++) {
                responsePrefix[i] = responseBytes[i];
            }
            validMagicNumber = keccak256(prefixBytes) == keccak256(responsePrefix);
        }
        
        return validId && validObject && validFinishReason && validMagicNumber;
    }
} 