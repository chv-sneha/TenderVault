from algosdk.v2client import algod
from algosdk import account, mnemonic, transaction
from algosdk.atomic_transaction_composer import AtomicTransactionComposer, AccountTransactionSigner, TransactionWithSigner
import os
from dotenv import load_dotenv
import base64

load_dotenv()

# Simple TEAL approval program for ClearBid
APPROVAL_PROGRAM = """
#pragma version 8
txn ApplicationID
int 0
==
bnz create
txn OnCompletion
int NoOp
==
bnz handle_noop
int 1
return
create:
int 1
return
handle_noop:
int 1
return
"""

CLEAR_PROGRAM = """
#pragma version 8
int 1
return
"""

def compile_program(client, source_code):
    compile_response = client.compile(source_code)
    return base64.b64decode(compile_response['result'])

def deploy():
    # Connect to testnet
    algod_address = "https://testnet-api.algonode.cloud"
    algod_token = ""
    algod_client = algod.AlgodClient(algod_token, algod_address)
    
    # Load deployer account
    deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
    if not deployer_mnemonic:
        raise ValueError("DEPLOYER_MNEMONIC not found in .env")
    
    deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
    deployer_address = account.address_from_private_key(deployer_private_key)
    
    print(f"Deploying ClearBid contract...")
    print(f"Deployer address: {deployer_address}")
    
    # Compile programs
    approval_program_compiled = compile_program(algod_client, APPROVAL_PROGRAM)
    clear_program_compiled = compile_program(algod_client, CLEAR_PROGRAM)
    
    # Get suggested params
    params = algod_client.suggested_params()
    
    # Create application
    global_schema = transaction.StateSchema(num_uints=3, num_byte_slices=5)
    local_schema = transaction.StateSchema(num_uints=0, num_byte_slices=0)
    
    txn = transaction.ApplicationCreateTxn(
        sender=deployer_address,
        sp=params,
        on_complete=transaction.OnComplete.NoOpOC,
        approval_program=approval_program_compiled,
        clear_program=clear_program_compiled,
        global_schema=global_schema,
        local_schema=local_schema
    )
    
    # Sign and send
    signed_txn = txn.sign(deployer_private_key)
    tx_id = algod_client.send_transaction(signed_txn)
    
    print(f"\nTransaction sent: {tx_id}")
    print("Waiting for confirmation...")
    
    # Wait for confirmation
    result = transaction.wait_for_confirmation(algod_client, tx_id, 4)
    app_id = result['application-index']
    
    print(f"\n✅ Contract deployed successfully!")
    print(f"App ID: {app_id}")
    print(f"Transaction ID: {tx_id}")
    print(f"\nView on Lora: https://lora.algokit.io/testnet/application/{app_id}")
    
    return app_id

if __name__ == "__main__":
    deploy()