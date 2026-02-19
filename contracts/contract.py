from algopy import (
    ARC4Contract,
    String,
    UInt64,
    GlobalState,
    Txn,
    Global,
    arc4,
)

class ClearBid(ARC4Contract):
    
    def __init__(self) -> None:
        # Tender info
        self.tender_id = GlobalState(String, key="tender_id")
        self.criteria_hash = GlobalState(String, key="criteria_hash")
        self.deadline = GlobalState(UInt64, key="deadline")
        self.status = GlobalState(String, key="status")
        self.creator = GlobalState(String, key="creator")
        self.winner = GlobalState(String, key="winner")
        self.total_bids = GlobalState(UInt64, key="total_bids")

    @arc4.abimethod(create="require")
    def create_tender(
        self,
        tender_id: String,
        criteria_hash: String,
        deadline: UInt64,
    ) -> String:
        # Store tender details on chain
        self.tender_id.value = tender_id
        self.criteria_hash.value = criteria_hash
        self.deadline.value = deadline
        self.status.value = String("OPEN")
        self.creator.value = String(Txn.sender)
        self.total_bids.value = UInt64(0)
        return String("Tender created and locked on Algorand")

    @arc4.abimethod
    def submit_bid(
        self,
        bid_hash: String,
        vendor_id: String,
    ) -> String:
        # Only accept bids before deadline
        assert Global.latest_timestamp < self.deadline.value, "Deadline passed"
        assert self.status.value == String("OPEN"), "Tender not open"
        # Increment bid count
        self.total_bids.value = self.total_bids.value + UInt64(1)
        return String("Bid hash stored on Algorand")

    @arc4.abimethod
    def reveal_and_close(self) -> String:
        # Close tender after deadline
        assert Global.latest_timestamp >= self.deadline.value, "Deadline not reached"
        assert self.status.value == String("OPEN"), "Already closed"
        self.status.value = String("CLOSED")
        return String("Tender closed. Criteria revealed.")

    @arc4.abimethod
    def declare_winner(
        self,
        winner_id: String,
        winner_score: String,
    ) -> String:
        # Only creator can declare winner
        assert String(Txn.sender) == self.creator.value, "Not authorized"
        assert self.status.value == String("CLOSED"), "Tender not closed"
        self.winner.value = winner_id
        self.status.value = String("AWARDED")
        return String("Winner declared on Algorand")

    @arc4.abimethod(readonly=True)
    def get_tender_info(self) -> String:
        return self.status.value