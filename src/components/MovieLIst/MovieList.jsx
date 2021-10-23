import { Link, useLocation } from 'react-router-dom';

export default function GalleryList({ moviesBySearch }) {
  // console.log({ moviesBySearch });
  const location = useLocation();
  // console.log(location);
  console.log(moviesBySearch);
  return (
    <ul className="list">
      {moviesBySearch &&
        moviesBySearch.map(({ id, name, title, poster_path }) => (
          <li key={id}>
            {/* <Link to={`/movies/${id}`}>{name ?? title}</Link> */}
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: {
                  from: {
                    location,
                    label: 'Back to search',
                  },
                },
              }}
            >
              <div>
                <img
                  style={{ width: '200px ' }}
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  alt={name ?? title}
                />
                <h4>{name ?? title}</h4>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}
