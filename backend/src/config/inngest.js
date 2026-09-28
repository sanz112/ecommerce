
import { Inngest } from "inngest";
import connectDB from "./db.js";
import { User } from "../models/user.model.js";
// import { connectDB } from "./db.js";

export const inngest = new Inngest({
    id: "ecommerce-app",
  name: "E-commerce App",
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

const syncUser = inngest.createFunction(
  { id: "sync-user", name: "Sync User", event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    try {
      await connectDB();    
    const user = new User({
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        name: `${first_name} ${last_name}` || "User",
        imageUrl: image_url || "",
        addresses: [],
        wishlist: [],
      });
      await user.save();
      //await User.create(user)
      console.log("User synced successfully:", user);
    } catch (error) {
      console.error("Error syncing user:", error);
    }   
    }
);


const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user", name: "Delete User", event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    try {
      await connectDB();
        const deletedUser = await User.findOneAndDelete({ clerkId: id });
        if (deletedUser) {
            console.log("User deleted successfully:", deletedUser);
        } else {
            console.log("User not found for deletion:", id);
        }   
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    }
)  


export const functions = [syncUser, deleteUserFromDB];