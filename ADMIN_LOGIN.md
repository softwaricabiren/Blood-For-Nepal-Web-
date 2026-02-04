# 🔐 Admin Login Credentials

## Admin Panel Access

### Login Details:
- **Email**: `admin@bloodfornepal.com`
- **Password**: `Admin@123`

### How to Access:

1. **Go to Login Page**: 
   - Open http://localhost:5173
   - Click "Login" button in the top-right corner
   - Or go directly to http://localhost:5173/#login

2. **Login with Admin Credentials**:
   - Enter email: `admin@bloodfornepal.com`
   - Enter password: `Admin@123`
   - Click "Login"

3. **Access Admin Panel**:
   - After successful login, you'll see "Admin" link in the navigation bar
   - Click "Admin" to access the admin dashboard
   - Or go to http://localhost:5173/#admin

### Admin Panel Features:

#### 📊 Dashboard (`#admin`)
- View total users, requests, volunteers, and contacts
- See recent users and blood requests
- Quick navigation cards

#### 👥 User Management (`#admin-users`)
- View all registered users
- Search users by name or email
- Change user roles (promote/demote admin)
- Delete users
- Pagination support

#### 🩸 Blood Requests (`#admin-requests`)
- View all blood requests
- Filter by status (Pending, Matched, Completed, Cancelled)
- Filter by urgency (Emergency, High, Normal)
- Update request status
- Delete requests

#### 🤝 Volunteers (`#admin-volunteers`)
- View all volunteer registrations
- See volunteer contact details

#### 📧 Contact Messages (`#admin-contacts`)
- View all contact form submissions
- Read messages from users

### 🔧 Creating Additional Admins:

To make any existing user an admin:
```bash
cd "d:\Softwarica\Web Development\bfn\backend"
node make-admin.js user@example.com
```

To create a new admin from scratch:
```bash
cd "d:\Softwarica\Web Development\bfn\backend"
node create-admin.js
```

---

**Note**: Keep these credentials secure and change the password after first login in a production environment.
