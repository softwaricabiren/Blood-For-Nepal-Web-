# Admin Panel Setup Guide

## ✅ Completed Features

### 1. **Login Data Fetch - FIXED**
- Added `role` field to User model in database schema
- Updated all authentication endpoints (login, register, /api/me) to include user role
- User data now properly fetches after login with role information

### 2. **Admin Panel - COMPLETE**
Created comprehensive admin dashboard with 5 sections:

#### **Admin Dashboard** (`#admin`)
- Overview statistics (users, requests, volunteers, contacts)
- Recent users and blood requests tables
- Quick navigation cards to other admin sections

#### **User Management** (`#admin-users`)
- View all registered users with pagination
- Search users by name or email
- Change user roles (user ↔ admin)
- Delete users
- 20 users per page

#### **Blood Requests Management** (`#admin-requests`)
- View all blood requests with filters
- Filter by status (pending, matched, completed, cancelled)
- Filter by urgency (emergency, high, normal)
- Update request status inline
- Delete blood requests
- Pagination support

#### **Volunteers Management** (`#admin-volunteers`)
- View all volunteer registrations
- See volunteer details (name, email, phone, location)
- Pagination for large datasets

#### **Contact Messages** (`#admin-contacts`)
- View all contact form submissions
- See message details with sender info
- Organized by date

## 🚀 How to Access Admin Panel

### Step 1: Create an Admin User

Run this command in a new terminal:

\`\`\`bash
cd "d:\Softwarica\Web Development\bfn\backend"
node make-admin.js your-email@example.com
\`\`\`

Replace `your-email@example.com` with the email of the user you want to make an admin. The user must already be registered.

Example:
\`\`\`bash
node make-admin.js john@example.com
\`\`\`

Output:
\`\`\`
✓ User john@example.com is now an admin!
\`\`\`

### Step 2: Login with Admin Account

1. Go to http://localhost:5173
2. Click "Login" in the navigation bar
3. Enter the admin user's email and password
4. After login, you'll see "Admin" link in the navigation

### Step 3: Access Admin Panel

Click the **"Admin"** link in the navigation bar (only visible to admin users) or navigate to:
- http://localhost:5173/#admin - Dashboard
- http://localhost:5173/#admin-users - Manage Users
- http://localhost:5173/#admin-requests - Manage Blood Requests
- http://localhost:5173/#admin-volunteers - View Volunteers
- http://localhost:5173/#admin-contacts - View Messages

## 🎨 Admin Panel Features

### Dashboard Features:
- **Statistics Cards**: Total counts for users, requests, volunteers, and contacts
- **Recent Activity**: Quick view of latest users and blood requests
- **Navigation Cards**: Easy access to all admin sections

### User Management Features:
- **Search**: Find users by name or email
- **Role Management**: Toggle between user and admin roles
- **User Deletion**: Remove users from the system
- **Pagination**: Navigate through large user lists

### Request Management Features:
- **Status Filters**: View requests by status (pending/matched/completed/cancelled)
- **Urgency Filters**: Filter by urgency level (emergency/high/normal)
- **Inline Editing**: Update request status directly from the table
- **Color Coding**: Visual badges for blood types, urgency, and status

### Authorization:
- All admin routes are protected
- Only users with `role: "admin"` can access admin panel
- Backend validates admin role for all admin API endpoints
- Non-admin users cannot see or access admin features

## 🔧 Technical Details

### Backend Admin API Endpoints:
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - List all users (with search & pagination)
- `PATCH /api/admin/users/:id/role` - Change user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/blood-requests` - List requests (with filters & pagination)
- `PATCH /api/admin/blood-requests/:id` - Update request status
- `DELETE /api/admin/blood-requests/:id` - Delete request
- `GET /api/admin/volunteers` - List volunteers
- `GET /api/admin/contacts` - List contact messages

### Admin Middleware:
\`\`\`javascript
const authenticateAdmin = async (req, res, next) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
\`\`\`

All admin routes use: `authenticateToken` + `authenticateAdmin`

## 📊 Database Schema Changes

Added `role` field to User model:
\`\`\`prisma
model User {
  id          Int       @id @default(autoincrement())
  name        String
  email       String    @unique
  password    String
  phone       String?
  bloodGroup  String?
  province    String?
  role        String    @default("user")  // NEW FIELD
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
\`\`\`

Default role is "user". Use the `make-admin.js` script to promote users to admin.

## 🎯 Next Steps

1. Register a user account at http://localhost:5173/#register
2. Promote that user to admin using the `make-admin.js` script
3. Login and explore the admin panel
4. Test all admin features:
   - View statistics
   - Manage users and roles
   - Update blood request statuses
   - View volunteers and contact messages

## 🐛 Troubleshooting

**Issue**: Can't see Admin link after login
- **Solution**: Make sure the user's role is set to "admin" in the database using the make-admin.js script

**Issue**: "Admin access required" error
- **Solution**: The backend is checking user role. Ensure you're logged in as an admin user

**Issue**: Data not loading in admin panel
- **Solution**: Check that backend is running on port 5000 and database has data

**Issue**: Changes not reflected immediately
- **Solution**: Refresh the page or navigate to a different section and back

---

**All features are now complete and working!** 🎉
