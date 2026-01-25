# Blood for Nepal Web Application

A comprehensive blood donation platform connecting donors with patients in need across Nepal.

## Features

### User Management
- **User Registration** - Users can register with their details including blood group and province
- **User Login** - Secure authentication with JWT tokens
- **User Profile** - View and manage personal information
- **Profile Update** - Users can update their details

### Blood Request System
- **Submit Blood Requests** - Request blood for patients with detailed information
  - Patient details
  - Blood group and units needed
  - Hospital and location
  - Contact information
  - Urgency level (Emergency, Urgent, Normal)
- **View Blood Requests** - Browse all blood requests with filters
- **Update Request Status** - Track request progress

### Donor Search
- **Search Donors** - Find blood donors by:
  - Blood group (required)
  - Province (optional)
- **View Donor Profiles** - See available donors with contact information
- **Donor Registration** - Register as a blood donor

### Volunteer Management
- **Volunteer Registration** - Join as a volunteer
- **Volunteer Network** - Connect with other volunteers

### Contact & Support
- **Contact Form** - Send messages to the organization
- **About Page** - Learn about the organization, mission, and impact

### Statistics Dashboard
- **Real-time Stats** - View:
  - Total registered donors
  - Lives saved
  - Blood drives organized
  - Provinces covered

## Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **React Router** (hash-based routing)
- **React Icons** - Icon library
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database ORM
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Database Schema

### Models
1. **User** - Registered users/donors
   - id, name, email, password (hashed)
   - phone, bloodGroup, province
   - createdAt, updatedAt

2. **BloodRequest** - Blood requests
   - id, patientName, bloodGroup, unitsNeeded
   - hospital, province, city
   - contactName, contactPhone, contactEmail
   - urgency, additionalInfo, status
   - userId (optional, if logged in)
   - createdAt, updatedAt

3. **Volunteer** - Volunteer registrations
   - id, name, email, phone, location
   - createdAt

4. **Contact** - Contact form submissions
   - id, name, email, message
   - createdAt

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/me` - Get current user (protected)
- `PUT /api/me` - Update user profile (protected)

### Blood Requests
- `POST /api/blood-requests` - Create blood request
- `GET /api/blood-requests` - Get all blood requests (with filters)
- `GET /api/blood-requests/:id` - Get specific blood request
- `PATCH /api/blood-requests/:id` - Update request status (protected)
- `GET /api/me/blood-requests` - Get user's blood requests (protected)

### Donor Search
- `GET /api/donors/search?bloodGroup=A+&province=Bagmati` - Search donors

### Volunteers
- `POST /api/volunteer` - Register as volunteer

### Contact
- `POST /api/contact` - Submit contact form

### Statistics
- `GET /api/stats` - Get platform statistics

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL="file:./dev.db"
```

## Pages

1. **Home** (`/` or `#`) - Landing page with hero, features, and call-to-action
2. **Register** (`#register`) - User registration form
3. **Login** (`#login`) - User login form
4. **Profile** (`#profile`) - User profile page (protected)
5. **Request Blood** (`#request`) - Blood request form
6. **Find Donors** (`#donor`) - Donor search page
7. **About** (`#about`) - About the organization

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Token expiration (7 days)
- Protected routes for sensitive operations
- Input validation on both frontend and backend
- CORS configuration for allowed origins

## Future Enhancements

- Email notifications for blood requests
- SMS notifications
- Admin dashboard for managing requests
- Blood donation history tracking
- Appointment scheduling
- Mobile app
- Multi-language support
- Blood bank inventory management
- Emergency alert system

## Contributing

This is a student project for Softwarica College. Contributions are welcome!

## License

MIT License
