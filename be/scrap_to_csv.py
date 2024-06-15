import pandas as pd
import json
from util.api import getData

response = getData('top_gainer')['data']['results']
databaru = []

for i in range(len(response)):
    if(i>=97): break
    databaru.append(response[i])

df = pd.DataFrame(databaru)
df.to_csv('top_gainer.csv', index=False)

df_invert = df[::-1]
df_invert.to_csv('top_loser.csv', index=False)

symbols = json.loads(df.to_json())['symbol']

for key, value in symbols.items():
    getData(endpoint=f'{value}/historical', export=True, export_name=f'history/{value}')
    print(value)
