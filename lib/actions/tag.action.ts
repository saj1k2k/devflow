'use server'

import {GetTopInteractedTagsParams} from "@/lib/actions/shared.types";
import {connectToDatabase} from "@/lib/mongoose";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams){
  try {
    connectToDatabase()
      const {userId} = params

      const user = await User.findById(userId)

      if(!user) throw new Error("user not found")

      // Find interactions for the user and group by tags...
      // Interaction
      return [{_id: "1", name: 'tag1'}, {_id: "2", name: 'tag2'}, {_id: "3", name: 'tag3'}]
  } catch (error) {
    console.log(error)
    throw error
  }
}