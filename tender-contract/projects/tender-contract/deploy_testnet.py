import os
import base64
from algosdk.v2client import algod
from algosdk import transaction, mnemonic, account
from dotenv import load_dotenv

load_dotenv('.env.testnet')

# Connect to testnet
algod_client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")

# Get deployer account
deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
deployer_address = account.address_from_private_key(deployer_private_key)

print(f"Deploying from: {deployer_address}")

# Read TEAL files
with open("smart_contracts/artifacts/hello_world/approval.teal", "r") as f:
    approval_program = f.read()

with open("smart_contracts/artifacts/hello_world/clear.teal", "r") as f:
    clear_program = f.read()

# Compile programs
approval_result = algod_client.compile(approval_program)
clear_result = algod_client.compile(clear_program)

approval_binary = base64.b64decode(approval_result['result'])
clear_binary = base64.b64decode(clear_result['result'])

print("Programs compiled")

# Create application
params = algod_client.suggested_params()

txn = transaction.ApplicationCreateTxn(
    sender=deployer_address,
    sp=params,
    on_complete=transaction.OnComplete.NoOpOC,
    approval_program=approval_binary,
    clear_program=clear_binary,
    global_schema=transaction.StateSchema(2, 0),  # 2 uint64 for counters
    local_schema=transaction.StateSchema(0, 0),
)

# Sign and send
signed_txn = txn.sign(deployer_private_key)
tx_id = algod_client.send_transaction(signed_txn)

print(f"Transaction ID: {tx_id}")
print("Waiting for confirmation...")

# Wait for confirmation
result = transaction.wait_for_confirmation(algod_client, tx_id, 4)
app_id = result['application-index']

print(f"\nSUCCESS! App deployed to testnet!")
print(f"App ID: {app_id}")
print(f"Explorer: https://testnet.algoexplorer.io/application/{app_id}")
