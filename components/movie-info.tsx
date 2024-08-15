import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-info.module.css";
export async function getMovie(id: string) {
  console.log(`Fetching Movies: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movieinfo = await getMovie(id);
  return (
    <div className={styles.container}>
      <img
        src={movieinfo.poster_path}
        alt={movieinfo.title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{movieinfo.title}</h1>
        <h3>⭐{movieinfo.vote_average.toFixed(1)}</h3>
        <p>{movieinfo.overview}</p>
        <a href={movieinfo.homepage} target="_blank">
          Home &rarr;
        </a>
      </div>
    </div>
  );
}
