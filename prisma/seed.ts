import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await hash("test", 12)
  const user = await prisma.user.upsert({
    where: { email: "timtb.dev@gmail.com" },
    update: {},
    create: {
      email: "timtb.dev@gmail.com",
      name: "Tim Tb",
      password,
    },
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
