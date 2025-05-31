// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";
import {OpenAIProver} from "./OpenAIProver.sol";

contract OpenAIVerifier is Verifier {
    address public prover;
    string public lastResponse;

    constructor(address _prover) {
        prover = _prover;
    }

    function verify(Proof calldata, OpenAIProver.OpenAIResponse memory _response) public onlyVerified(prover, OpenAIProver.main.selector) {
        lastResponse = _response.content;
    }

    function isResponseValid() public view returns (bool) {
        return bytes(lastResponse).length > 0;
    }
} 