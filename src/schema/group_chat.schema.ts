import { Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { LessonTest } from "./lesson.test.schema";

export type GroupChatDocument = HydratedDocument<LessonTest>;

@Schema()
export class GroupChat{

}