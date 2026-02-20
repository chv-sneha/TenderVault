import json

# Read the Firebase admin key
with open('firebase-admin-key.json', 'r') as f:
    firebase_data = json.load(f)

# Minify to single line
minified = json.dumps(firebase_data, separators=(',', ':'))

print("\n" + "="*80)
print("COPY THIS ENTIRE LINE FOR RENDER ENVIRONMENT VARIABLE")
print("="*80)
print("\nVariable Name: FIREBASE_CREDENTIALS")
print("\nVariable Value (copy everything below):\n")
print(minified)
print("\n" + "="*80)
print("\n📋 INSTRUCTIONS:")
print("1. Go to https://dashboard.render.com")
print("2. Click your service: tendervault-jdoj")
print("3. Go to Environment tab")
print("4. Click 'Add Environment Variable'")
print("5. Key: FIREBASE_CREDENTIALS")
print("6. Value: Paste the line above")
print("7. Click Save")
print("8. Wait 2 minutes for redeploy")
print("\n" + "="*80)
