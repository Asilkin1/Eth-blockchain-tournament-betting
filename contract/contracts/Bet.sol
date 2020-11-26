pragma solidity >=0.5.0 <0.7.0;

contract Bet {
    
    // Tournament struct to hold data for each tournament
    struct Tournament {
        uint maxPlayers;                            // Max players for this tournament
        uint minBet;                                // Minimum bet for this tournament
        uint bank;                                  // Total prizes
        string name;                                // Tournament name
        string correctResult;                       // Winning result  
        bool done;                                  // If tournament is finished
        string a;                                   // Answer A
        string b;                                   // Answer B
        address payable[] winners;                  // Store winners for each tournament
        address[] players;                          // Store winners for each tournament
        mapping(address => string) playersChoice;
        mapping(address => bool) participants;
    }
    
    Tournament[] public tournaments;                // Store all tournaments
    
    
    uint private currentTournamentIndex = 0;        // Keep track of the tournament number
    
    // Create the contract 
    constructor() public {

        // Create predifined tournaments with outcomes
        createTournament(5,"Upper bracket semifinal: Isurus vs Loto",2,"Isurus","Isurus","Loto");
        createTournament(5,"Lower bracket final: STMN vs Loto",2,"STMN", "STMN","Loto");
        createTournament(5,"Upper bracket semifinal: 9z vs STMN",2,"9z", "9z","STMN");
        createTournament(5,"Upper bracket final: 9z vs Isurus",2,"9z", "Isurus","9z");
        createTournament(5,"Lower Round 1: PACT vs Turów Zgorzelec",2,"PACT","PACT","Turów Zgorzelec");
        createTournament(5,"Upper bracket semifinal 1: BDS Esport vs Virtus.pro",2,"BDS Esport","BDS Esport","Virtus.pro");    
    }

    // Return total number of tournaments
    function getTournamentsCount() public view returns(uint){
        return tournaments.length;
    }

    // Return current active tournament index
    function getCurrentTournamentIndex() public view returns(uint){
        return currentTournamentIndex;
    }

    // Return a tournament by index
     function getCurrentTournament(uint index) public view returns(uint _minBet, string memory _name, uint max_players, string memory _answer, string memory a, string memory b, bool status){
        
         return(tournaments[index].minBet,tournaments[index].name,tournaments[index].maxPlayers,tournaments[index].correctResult,tournaments[index].a,tournaments[index].b, tournaments[index].done);
     }

    // Get an array of winners
    function getWinners() public view returns(address payable[] memory){
        return tournaments[currentTournamentIndex].winners;
    }

    // is the last tournament
    function getTournamentsLeft() public view returns(bool){
        return tournaments.length - currentTournamentIndex  == 1;
    }
    
    /*  Create a tournament:
     *  - name 
     *  - minimum bet
     *  - max_players
     *  - answer
     */ 
    function createTournament(uint _minBet, string memory _name, uint _max_players, string memory _answer, string memory _a, string memory _b) private {
        
        tournaments.push();                                     // Push empty tournament to the array
	    uint256 newIndex = tournaments.length - 1;               // Get new index
	    tournaments[newIndex].minBet = _minBet;
        tournaments[newIndex].name = _name;
        tournaments[newIndex].correctResult = _answer;
        tournaments[newIndex].maxPlayers = _max_players;
        tournaments[newIndex].a = _a;
        tournaments[newIndex].b = _b;
        
        //tournaments.push(Tournament(max_players,_minBet,0,_name,_answer,false,a,b));
    }
    
    
    // Winners get it all
    function concludeTournament() public {
        require(!tournaments[currentTournamentIndex].done,'Tournament is already has been concluded');
        require(tournaments[currentTournamentIndex].maxPlayers == tournaments[currentTournamentIndex].players.length, 'Still playing');
        
        // Split bank among winners
        uint sendToEachWinner = tournaments[currentTournamentIndex].bank / tournaments[currentTournamentIndex].winners.length;
            
        for(uint i=0; i < tournaments[currentTournamentIndex].winners.length;i++) {
            tournaments[currentTournamentIndex].winners[i].transfer(sendToEachWinner);
        }
        
        // Set the tournament as done
        tournaments[currentTournamentIndex].done = true;

    
        // Go to the next tournament in the array of tournaments
        currentTournamentIndex += 1;
    }
    
    // Compare hashes of strings
    function compareStringsbyBytes(string memory s1, string memory s2) private pure returns(bool){
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }
    
    // Player is participating in the tourney
    function participateInTourney(string memory _choice) payable public{
        require(msg.value == tournaments[currentTournamentIndex].minBet, 'The minimum bet is bigger than that');
        tournaments[currentTournamentIndex].playersChoice[msg.sender] = _choice;                                             // Answer selected by this player 
        tournaments[currentTournamentIndex].bank += msg.value;                        // Add value to the bank
        tournaments[currentTournamentIndex].participants[msg.sender] = true;         // Add this player as a participant
        tournaments[currentTournamentIndex].players.push(msg.sender);                // add to players array for counting
        
        // Find out if the Answer is correct
        if(compareStringsbyBytes(_choice,tournaments[currentTournamentIndex].correctResult)){
            tournaments[currentTournamentIndex].winners.push(msg.sender);            // Add participant as a winner
        }
           
    }
}