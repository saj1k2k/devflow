'use server'

import {GetAllTagsParams, GetQuestionByIdParams, GetTopInteractedTagsParams} from "@/lib/actions/shared.types";
import {connectToDatabase} from "@/lib/mongoose";
import User from "@/database/user.model";
import Tag, {ITag} from "@/database/tag.model";
import {FilterQuery} from "mongoose";
import Question from "@/database/question.model";

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

export async function getAllTags(params: GetAllTagsParams){
  try {
    connectToDatabase()

    const tags = await Tag.find({})
    return {tags}
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionByIdParams){
  try {
    connectToDatabase()
    const {tagId, page=1, pageSize=10, searchQuery} = params

    const tagFilter: FilterQuery<ITag> = {_id: tagId}

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }
    const savedQuestion = user.saved;
    return { question: savedQuestion };

  } catch (error) {
    console.log(error)
    throw error
  }
}
