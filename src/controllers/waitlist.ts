import { db } from "@/drizzle.config"
import { waitlist } from "@/models/schema"

export async function allWaitlists() {
  try {
    const allWaitlist = await db.select().from(waitlist)
    return allWaitlist
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return { message: "Failed to fetch waitlist" }
  }
}

export async function addToWaitlist(email: string) {
  try {
    await db.insert(waitlist).values({ email })
    return { message: "Joined waitlist!" }
  } catch (error) {
    console.error("Error processing request:", error)
    return { message: "Failed to add to waitlist! " }
  }
}
