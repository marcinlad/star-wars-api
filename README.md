# Star Wars API Project

## Overview
This project provides a Star Wars API service with PostgreSQL database integration using Docker.

## Prerequisites
- Node.js and npm installed
- Docker and Docker Compose installed

## Getting Started

### Installation
```bash
# Install dependencies
$ npm install
```

### Database Setup
The project uses PostgreSQL in Docker:

```bash
# Start Docker services
$ docker-compose up -d

# Stop Docker services
$ docker-compose down
```

#### Database Information
- **Database**: starwars
- **User/Password**: postgres/postgres
- **Host/Port**: localhost:5432
- **Schema**: Initialized from `init.sql` (includes table structure, seed data and some consideration comments)

#### Database Access
```bash
# Connect to the database CLI
$ docker exec -it starwars-postgres psql -U postgres -d starwars
```

### Running the Application

```bash
# Development mode
$ npm run start

# Watch mode (auto-reload)
$ npm run start:dev

# Production mode
$ npm run start:prod
```

### Testing

```bash
# Run unit tests
$ npm run test

# Run end-to-end tests
$ npm run test:e2e
```

## API Documentation
API documentation is available at `/docs`.
