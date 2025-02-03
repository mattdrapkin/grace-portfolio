// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "breen7800@gmail.com";
  const password = "password";
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      console.log(`Updated password for user: ${email}`);
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      console.log(`Created admin user: ${user}`);
    }

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
