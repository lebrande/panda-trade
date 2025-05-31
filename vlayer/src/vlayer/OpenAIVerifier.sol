// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";
import {OpenAIProver} from "./OpenAIProver.sol";
import "forge-std/Test.sol";

contract OpenAIVerifier is Verifier {
    address public prover;
    string public lastResponse;
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

    function isResponseValid() public view returns (bool) {

        bool validId = bytes(lastId).length > 0;
        bool validObject = keccak256(bytes(lastObject)) == keccak256(bytes("chat.completion"));
        bool validFinishReason = keccak256(bytes(lastFinishReason)) == keccak256(bytes("stop"));
        
        bytes memory responseBytes = bytes(lastResponse);
        if (responseBytes.length == 0) return false;

        string memory expectedMagicLine = string.concat("MAGIC_NUMBER:", magicNumber);
        bytes memory magicLineBytes = bytes(expectedMagicLine);
        
        bool validMagicLine = responseBytes.length >= magicLineBytes.length;
        if (validMagicLine) {
            for (uint i = 0; i < magicLineBytes.length; i++) {
                if (responseBytes[i] != magicLineBytes[i]) {
                    validMagicLine = false;
                    break;
                }
            }
        }
        
        bool hasNewLine = responseBytes.length > magicLineBytes.length && 
            (responseBytes[magicLineBytes.length] == '\n' || responseBytes[magicLineBytes.length] == '\r');
        
        return validId && validObject && validFinishReason && validMagicLine && hasNewLine;
    }
} 