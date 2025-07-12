export class CreateCourseLessonDto {
  readonly title: string;
  readonly description: string;
  readonly pdfUrl: string;
  readonly courseId: string;
  readonly pages?: number;
  readonly readingDuration?: number;
  readonly keywords?: string[];
}