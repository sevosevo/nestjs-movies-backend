import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { User } from '../users/users.entity';
import { MovieDto } from './dto/movie.dto';
import { FilterSchema } from '../movies/interfaces/FilterSchema';
import { Genre } from './genres.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  findAll({
    limit,
    offset,
    search,
    orderBy,
    order,
    ids
  }: FilterSchema): Promise<Movie[]> {
    const query = this.createQueryBuilder();
    query.select('film').from(Movie, 'film');
    if (ids) {
      query.innerJoinAndSelect('film.genres', 'genre', 'genre.id IN (:...ids)', { ids });
    }else{
      query.innerJoinAndSelect('film.genres', 'genre');
    }
    query.innerJoinAndSelect('film.user', 'user');

    if (search)
      query.where('film.name LIKE :name', { name: '%' + search + '%' });

    if (orderBy && order) query.orderBy(orderBy, order);

    query.offset(offset).limit(limit);

    const r = query.getMany();

    return r;
  }

  async createMovie(user: User, movieDto: MovieDto): Promise<Movie> {
    const movie = new Movie();
    movie.description = movieDto.description;
    movie.name = movieDto.name;
    movie.user = user;
    movie.genres = movieDto.genres.map(genreId => {
      const genre = new Genre(); // Fake instance
      genre.id = genreId;
      return genre;
    });
    await movie.save();
    delete movie.genres;
    return movie;
  }

  findByUserId(
    { limit, offset, search, orderBy, order, ids }: FilterSchema,
    id,
    showUser = false,
  ): Promise<Movie[]> {
    const query = this.createQueryBuilder();
    query.select(['films.name', 'films.description']).from(Movie, 'films');
    !showUser
      ? query.innerJoin('films.user', 'user', 'user.id = :userId', {
        userId: id,
      })
      : query.innerJoinAndSelect('films.user', 'user', 'user.id = :userId', {
        userId: id,
      });
    if (ids) {
      query.innerJoinAndSelect('film.genres', 'genre', 'genre.id IN (:...ids)', { ids });
    }
    if (search)
      query.where('films.name LIKE :name', { name: '%' + search + '%' });

    if (orderBy && order) query.orderBy(orderBy, order);

    query.offset(offset);
    
    query.limit(limit);

    return query.getMany();
  }
}

