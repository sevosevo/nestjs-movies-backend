import {
  Inject,
  Get,
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Query,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { MOVIES_REPOSITORY } from './movies.constants';
import { MovieRepository } from './movies.repository';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import { GetUser } from '../decorators/user.decorator';
import { User } from '../users/users.entity';
import { MovieDto } from './dto/movie.dto';
import { FilterDto } from './dto/filter.dto';
import { makeCacheInterceptor } from '../interceptors/cache.interceptor'

@Controller('api/movies')
export class MoviesController {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: MovieRepository,
    private readonly moviesService: MoviesService,
  ) {}

  /**
   * Gets all movies. Filter/Sort movies...
   */
  @UseInterceptors(makeCacheInterceptor({ttl: 240, getKey: (request:Request) => request.url}))
  @Get()
  getMovies(
    @Query(new ValidationPipe({ transform: true })) filterDto: FilterDto,
  ): Promise<Movie[]> {
    console.log(filterDto);
    return this.moviesService.findAll(filterDto);
  }
  /**
   * Add movie. User must be authenticated
   * @param user
   * @param movieDto
   */

  @Post()
  @UseGuards(AuthGuard('jwtAuth'))
  createMovie(
    @GetUser() user: User,
    @Body(new ValidationPipe()) movieDto: MovieDto,
  ): Promise<Movie> {
    return this.moviesService.createMovie(user, movieDto);
  }

  /**
   * For this route we don't need service  becacuse we are just taking id and doing simple query
   * @param user
   * @param id
   */
  @UseInterceptors(makeCacheInterceptor({ttl: 240, getKey: (request:Request) => {console.log(request.url); return request.url}}))
  @Get('user/:id')
  async getMoviesFromUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Query(new ValidationPipe()) filterDto: FilterDto,
  ) {
    const movies = await this.moviesService.findByUserId(id, filterDto);
    return movies || {};
  }

  /**
   * Get movie with user id and get  basic info about user
   * @param id
   * @param filterDto
   */
  @UseInterceptors(makeCacheInterceptor({ttl: 240, getKey: (request:Request) => request.url}))
  @Get('user/:id/withUser')
  async getMoviesFromUserWithUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Query(new ValidationPipe()) filterDto: FilterDto,
  ) {
    const movies = await this.moviesService.findByUserId(id, filterDto, true);
    return movies || {}
  }

  /**
   * Get movie with id
   */
  @UseInterceptors(makeCacheInterceptor({ttl: 240, getKey: (request:Request) =>  request.url}))
  @Get('/:id')
  async getMovieById(@Param('id', new ParseIntPipe()) id: number) {
    const movies = await this.moviesRepository.findOne({ id });
    return movies || {}
  }
}
