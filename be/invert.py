import pandas as pd

df = pd.read_csv('top_gainer.csv')
df = df[::-1]
df.to_csv('top_loser.csv', index=False)