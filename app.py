from flask import Flask, request, jsonify, send_file
import joblib
import numpy as np
from flask_cors import CORS
import os
from reportlab.lib.pagesizes import letter
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

@app.route('/get_report/<filename>', methods=['GET'])
def get_report(filename):
    # Serve the generated PDF report
    filepath = os.path.join(REPORT_DIR, filename)
    if os.path.exists(filepath):
        return send_file(filepath, as_attachment=True)
    return jsonify({'error': 'Report not found'}), 404

def generate_pdf_report(data, prediction, recommendations):
    """Generate a PDF report for the user using ReportLab."""
    report_filename = f"report_{data['age']}_{data['smoker']}.pdf"  # Ensure it's a .pdf
    report_filepath = os.path.join(REPORT_DIR, report_filename)

    # Create a PDF canvas
    c = canvas.Canvas(report_filepath, pagesize=letter)
    width, height = letter  # Get the page dimensions

    # Add title to the PDF
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, height - 40, "Insurance Prediction Report")

    # Add the user's data to the PDF
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 80, f"Age: {data['age']}")
    c.drawString(100, height - 100, f"BMI: {data['bmi']}")
    c.drawString(100, height - 120, f"Blood Pressure: {data['bloodpressure']}")
    c.drawString(100, height - 140, f"Children: {data['children']}")
    c.drawString(100, height - 160, f"Smoker: {data['smoker']}")
    c.drawString(100, height - 180, f"Region: {data['region']}")

    # Add the prediction
    c.setFont("Helvetica-Bold", 12)
    c.drawString(100, height - 220, "Prediction:")
    c.setFont("Helvetica", 12)
    c.drawString(100, height - 240, f"Estimated Insurance Cost: {prediction}")

    # Add recommendations
    c.setFont("Helvetica-Bold", 12)
    c.drawString(100, height - 280, "Recommendations:")
    c.setFont("Helvetica", 12)

    y_position = height - 300
    for rec in recommendations:
        c.drawString(100, y_position, f"- {rec}")
        y_position -= 20

    # Save the PDF
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