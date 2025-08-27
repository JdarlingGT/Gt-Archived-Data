@echo off
echo Testing frontend...

echo Testing UserListPage...
curl -s http://localhost:3000/users

echo Testing BusinessListPage...
curl -s http://localhost:3000/businesses

echo Testing EventListPage...
curl -s http://localhost:3000/events

echo Frontend tests completed.
pause