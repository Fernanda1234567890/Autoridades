import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

    @Get('/seed')
  seedUnits() {
    return this.studentService.seed();
  }


  @Get(':ru')
  findOne(@Param('ru') ru: number) {
    return this.studentService.findOne({ru});
  }

  @Patch(':ru')
  update(@Param('ru') ru: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(ru, updateStudentDto);
  }

  @Delete(':ru')
  remove(@Param('iru') ru: number) {
    return this.studentService.remove(ru);
  }
}
