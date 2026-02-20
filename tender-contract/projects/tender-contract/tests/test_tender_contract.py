"""Tests for TenderVault Smart Contract"""
import pytest
from algokit_utils import get_localnet_default_account
from algokit_utils.config import config
from algopy_testing import AlgopyTestContext, algopy_testing_context

from smart_contracts.hello_world.contract import HelloWorld


@pytest.fixture
def context() -> AlgopyTestContext:
    """Create test context"""
    return algopy_testing_context()


def test_store_tender_hash(context: AlgopyTestContext) -> None:
    """Test storing tender hash"""
    contract = HelloWorld()
    
    result = contract.store_tender_hash("TENDER001", "abc123hash")
    
    assert "Tender stored: TENDER001" in result
    assert "Hash: abc123hash" in result


def test_store_bid_hash(context: AlgopyTestContext) -> None:
    """Test storing bid hash"""
    contract = HelloWorld()
    
    result = contract.store_bid_hash("BID001", "TENDER001", "def456hash")
    
    assert "Bid stored: BID001" in result
    assert "for Tender: TENDER001" in result


def test_verify_hash(context: AlgopyTestContext) -> None:
    """Test hash verification"""
    contract = HelloWorld()
    
    result = contract.verify_hash("TENDER001", "abc123hash")
    
    assert "Verified: TENDER001" in result
    assert "matches hash: abc123hash" in result


def test_multiple_operations(context: AlgopyTestContext) -> None:
    """Test multiple tender and bid storage operations"""
    contract = HelloWorld()
    
    # Store multiple tenders
    contract.store_tender_hash("TENDER001", "hash1")
    contract.store_tender_hash("TENDER002", "hash2")
    
    # Store multiple bids
    contract.store_bid_hash("BID001", "TENDER001", "bidhash1")
    contract.store_bid_hash("BID002", "TENDER001", "bidhash2")
    
    # Verify operations completed
    assert True  # If no errors, test passes
