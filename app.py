from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas


app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('insurance_model.pkl')


# Path to save the generated report
REPORT_DIR = "reports"
os.makedirs(REPORT_DIR, exist_ok=True)

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

         # Generate and save the report as PDF
        report_filename = generate_pdf_report(data, prediction_formatted, recommendations)

        # Return the formatted prediction and recommendations
        return jsonify({
            'prediction': prediction_formatted,
            'recommendations': recommendations,
            'report_file': report_filename  # Provide the path to the generated PDF report
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict_trend', methods=['POST'])
def predict_trend():
    try:
        # Get data from request
        data = request.get_json(force=True)
        
        # Ensure required fields are present
        required_fields = ['bmi', 'bloodpressure', 'children', 'smoker', 'region']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Missing field: {field}"}), 400

        # Vary the 'age' feature over a range (18 to 80)
        age_range = np.arange(18, 80, 1)
        predictions = []

        # Generate predictions for each age in the range
        for age in age_range:
            input_data = np.array([[
                age,
                data['bmi'],
                data['bloodpressure'],
                data['children'],
                1 if data['smoker'] == 'Yes' else 0,  # Convert 'Yes'/'No' to 1/0
                data['region']
            ]])
            
            prediction = model.predict(input_data)
            predictions.append(prediction[0])

        # Return the predicted values over the range of ages
        return jsonify({
            'age_range': age_range.tolist(),
            'predictions': predictions
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

def generate_pdf_report(data, prediction, recommendations):
    """Generate a PDF report for the user using ReportLab."""
    # Define PDF file path
    report_filename = f"{REPORT_DIR}/report_{data['age']}_{data['smoker']}.pdf"
    
    # Create a canvas object to draw the PDF
    c = canvas.Canvas(report_filename, pagesize=letter)

    # Set up the PDF styles and text
    c.setFont("Helvetica", 12)

    # Add title to the report
    c.setFont("Helvetica-Bold", 16)
    c.drawString(200, 750, "Insurance Prediction Report")
    
    c.setFont("Helvetica", 12)
    c.drawString(30, 700, f"Age: {data['age']}")
    c.drawString(30, 680, f"BMI: {data['bmi']}")
    c.drawString(30, 660, f"Blood Pressure: {data['bloodpressure']}")
    c.drawString(30, 640, f"Children: {data['children']}")
    c.drawString(30, 620, f"Smoker: {data['smoker']}")
    c.drawString(30, 600, f"Region: {data['region']}")
    
    # Add prediction result
    c.setFont("Helvetica-Bold", 12)
    c.drawString(30, 580, f"Prediction: {prediction}")

    # Add recommendations
    c.setFont("Helvetica", 12)
    c.drawString(30, 560, "Recommendations:")
    
    y_position = 540
    for rec in recommendations:
        c.drawString(30, y_position, f"- {rec}")
        y_position -= 20

    # Save the PDF file
    c.save()

    return report_filename

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