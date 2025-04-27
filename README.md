# HomeBank - Personal Portfolio Project

A microservices-based banking application demonstrating modern software architecture and development practices.

## Architecture

The project consists of the following components:

### Backend Services
- **Identity.API**: OpenID Connect provider for authentication and authorization
- **Users.API**: Manages user profiles and personal information
- **Accounts.API**: Handles account balances, transactions, and account status

### Frontend
- Angular-based web application for user interface

### Database
- Microsoft SQL Server (running in Docker)

## Prerequisites

- .NET 8.0 SDK
- Docker and Docker Compose
- Node.js and npm
- Angular CLI

## Getting Started

1. Clone the repository
2. Start the database and services:
   ```bash
   docker-compose up -d
   ```
3. Run the backend services:
   ```bash
   dotnet run --project Identity.API
   dotnet run --project Users.API
   dotnet run --project Accounts.API
   ```
4. Start the frontend:
   ```bash
   cd frontend
   npm install
   ng serve
   ```

## API Endpoints

### Identity API
- POST /connect/token - OAuth2 token endpoint
- POST /connect/authorize - OAuth2 authorization endpoint

### Users API
- GET /api/users/{id} - Get user profile
- PUT /api/users/{id} - Update user profile

### Accounts API
- GET /api/accounts - Get user accounts
- GET /api/accounts/{id}/transactions - Get account transactions
- GET /api/accounts/{id}/balance - Get account balance

## Development

### Database Migrations
To create and apply database migrations:
```bash
dotnet ef migrations add InitialCreate --project Identity.API
dotnet ef database update --project Identity.API
```

### Testing
Run unit tests:
```bash
dotnet test
```

## License
MIT 