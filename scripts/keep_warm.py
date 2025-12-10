"""
Cold Start Prevention Script for Vercel Serverless
Pings the API every 5 minutes to keep functions warm
"""
import requests
import time
import os
from datetime import datetime

# Your Vercel deployment URL (update after deploying)
API_URL = os.getenv('API_URL', 'https://your-app.vercel.app')

def ping_api():
    """Ping the health endpoint to keep function warm"""
    try:
        response = requests.get(f'{API_URL}/api/health', timeout=10)
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        if response.status_code == 200:
            print(f'[{timestamp}] ✓ Ping successful - Status: {response.status_code}')
            return True
        else:
            print(f'[{timestamp}] ⚠ Ping returned status: {response.status_code}')
            return False
    except requests.exceptions.RequestException as e:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f'[{timestamp}] ✗ Ping failed: {str(e)}')
        return False

def main():
    """Main loop - pings every 5 minutes"""
    print('='*50)
    print('Cold Start Prevention Script Started')
    print(f'Target: {API_URL}')
    print('Pinging every 5 minutes...')
    print('='*50)
    
    while True:
        ping_api()
        # Wait 5 minutes (300 seconds)
        time.sleep(300)

if __name__ == '__main__':
    # You can also run this as a cron job or GitHub Action
    # For local testing: python scripts/keep_warm.py
    main()
