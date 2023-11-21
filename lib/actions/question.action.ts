'use server'

import {connectToDatabase} from "@/lib/mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import {CreateQuestionParams, GetQuestionsParams} from "@/lib/actions/shared.types";
import User from "@/database/user.model";
import {revalidatePath} from "next/cache";

export async function getQuestions(params: GetQuestionsParams){
    try {
        connectToDatabase();
        const questions = await Question.find({})
            .populate({path: 'tags', model: Tag})
            .populate({path: 'author', model: User})
            .sort({createdAt: -1})

        return {questions}
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase();

        const {title, content, tags, author, path} = params
        // create question
        const question = await Question.create({
            title, content, author
        })

        const tagDocument = [];
        // create tags or get them if they already exist
        for (const tag of tags) {
            const existiongTag = await Tag.findOneAndUpdate(
                {name: {$regex: new RegExp(`^${tag}$`, "i")}},
                {$setOnInsert: {name: tag}, $push: {question: question._id}},
                {upsert: true, new: true}
            )
            tagDocument.push(existiongTag._id)
        }
        await Question.findByIdAndUpdate(question._id, {
            $push: {tags: {$each: tagDocument}}
        })
        // Create an interaction record for the user's ask_question action

        // Increment author's reputation by +5 for creating a question
        revalidatePath(path)
    } catch (error) {

    }
}