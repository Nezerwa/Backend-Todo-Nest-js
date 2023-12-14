import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CategoryDto {
  @ApiProperty({
    example: 'Science and technology',
    required: true,
  })
  @IsString()
  name: string;
}
