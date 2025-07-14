import { TestQuestion } from "src/schema/course.test.schema";

export class UpdateTestDto {
  readonly title?: string;
  readonly testQuestions?: TestQuestion[];
}