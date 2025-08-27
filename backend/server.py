from flask import Flask, jsonify, request
import pandas as pd
import os

app = Flask(__name__)

# Define the path to the Table Data folder
TABLE_DATA_PATH = "Table Data"

# Function to read Excel file
def read_excel_file(file_path):
    try:
        # Read only the first 1000 rows for performance
        df = pd.read_excel(file_path, nrows=1000)
        return df.to_dict(orient='records')
    except Exception as e:
        print(f"Error reading {file_path}: {str(e)}")
        return None

# Route to get all available sheets in the main dashboard file
@app.route('/api/sheets', methods=['GET'])
def get_sheets():
    try:
        # Look for the main dashboard file
        main_file = os.path.join(TABLE_DATA_PATH, "Graston_Technique_Dashboard.xlsx")
        if not os.path.exists(main_file):
            return jsonify({"error": "Main dashboard file not found"}), 404

        # Read the Excel file to get sheet names
        xls = pd.ExcelFile(main_file)
        sheet_names = xls.sheet_names
        return jsonify({"sheets": sheet_names})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get data from a specific sheet
@app.route('/api/sheet_data', methods=['GET'])
def get_sheet_data():
    try:
        sheet_name = request.args.get('sheet_name')
        if not sheet_name:
            return jsonify({"error": "Sheet name is required"}), 400

        main_file = os.path.join(TABLE_DATA_PATH, "Graston_Technique_Dashboard.xlsx")
        if not os.path.exists(main_file):
            return jsonify({"error": "Main dashboard file not found"}), 404

        data = read_excel_file(main_file)
        if data is None:
            return jsonify({"error": "Failed to read data from Excel file"}), 500

        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get data from a specific CSV file
@app.route('/api/csv_data', methods=['GET'])
def get_csv_data():
    try:
        csv_file = request.args.get('file_name')
        if not csv_file:
            return jsonify({"error": "CSV file name is required"}), 400

        file_path = os.path.join(TABLE_DATA_PATH, csv_file)
        if not os.path.exists(file_path):
            return jsonify({"error": "CSV file not found"}), 404

        # Read only the first 1000 rows for performance
        df = pd.read_csv(file_path, nrows=1000)
        data = df.to_dict(orient='records')
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)