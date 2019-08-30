import { FilterDto } from '../dto//filter.dto';
export interface FilterSchema extends FilterDto {
  offset: number;
  order: 'ASC' | 'DESC';
}
