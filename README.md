
# PickupKart Express Delivery

A fullstack courier service application built with React (frontend) and Spring Boot (backend).

## Features

- User authentication and role-based access control
- Customer profile management
- Courier booking with image upload
- Payment processing (mock implementation)
- Order tracking and management

## Tech Stack

### Frontend
- React.js
- TypeScript
- TailwindCSS
- shadcn/ui components
- React Router for navigation
- TanStack Query for data fetching

### Backend
- Spring Boot (Java)
- Spring MVC
- Spring Data JPA
- Spring Security
- RESTful APIs

### Database
- MySQL

## Project Structure

```
pickupkart/
├── frontend/                # React frontend application
│   ├── public/              # Public assets
│   ├── src/                 # Source files
│   │   ├── components/      # UI components
│   │   ├── context/         # React context (auth, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── types/           # TypeScript type definitions
│   └── package.json         # Frontend dependencies
├── backend/                 # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/        # Java source code
│   │   │   │   ├── controller/  # REST controllers
│   │   │   │   ├── model/       # Entity classes
│   │   │   │   ├── repository/  # Spring Data repositories
│   │   │   │   ├── service/     # Business logic
│   │   │   │   └── config/      # Configuration classes
│   │   │   └── resources/
│   │   │       ├── application.properties  # Application config
│   │   │       └── static/      # Static resources
│   │   └── test/              # Test code
│   └── pom.xml               # Maven build file
└── README.md                 # Project documentation
```

## Local Setup Instructions

### Prerequisites

- Java JDK 17 or later
- Maven 3.8 or later
- Node.js 16 or later
- MySQL 8.0 or later

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pickupkart.git
   cd pickupkart/backend
   ```

2. Configure the database:
   - Create a MySQL database named `pickupkart`
   - Update `src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/pickupkart
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on http://localhost:8080

4. Import sample data:
   - Run the SQL script in `backend/src/main/resources/data.sql` to load sample data (users, products, etc.)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API endpoint:
   - Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on http://localhost:5173

5. Build for production:
   ```bash
   npm run build
   ```

## API Documentation

The API documentation is available at `http://localhost:8080/swagger-ui.html` when the backend is running.

### Key API Endpoints

- **Authentication**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration

- **User Management**
  - `GET /api/users/{id}` - Get user details
  - `PUT /api/users/{id}` - Update user profile

- **Courier Services**
  - `GET /api/couriers` - List available courier services
  - `POST /api/orders` - Create a new courier booking

- **Orders**
  - `GET /api/orders` - List all orders (admin)
  - `GET /api/users/{userId}/orders` - List user orders
  - `GET /api/orders/{id}` - Get order details
  - `PUT /api/orders/{id}/status` - Update order status

- **Payments**
  - `POST /api/payments` - Process a payment
  - `GET /api/payments/{orderId}` - Get payment details for an order

## Test Accounts

| Username | Password | Role     |
|----------|----------|----------|
| admin    | admin    | ADMIN    |
| customer | customer | CUSTOMER |

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Lovable
- Icons from Lucide React
- UI components from shadcn/ui
