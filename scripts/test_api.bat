@echo off
echo Testing API endpoints...

echo Testing /api/sheets endpoint...
curl -s http://localhost:5000/api/sheets

echo Testing /api/csv_data endpoint for users.csv...
curl -s http://localhost:5000/api/csv_data?file_name=users.csv | head -n 10

echo Testing /api/csv_data endpoint for businesses.csv...
curl -s http://localhost:5000/api/csv_data?file_name=businesses.csv | head -n 10

echo Testing /api/csv_data endpoint for events.csv...
curl -s http://localhost:5000/api/csv_data?file_name=events.csv | head -n 10

echo API tests completed.
pause