-- CreateTable
CREATE TABLE "BloodRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientName" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "unitsNeeded" INTEGER NOT NULL,
    "hospital" TEXT NOT NULL,
    "province" TEXT,
    "city" TEXT,
    "contactName" TEXT,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'Normal',
    "additionalInfo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
