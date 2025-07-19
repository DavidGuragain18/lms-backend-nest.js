import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseLessonDto {
  @ApiProperty({ required: true })
  readonly title?: string;

  @ApiProperty({ required: true })
  readonly description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  readonly pdfUrl?: any; // Swagger will show this as a file input

  @ApiProperty({ required: true, type: Number })
  readonly pages?: number;

  @ApiProperty({ required: true, type: Number })
  readonly readingDuration?: number;

  @ApiProperty({ required: true, type: [String] })
  readonly keywords?: string[];
}
