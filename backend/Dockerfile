
FROM python:3.12-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the existing backend application
COPY . .

# Flask backend port
EXPOSE 5000

# Start the Flask application
CMD ["python", "-c", "from app import app; app.run(host='0.0.0.0', port=5000, debug=False)"]
