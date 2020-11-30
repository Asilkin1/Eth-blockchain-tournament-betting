const BetContract = artifacts.require("./contract/Bet.sol");

contract("Bet" , async () => {

    let instance;                   // Instance of the contract
    let getCurrentTournament;       // Current tournament

    beforeEach("setup contract before each test", async () => {
        instance = await BetContract.deployed();
        getCurrentTournament = await instance.getCurrentTournament(0);

    });
    
    it("should return 6 predefind tournaments", async () => {
        let tournamentCount = await instance.getTournamentsCount();
        assert.equal(tournamentCount.valueOf(),6,"Number of tournaments is equal to 6");
    });

    it("player 1 should participate in a tournament", async () =>{
        await instance.participateInTourney('Loto');
          
    });

    it("player one gave an incorect answer, hence not listed in the winners array", async () => {
        assert.isEmpty(getCurrentTournament.winners);
    });

    it("player 2 should participate in a tournament and gave a right answer", async () => {
        await instance.participateInTourney('Isurus');
    });

    it("player 2 is listed as a winner in the winners array", async() => {
        assert.isNotEmpty(getCurrentTournament.winners);
    });

});
