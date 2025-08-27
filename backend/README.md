# Graston Dashboard Backend

This backend service provides API endpoints to access data from the Graston Dashboard Excel files and CSV files.

## Setup

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

1. Run the Flask server:

```bash
python server.py
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Get Available Sheets in Main Dashboard

- **URL**: `/api/sheets`
- **Method**: GET
- **Description**: Returns a list of available sheets in the main dashboard Excel file.
- **Response**:

  ```json
  {
    "sheets": ["Sheet1", "Sheet2", "Sheet3"]
  }
  ```

### Get Data from a Specific Sheet

- **URL**: `/api/sheet_data`
- **Method**: GET
- **Parameters**:
  - `sheet_name` (required): Name of the sheet to retrieve data from
- **Description**: Returns data from the specified sheet in the main dashboard Excel file.
- **Response**:

  ```json
  {
    "data": [
      {"column1": "value1", "column2": "value2"},
      {"column1": "value3", "column2": "value4"}
    ]
  }
  ```

### Get Data from a CSV File

- **URL**: `/api/csv_data`
- **Method**: GET
- **Parameters**:
  - `file_name` (required): Name of the CSV file to retrieve data from (without path)
- **Description**: Returns data from the specified CSV file in the Table Data folder.
- **Response**:

  ```json
  {
    "data": [
      {"column1": "value1", "column2": "value2"},
      {"column1": "value3", "column2": "value4"}
    ]
  }
  ```
