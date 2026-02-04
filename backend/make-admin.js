const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.log('Usage: node make-admin.js <email>');
    process.exit(1);
  }
  
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'admin' }
    });
    
    console.log(`✓ User ${user.email} is now an admin!`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
