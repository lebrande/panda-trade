// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Prover} from "vlayer-0.1.0/Prover.sol";
import {Web, WebProof, WebProofLib, WebLib} from "vlayer-0.1.0/WebProof.sol";

contract OpenAIProver is Prover {
    using WebProofLib for WebProof;
    using WebLib for Web;

    string public constant DATA_URL = "https://api.openai.com/v1/chat/completions";

    function main(WebProof calldata webProof) public view returns (Proof memory, string memory) {
        Web memory web = webProof.verify(DATA_URL);

        // Sprawdzamy czy odpowiedź zawiera oczekiwany prompt
        string memory response = web.jsonGetString("choices[0].message.content");
        
        // Zwracamy proof i odpowiedź
        return (proof(), response);
    }
} 