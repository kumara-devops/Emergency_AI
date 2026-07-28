from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

reports = []

@app.route("/")
def home():
    return jsonify({
        "message": "Backend Running"
    })


@app.route("/report", methods=["POST"])
def report():
    data = request.get_json()

    reports.append(data)

    print("Emergency Report Received")
    print(data)

    return jsonify({
        "message": "Emergency Report Sent Successfully"
    })


@app.route("/reports", methods=["GET"])
def get_reports():
    return jsonify(reports)


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    emergency = data.get("type", "")

    if emergency == "Medical Emergency":
        analysis = """
🚨 Severity: HIGH

✅ Immediate Actions
• Call 108 immediately.
• Keep the patient calm.
• Check breathing and pulse.

🩹 First Aid
• If unconscious, place the patient on their side.
• If not breathing, begin CPR if trained.
• Stop heavy bleeding using a clean cloth.

⚠️ Precautions
• Do not give food or water.
• Do not move the patient unless necessary.
"""

    elif emergency == "Fire Emergency":
        analysis = """
🚨 Severity: HIGH

✅ Immediate Actions
• Evacuate the building immediately.
• Call Fire Service (101).

🩹 Safety
• Stay low to avoid smoke.
• Use fire extinguisher only if safe.

⚠️ Precautions
• Never use lifts.
"""

    else:
        analysis = """
🚨 Severity: MEDIUM

Stay calm.

Call emergency services if needed.

Wait for professional medical help.
"""

    return jsonify({
        "analysis": analysis
    })


if __name__ == "__main__":
    app.run(debug=True)