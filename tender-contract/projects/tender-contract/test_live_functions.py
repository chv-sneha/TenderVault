"""Test all smart contract functions on testnet"""
import os
from algosdk.v2client import algod
from algosdk import transaction, mnemonic, account
from algosdk.abi import Contract, Method
from algosdk.atomic_transaction_composer import (
    AtomicTransactionComposer,
    AccountTransactionSigner,
    TransactionWithSigner
)
from dotenv import load_dotenv
import json

load_dotenv('.env.testnet')

# Connect to testnet
algod_client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")

# Get deployer account
deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
deployer_address = account.address_from_private_key(deployer_private_key)

APP_ID = 755804223

print(f"Testing App ID: {APP_ID}")
print(f"Using account: {deployer_address}\n")

# Load ARC56 contract
with open("smart_contracts/hello_world/smart_contracts/artifacts/hello_world/HelloWorld.arc56.json", "r") as f:
    arc56 = json.load(f)

# Create contract object
contract = Contract.from_json(json.dumps(arc56))

# Test 1: store_tender_hash
print("=" * 60)
print("TEST 1: store_tender_hash")
print("=" * 60)
try:
    atc = AtomicTransactionComposer()
    signer = AccountTransactionSigner(deployer_private_key)
    sp = algod_client.suggested_params()
    
    atc.add_method_call(
        app_id=APP_ID,
        method=contract.get_method_by_name("store_tender_hash"),
        sender=deployer_address,
        sp=sp,
        signer=signer,
        method_args=["TENDER001", "abc123hash"]
    )
    
    result = atc.execute(algod_client, 4)
    return_value = result.abi_results[0].return_value
    print(f"SUCCESS: {return_value}")
    print(f"Transaction: https://testnet.algoexplorer.io/tx/{result.tx_ids[0]}\n")
except Exception as e:
    print(f"FAILED: {e}\n")

# Test 2: store_bid_hash
print("=" * 60)
print("TEST 2: store_bid_hash")
print("=" * 60)
try:
    atc = AtomicTransactionComposer()
    signer = AccountTransactionSigner(deployer_private_key)
    sp = algod_client.suggested_params()
    
    atc.add_method_call(
        app_id=APP_ID,
        method=contract.get_method_by_name("store_bid_hash"),
        sender=deployer_address,
        sp=sp,
        signer=signer,
        method_args=["BID001", "TENDER001", "def456hash"]
    )
    
    result = atc.execute(algod_client, 4)
    return_value = result.abi_results[0].return_value
    print(f"SUCCESS: {return_value}")
    print(f"Transaction: https://testnet.algoexplorer.io/tx/{result.tx_ids[0]}\n")
except Exception as e:
    print(f"FAILED: {e}\n")

# Test 3: verify_hash
print("=" * 60)
print("TEST 3: verify_hash")
print("=" * 60)
try:
    atc = AtomicTransactionComposer()
    signer = AccountTransactionSigner(deployer_private_key)
    sp = algod_client.suggested_params()
    
    atc.add_method_call(
        app_id=APP_ID,
        method=contract.get_method_by_name("verify_hash"),
        sender=deployer_address,
        sp=sp,
        signer=signer,
        method_args=["TENDER001", "abc123hash"]
    )
    
    result = atc.execute(algod_client, 4)
    return_value = result.abi_results[0].return_value
    print(f"SUCCESS: {return_value}")
    print(f"Transaction: https://testnet.algoexplorer.io/tx/{result.tx_ids[0]}\n")
except Exception as e:
    print(f"FAILED: {e}\n")

print("=" * 60)
print("ALL TESTS COMPLETED")
print("=" * 60)
print(f"View app on explorer: https://testnet.algoexplorer.io/application/{APP_ID}")
