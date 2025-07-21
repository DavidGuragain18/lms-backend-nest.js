import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @ApiProperty({
    description: 'The title of the test',
    example: 'Introduction to TypeScript Test',
    required: true,
    type: String,
  })
  readonly title: string;

  @ApiProperty({
    description: 'The ID of the lesson this test belongs to',
    example: '687dfbe86be859bf15944438',
    required: true,
    type: String,
  })
  readonly lesson: string; // Lesson ID
}