export class UpdateCourseLessonDto {
  readonly title?: string;
  readonly description?: string;
  readonly pdfUrl?: string;
  readonly pages?: number;
  readonly readingDuration?: number;
  readonly keywords?: string[];
}