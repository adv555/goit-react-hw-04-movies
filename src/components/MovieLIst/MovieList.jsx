import { Link, useLocation } from 'react-router-dom';

export default function GalleryList({ moviesBySearch }) {
  // console.log({ moviesBySearch });
  const location = useLocation();
  console.log(location);

  return (
    <ul className="list">
      {moviesBySearch &&
        moviesBySearch.map(({ id, name, title }) => (
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
              {name ?? title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
