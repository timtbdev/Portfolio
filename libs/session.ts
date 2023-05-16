import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
