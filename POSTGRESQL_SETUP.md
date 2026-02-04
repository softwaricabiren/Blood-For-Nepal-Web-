# PostgreSQL Database Setup Guide

## ✅ PostgreSQL Configuration Updated

Your application is now configured to use PostgreSQL instead of SQLite.

### 📋 Current Configuration

**Database URL**: `postgresql://postgres:password@localhost:5432/bloodfornepal?schema=public`

### 🔧 Setup Steps

#### Step 1: Verify PostgreSQL is Running
PostgreSQL service `postgresql-x64-17` is currently **RUNNING** ✅

#### Step 2: Update Database Credentials

Edit the `.env` file in the backend folder and update the DATABASE_URL with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/bloodfornepal?schema=public"
```

Replace:
- `USERNAME` - Your PostgreSQL username (default: `postgres`)
- `PASSWORD` - Your PostgreSQL password (the one you set during installation)

Common configurations:
```env
# Default PostgreSQL setup
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bloodfornepal?schema=public"

# Or if your password is different
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/bloodfornepal?schema=public"
```

#### Step 3: Create the Database

Open **pgAdmin 4** or **SQL Shell (psql)** and run:

```sql
CREATE DATABASE bloodfornepal;
```

**Or using psql command** (from PostgreSQL bin directory):
```powershell
# Find PostgreSQL installation (usually in C:\Program Files\PostgreSQL\17\bin)
cd "C:\Program Files\PostgreSQL\17\bin"
.\psql -U postgres -c "CREATE DATABASE bloodfornepal;"
```

#### Step 4: Run Migrations

After creating the database and updating credentials:

```powershell
cd "d:\Softwarica\Web Development\bfn\backend"
npx prisma migrate dev --name init_postgresql
```

#### Step 5: Generate Prisma Client

```powershell
npx prisma generate
```

#### Step 6: Recreate Admin Account

```powershell
node create-admin.js
```

#### Step 7: Restart Backend Server

```powershell
npm start
```

### 🔍 Troubleshooting

**Error: Can't reach database server**
- Check if PostgreSQL is running: `Get-Service postgresql-x64-17`
- Verify your username and password in DATABASE_URL
- Make sure port 5432 is not blocked

**Error: Database does not exist**
- Create the database using pgAdmin or psql
- Run: `CREATE DATABASE bloodfornepal;`

**Error: Password authentication failed**
- Update the PASSWORD in your DATABASE_URL
- Use the password you set during PostgreSQL installation

### 📊 View Data with Prisma Studio

```powershell
npx prisma studio
```

This opens a web interface at http://localhost:5555 to view and edit your database.

### 🔙 Rollback to SQLite (if needed)

If you want to go back to SQLite, update these files:

**prisma/schema.prisma**:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**.env**:
```env
DATABASE_URL="file:./dev.db"
```

Then run:
```powershell
npx prisma migrate dev --name back_to_sqlite
```
