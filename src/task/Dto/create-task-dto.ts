import { IsOptional, IsString, IsUUID } from 'class-validator';
export class TaskDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsUUID()
  categoryId: string;
}
