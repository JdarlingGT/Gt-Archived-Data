@echo off
echo Testing entire application...

echo Testing API endpoints...
curl -s http://localhost:5000/api/sheets
curl -s http://localhost:5000/api/csv_data?file_name=users.csv | head -n 10
curl -s http://localhost:5000/api/csv_data?file_name=businesses.csv | head -n 10
curl -s http://localhost:5000/api/csv_data?file_name=events.csv | head -n 10

echo Testing frontend pages...
curl -s http://localhost:3000/users
curl -s http://localhost:3000/businesses
curl -s http://localhost:3000/events

echo Application tests completed.
pause