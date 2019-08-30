import {
  IsOptional,
  IsIn,
  IsString,
  IsInt,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CustomArrayOneOfGenres } from '../../validators/arrayoneof.validator';

export class FilterDto {
  //Lowercased will be handled by tranaformation pipe
  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order: 'ASC' | 'DESC' | 'asc' | 'desc';

  @IsOptional()
  @IsIn(['name', 'description'])
  orderBy: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @Transform(page => parseInt(page), { toClassOnly: true })
  @IsInt()
  page: number;

  @IsOptional()
  @Transform(page => parseInt(page), { toClassOnly: true })
  @IsInt()
  limit: number;

  @IsOptional()
  @Transform(ids => {
    return ids.map(id => parseInt(id));
  })
  @Validate(CustomArrayOneOfGenres, [1, 2, 3, 4, 5])
  ids: number[]
}
