import {
  Injectable,
  Inject,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Movie } from './movies.entity';
import { User } from '../users/users.entity';
import { MovieDto } from './dto/movie.dto';
import { MovieRepository } from './movies.repository';
import { MOVIES_REPOSITORY } from './movies.constants';
import { FilterDto } from './dto/filter.dto';
import { FilterSchema } from './interfaces/FilterSchema';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MovieRepository,
  ) {}
  /**
   * Handle creation of movie. Handles errors
   * @param user
   * @param movieDto
   */
  async createMovie(user: User, movieDto: MovieDto) {
    let movie: Movie;
    try {
      movie = await this.moviesRepository.createMovie(user, movieDto);
    } catch (error) {
      if ((error.code = 'ER_DUP_ENTRY')) {
        throw new ConflictException('That movie already exists.');
      } else {
        throw new InternalServerErrorException('Server error occured...');
      }
    }
    return movie;
  }

  /**
   * Prepare query params for search
   * @param filterDto
   */
  async findAll(filterDto: FilterDto) {
    //By default limit will be 10;
    const {
      limit,
      offset,
      search,
      orderBy,
      order,
      page,
      ids
    } = this.prepareFilterParams(filterDto);

    return this.moviesRepository.findAll({
      limit,
      offset,
      search,
      orderBy,
      order,
      page,
      ids
    });
  }

  /**
   * Find movies made
   * @param id
   * @param filterDto
   */
  findByUserId(id: number, filterDto: FilterDto, showUser = false) {
    const {
      limit,
      offset,
      search,
      orderBy,
      order,
      page,
      ids
    } = this.prepareFilterParams(filterDto);

    return this.moviesRepository.findByUserId(
      { limit, offset, search, orderBy, order, page, ids },
      id,
      showUser,
    );
  }

  /**
   * Uttility method that returns object according to FilterSchema interface
   * @param param0
   */
  private prepareFilterParams({
    limit: _limit,
    page: _page,
    search: _search,
    orderBy: _orderBy,
    order: _order,
    ids: _ids
  }: FilterDto): FilterSchema {
    const limit = _limit || 10;
    const page = _page || 1;
    const search = _search || null;
    const orderBy = _orderBy || null;
    const order = (_order ? _orderBy.toUpperCase() : null) as ('ASC' | 'DESC');
    const offset = (page - 1) * limit;
    const ids = _ids || null;

    return { limit, page, search, orderBy, order, offset, ids };
  }
}
