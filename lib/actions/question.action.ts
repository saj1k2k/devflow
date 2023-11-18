'use server'

import {conntectToDatabase} from "@/lib/mongoose";

export async function createQuestion(params: any) {
    try {
        conntectToDatabase();


    } catch (error) {

    }
}