import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Course } from "./course.schema";
import { CourseTest, courseTestSchema } from "./course.test.schema";

export type CourseLessonDocument = HydratedDocument<CourseLesson>;

export class CourseLesson {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pdfUrl: string; // URL to the PDF file

  @Prop()
  pages?: number; // Optional page count

  @Prop()
  readingDuration?: number; // Estimated reading time in minutes

    // Reference to the Course this lesson belongs to
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Course;

  @Prop({ type: [String] })
  keywords?: string[]; // Optional tags for the lesson

  @Prop({type: [courseTestSchema]})
  tests: CourseTest[];
}

export const courseLessonSchema = SchemaFactory.createForClass(CourseLesson)