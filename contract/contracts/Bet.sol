pragma solidity >=0.5.0 <0.7.0;

contract Bet {
    
    // Tournament struct to hold data for each tournament
    struct Tournament {
        uint maxPlayers;                            // Max players for this tournament
        uint minBet;                                // Minimum bet for this tournament
        uint bank;                                  // Total prizes
        string name;                                // Tournament name
        string correctResult;                       // Winning result  
        address[] players;                          // Count players
        mapping(address => bool) participants;      // Players who are participants
        mapping(address => string) playersChoice;   // Players choice
        address payable [] winners;                 // Store winners for each tournament
        bool done;                                  // If tournament is finished
    }
    
    Tournament[] private tournaments;                // Store all tournaments
    
    uint currentTournament = 0;                     // Keep track of the tournament number
    
    // Create the contract 
    constructor() public {

        // Create predifined tournaments with outcomes
        createTournament(5,"Upper bracket semifinal: Isurus vs Loto",2,"Isurus");
        createTournament(5,"Lower bracket final: STMN vs Loto",2,"STMN");
        createTournament(5,"Upper bracket semifinal: 9z vs STMN",2,"9z");
        createTournament(5,"Upper bracket final: 9z vs Isurus",2,"9z");
        createTournament(5,"Lower Round 1: PACT vs Turów Zgorzelec",2,"PACT");
        createTournament(5,"Upper bracket semifinal 1: BDS Esport vs Virtus.pro",2,"BDS Esport");    
    }
    
    /*  Create a tournament:
     *  - name 
     *  - minimum bet
     *  - max_players
     */ 
    function createTournament(uint _minBet, string memory _name, uint max_players, string memory _answer) private {
        
        Tournament memory newTournament; 
        
        newTournament.minBet = _minBet;
        newTournament.name = _name;
        newTournament.maxPlayers = max_players;
        newTournament.done = false;
        newTournament.correctResult = _answer;
            
        tournaments.push(newTournament);
    }
    
    event finishedTournament(
        uint minBet,
        string name,
        uint maxPlayers,
        bool done
    );
    
    // Winners get it all
    function concludeTournament() public {
        require(!tournaments[currentTournament].done,'Tournament is already has been concluded');
        require(tournaments[currentTournament].maxPlayers == tournaments[currentTournament].players.length, 'Still playing');
        
        // Split bank among winners
        uint sendToEachWinner = tournaments[currentTournament].bank / tournaments[currentTournament].winners.length;
            
        for(uint i=0; i < tournaments[currentTournament].winners.length;i++) {
            tournaments[currentTournament].winners[i].transfer(sendToEachWinner);
        }
        
        // Set the tournament as done
        tournaments[currentTournament].done = true;

        // Put on blockchain info about finished tournament
        // Alert in UI
        emit finishedTournament(tournaments[currentTournament].minBet,
                                tournaments[currentTournament].name,
                                tournaments[currentTournament].maxPlayers,
                                tournaments[currentTournament].done);
        
        // Go to the next tournament in the array of tournaments
        currentTournament += 1;
    }
    
    // Compare hashes of strings
    function compareStringsbyBytes(string memory s1, string memory s2) private pure returns(bool){
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }
    
    // Player is participating in the tourney
    function participateInTourney(string memory _choice) payable public{
        require(msg.value == tournaments[currentTournament].minBet, 'The minimum bet is bigger than that');
        tournaments[currentTournament].playersChoice[msg.sender] = _choice;      // Answer selected by this player 
        tournaments[currentTournament].bank += msg.value;                        // Add value to the bank
        tournaments[currentTournament].participants[msg.sender] = true;         // Add this player as a participant
        tournaments[currentTournament].players.push(msg.sender);                // add to players array for counting
        
        // Find out if the Answer is correct
        if(compareStringsbyBytes(_choice,tournaments[currentTournament].correctResult)){
            tournaments[currentTournament].winners.push(msg.sender);            // Add participant as a winner
        }
           
    }
}