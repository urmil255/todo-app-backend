import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const testConnection = await prisma.$connect();
    console.log('Prisma Client initialized successfully');
    await prisma.$disconnect();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
