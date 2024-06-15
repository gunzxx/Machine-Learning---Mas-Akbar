import requests
from flask import jsonify
import pandas as pd
from urllib.parse import urlencode

baseURL= 'https://api.goapi.io/stock/idx'
apiKey1 = '7ac9bfd9-d395-5f6c-6c20-41ac4243' #www-1
apiKey2 = '1313d7e7-b409-5ab0-1bba-32e1d203' #www-2
apiKey3 = 'bffbf3f2-5218-5e50-3f36-8c2a21f6' #ggm
apiKey4 = 'd6204f51-07c3-5e0a-355f-f4a66e66' #ujicoba

def getData(endpoint = '', query = {}, body = {}, headers = {}, export:bool = False, export_name = 'export.csv'):
    try:
        url = f"{baseURL}/{endpoint}?{urlencode(query)}"

        headers['X-API-KEY'] = apiKey4

        response = requests.get(url=url, headers=headers, data=body)
        response.raise_for_status()
        df = pd.DataFrame(response.json()['data']['results'])
        if export == True:
            df.to_csv(f'{export_name}.csv', index=False)
        return response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500