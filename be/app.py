from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error
import json
from flask_cors import CORS
# from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app=app)

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        'message': 'Halaman tidak ditemukan'
    }), 404

@app.errorhandler(500)
def error_server(e):
    return jsonify({
        'message': 'Server error'
    }), 500

@app.route('/<symbol>/predict', methods=['GET'])
def predict(symbol):
    try:
        df = pd.read_csv(f'history/{symbol}.csv')

        X = df[['open', 'high', 'low', 'volume']]
        y = df['close']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        model = DecisionTreeRegressor(random_state=42)
        model.fit(X_train, y_train)    

        latest_data = df.iloc[0].to_dict()
        # latest_date = datetime.strptime(latest_data['date'], '%Y-%m-%d') + timedelta(days=1)
        latest_data_df = pd.DataFrame([latest_data])    
        
        predicted_price = model.predict(latest_data_df[['open', 'high', 'low', 'volume']])

        # get array of dataframe
        array_df = df.to_dict(orient='records')
        
        return jsonify({
            'message': 'berhasil',
            'data' : array_df,
            'predicted':predicted_price.tolist(),
        })
    except FileNotFoundError as e:
        return jsonify({
            'message': f'company dengan id:{symbol} tidak ditemukan'
        }), 404
    except Exception as e:
        return jsonify({
            'message': e.__str__()
        }), 500

@app.route('/<symbol>/profile', methods=['GET'])
def profile(symbol):
    try:
        df = pd.read_csv('top_gainer.csv')
        companies = json.loads(df['company'].to_json())
        company = {}

        for key, value in companies.items():
            companyData = json.loads(value.replace("'", '"'))
            if(companyData['symbol'].lower() == symbol.lower()):
                company = companyData
        
        return jsonify({
            'message': 'berhasil',
            'data' : company,
        })
    except FileNotFoundError as e:
        return jsonify({
            'message': f'company dengan id:{symbol} tidak ditemukan'
        }), 404
    except Exception as e:
        return jsonify({
            'message': e.__str__()
        }), 500


@app.route('/top_gainer', methods=['GET'])
def top_gainer():
    df = pd.read_csv('top_gainer.csv')
    array_data = df.to_dict(orient='records')

    for data in array_data:
        data['company'] = data['company'].replace("'",'"')
        data['company'] = json.loads(data['company'])
    
    return jsonify({
        'data': array_data,
    })


@app.route('/top_loser', methods=['GET'])
def top_loser():
    df = pd.read_csv('top_loser.csv')
    array_data = df.to_dict(orient='records')

    for data in array_data:
        data['company'] = data['company'].replace("'",'"')
        data['company'] = json.loads(data['company'])
    
    return jsonify({
        'data': array_data,
    })


if __name__ == '__main__':
    app.run(debug=True)