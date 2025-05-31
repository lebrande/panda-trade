// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

import {OpenAIProver} from "./OpenAIProver.sol";

contract OpenAIVerifier is Verifier {
    address public prover;
    string public lastResponse;
    string public expectedPrompt;

    constructor(address _prover, string memory _expectedPrompt) {
        prover = _prover;
        expectedPrompt = _expectedPrompt;
    }

    function verify(Proof calldata, string memory _response) public onlyVerified(prover, OpenAIProver.main.selector) {
        lastResponse = _response;
    }

    function checkPromptMatch() public view returns (bool) {
        // Tutaj możemy dodać bardziej zaawansowaną logikę porównywania
        // Na przykład sprawdzanie czy odpowiedź zawiera oczekiwany prompt
        return bytes(lastResponse).length > 0;
    }
} 