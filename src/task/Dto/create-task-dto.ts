import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
export class TaskDto {
  @ApiProperty({
    example: 'Learning Back-end',
    required: true,
  })
  @IsString()
  title: string;
  @ApiProperty({
    example:
      'learning backend development with nestj framework and  creating restful api',
    required: true,
  })
  @IsString()
  description: string;
  @ApiProperty({
    example: 'bafda1ee-812a-4969-9108-7392006cfbb0',
    required: true,
  })
  @IsUUID()
  categoryId: string;
}
