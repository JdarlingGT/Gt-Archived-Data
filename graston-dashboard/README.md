# Graston Dashboard Frontend

This React application displays data from the Graston Dashboard CSV files.

## Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the React development server:
```bash
npm start
```

3. Start the backend server (in a separate terminal):
```bash
cd backend
pip install -r requirements.txt
python server.py
```

## Features

- **User List**: Displays a table of all users from the users.csv file
- **Business List**: Displays a table of all businesses from the businesses.csv file
- **Event List**: Displays a table of all events from the events.csv file

## API Integration

The frontend fetches data from the backend API running on `http://localhost:5000`. The backend provides endpoints to access data from CSV files in the Table Data folder.

## File Structure

- `src/pages/UserListPage.jsx`: Component for displaying user data
- `src/pages/BusinessListPage.jsx`: Component for displaying business data
- `src/pages/EventListPage.jsx`: Component for displaying event data
- `src/components/Layout.jsx`: Main layout component
- `public/`: Static files like HTML, images, etc.
- `package.json`: Node.js dependencies and scripts