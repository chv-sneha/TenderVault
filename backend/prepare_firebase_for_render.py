import json
import os

# Read firebase-admin-key.json
firebase_key_path = os.path.join(os.path.dirname(__file__), 'firebase-admin-key.json')

if not os.path.exists(firebase_key_path):
    print("❌ firebase-admin-key.json not found!")
    print("Make sure the file exists in the backend folder")
    exit(1)

with open(firebase_key_path, 'r') as f:
    firebase_data = json.load(f)

# Minify to single line
minified = json.dumps(firebase_data, separators=(',', ':'))

print("\n" + "="*60)
print("FIREBASE_CREDENTIALS for Render")
print("="*60)
print("\nCopy this ENTIRE line and paste as environment variable:\n")
print(minified)
print("\n" + "="*60)
print("\n✅ Copy the line above and use it in Render dashboard")
print("   as the value for FIREBASE_CREDENTIALS variable\n")
