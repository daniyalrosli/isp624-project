from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('insurance_model.pkl')

# Initialize label encoder for region encoding
region_encoder = LabelEncoder()

# Fit the encoder with the possible regions (replace with actual regions)
regions = ['Southeast', 'Northeast', 'North', 'South']
region_encoder.fit(regions)

@app.route('/')
def home():
    return "Flask API is working!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json(force=True)

        # Ensure all required fields are present in the request
        required_fields = ['age', 'bmi', 'bloodpressure', 'children', 'smoker', 'region']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Missing field: {field}"}), 400

        # Validate region and encode it
        if data['region'] not in regions:
            return jsonify({'error': f"Invalid region: {data['region']}"}), 400

        region_encoded = region_encoder.transform([data['region']])[0]

        # Log to check encoding is correct
        print(f"Encoded region: {region_encoded}")

        # Prepare data for prediction
        input_data = np.array([[
            data['age'],
            data['bmi'],
            data['bloodpressure'],
            data['children'],
            1 if data['smoker'] == 'Yes' else 0,
            region_encoded
        ]])

        # Log input data for debugging
        print(f"Input data for prediction: {input_data}")

        # Predict using the model
        prediction = model.predict(input_data)

        # Format prediction as RM (Ringgit Malaysia)
        prediction_formatted = f"RM {prediction[0]:,.2f}"

        # Generate recommendations
        recommendations = generate_recommendations(data)

        return jsonify({
            'prediction': prediction_formatted,
            'recommendations': recommendations,
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

def generate_recommendations(data):
    recs = []
    if float(data['bmi']) > 25:
        recs.append("Consider consulting with a nutritionist to manage BMI levels.")
    if float(data['bloodpressure']) > 120:
        recs.append("Monitor blood pressure regularly and consult a healthcare provider.")
    if data['smoker'] == 'Yes':
        recs.append("Quitting smoking can significantly reduce insurance costs and improve health.")
    if int(data['age']) > 50:
        recs.append("Consider regular health check-ups to maintain overall wellness.")
    if int(data['children']) > 2:
        recs.append("Explore family-focused insurance plans for better coverage.")
    
    if not recs:
        recs.append("Keep maintaining your current healthy habits!")
    
    return recs

if __name__ == '__main__':
   app.run(port=5001)