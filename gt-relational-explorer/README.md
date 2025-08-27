# GT Relational Explorer

GT Relational Explorer is a modern, responsive internal admin app inspired by Forest Admin. It's designed for managing relational data across multiple entities (Users, Events, Orders, Licenses, etc.) with a focus on clean UI/UX, intelligent features, and role-based access control.

## Features

- **Responsive Layout**: Works on desktop and mobile devices
- **Sticky Headers & Collapsible Sidebars**: Improves navigation and usability
- **Global Search**: Quickly find data across entities
- **Smart Dashboards**: Summary cards and charts for key metrics
- **Role-Based Access Control**: Admin, Coordinator, and Viewer roles
- **CSV Export**: Export filtered views to CSV
- **Audit Logging**: Track changes with timestamps and user IDs
- **Toast Notifications**: Feedback for actions (save, delete, export)
- **Inline Relational Previews**: Show related records without leaving the page
- **Context-Aware Filtering**: Auto-suggest filters based on user role or recent activity

## Technology Stack

- **Frontend**: React with Tailwind CSS
- **State Management**: Context API
- **Routing**: React Router
- **Database**: PostgreSQL (via Prisma ORM)
- **Hosting**: Amazon RDS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/gt-relational-explorer.git
   cd gt-relational-explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/yourdatabase"
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/components/`: Reusable UI components
- `src/pages/`: Page components for different views
- `src/contexts/`: Context providers for state management
- `src/utils/`: Utility functions
- `public/`: Static assets

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by [Forest Admin](https://forestadmin.com/)
- Built with ❤️ using React, Tailwind CSS, and Prisma
