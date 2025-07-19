import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseLessonDto {
  @ApiProperty({required: true, example: 'Introduction to TypeScript'})
  readonly title: string;

   @ApiProperty({required: true, example: 'A beginner-friendly course on TypeScript fundamentals.'})
  readonly description: string;

    @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  readonly pdfUrl?: any; // Swagger will show this as a file input

   @ApiProperty({required: true, example: 10})
  readonly readingDuration?: number;

   @ApiProperty({required: true, example: ['TypeScript']})
  readonly keywords?: string[];
}