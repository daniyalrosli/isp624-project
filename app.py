from flask import Flask, request, jsonify, send_file
import joblib
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('insurance_model.pkl')



@app.route('/')
def home():
    return "Flask API is working!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json(force=True)
        
        # Log the received data
        print(f"Received data: {data}")

        # Ensure all required fields are present in the request
        required_fields = ['age', 'bmi', 'bloodpressure', 'children', 'smoker', 'region']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Missing field: {field}"}), 400

        # Process data for prediction
        input_data = np.array([[
            data['age'],
            data['bmi'],
            data['bloodpressure'],
            data['children'],
            1 if data['smoker'] == 'Yes' else 0,  # Convert 'Yes'/'No' to 1/0
            data['region']
        ]])

        # Predict using the model
        prediction = model.predict(input_data)

        # Format prediction as RM (Ringgit Malaysia)
        prediction_formatted = f"RM {prediction[0]:,.2f}"

        # Generate recommendations
        recommendations = generate_recommendations(data)

       

        # Return the formatted prediction and recommendations
        return jsonify({
            'prediction': prediction_formatted,
            'recommendations': recommendations,
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400




def generate_recommendations(data):
    """Generate recommendations based on user input."""
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