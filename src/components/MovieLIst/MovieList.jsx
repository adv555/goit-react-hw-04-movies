import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.scss';
import placeholder from '../../assets/images/placeholder.png';

export default function GalleryList({ movies, label }) {
  const location = useLocation();
  const imgUrl = 'https://image.tmdb.org/t/p/w500/';

  return (
    <ul className={styles.list}>
      {movies &&
        movies.map(({ id, name, title, poster_path, vote_average }) => (
          <li key={id} className={styles.item}>
            <Link
              className={styles.link}
              to={{
                pathname: `/movies/${id}`,
                state: {
                  from: {
                    location,
                    // label: 'Back to search',
                    label: `${label}`,
                  },
                },
              }}
            >
              <div className={styles.card}>
                <div className={styles.thumb}>
                  <img
                    src={imgUrl + poster_path ?? placeholder}
                    alt={name ?? title}
                    className={styles.poster}
                  />
                </div>

                <div className={styles.text}>
                  <h4>{name ?? title}</h4>
                  <span>
                    {vote_average ? (
                      <b
                        className={
                          vote_average > 5
                            ? styles['rating--hight']
                            : styles['rating--low']
                        }
                      >
                        {vote_average}
                      </b>
                    ) : null}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}

// <Link
//   to={{
//     pathname: `/movies/${movie.id}`,
//     state: {
//       from: location.pathname === '/' ? '/' : '/movies' + location.search,
//     },
//   }}
// >
//   <h3>{movie.original_title}</h3>
// </Link>;
