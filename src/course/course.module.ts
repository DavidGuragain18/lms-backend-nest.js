import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
    controllers: [CourseController],
    providers: [CourseService],
    imports: []
})
export class CourseModule {
    
}
