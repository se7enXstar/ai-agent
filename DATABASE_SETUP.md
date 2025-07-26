# Database Setup Guide

This guide will help you set up the PostgreSQL database with Prisma for the ticket management system.

## Prerequisites

1. **PostgreSQL** installed and running
2. **Node.js** and **npm** installed
3. **Prisma CLI** (installed via npm)

## Database Schema

The system uses three main tables:

### 1. User Table
```sql
- id (String, Primary Key)
- username (String, Unique)
- createdAt (DateTime)
```

### 2. Category Table
```sql
- id (String, Primary Key)
- name (String, Unique)
- description (String, Optional)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### 3. Ticket Table
```sql
- id (String, Primary Key)
- title (String)
- description (String)
- summary (String, Optional)
- categoryId (String, Foreign Key to Category)
- userId (String, Foreign Key to User)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your database connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ticket_management?schema=public"
```

Replace `username`, `password`, and `ticket_management` with your actual PostgreSQL credentials and database name.

### 2. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push the schema to your database
npm run db:push

# Seed the database with initial data
npm run db:seed
```

### 3. Available Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio for database management

## API Endpoints

### Tickets
- `GET /api/tickets` - Get all tickets with pagination and filtering
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/[id]` - Get a specific ticket
- `PUT /api/tickets/[id]` - Update a ticket
- `DELETE /api/tickets/[id]` - Delete a ticket

### Categories
- `GET /api/categories` - Get all categories

## Sample Data

The seed script creates:

### Categories
- Hotel
- Restaurant
- Campaign
- Critical
- Feature Request
- Performance
- Security
- UI/UX
- Support

### Users
- admin
- user1
- user2

### Sample Tickets
10 sample tickets with various categories and descriptions

## Features Implemented

### ✅ Read Operations
- Fetch all tickets with pagination
- Search tickets by title, description, or summary
- Filter tickets by category
- Get individual ticket details

### ✅ Update Operations
- Edit ticket title, description, summary, and category
- Real-time updates in the UI
- Form validation

### ✅ Delete Operations
- Delete tickets with confirmation
- Automatic UI updates after deletion

### ✅ UI Features
- Responsive design
- Loading states
- Error handling
- Modal dialogs for view/edit
- Pagination controls
- Search and filtering

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **Prisma Client Error**
   - Run `npm run db:generate` after schema changes
   - Restart the development server

3. **Migration Issues**
   - Use `npm run db:push` for development
   - Use `npm run db:migrate` for production

### Development Tips

1. **Prisma Studio**: Use `npm run db:studio` to visually manage your database
2. **Hot Reload**: The Prisma client auto-reloads during development
3. **Logging**: Check browser console and server logs for errors

## Production Deployment

For production deployment:

1. Set up a production PostgreSQL database
2. Update DATABASE_URL in environment variables
3. Run `npm run db:migrate` to create production migrations
4. Run `npm run build` to build the application
5. Deploy with proper environment variables

## Security Considerations

- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Validate all input data
- Use HTTPS in production
- Regularly backup your database 