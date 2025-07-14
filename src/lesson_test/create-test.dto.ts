import { TestQuestion } from "src/schema/course.test.schema";

export class CreateTestDto {
  readonly title: string;
  readonly lesson: string; // Lesson ID
  readonly testQuestions: TestQuestion[];
}