"use client";
import Link from "next/link";
import styles from "../styles/movie.module.css";
import { useRouter } from "next/navigation";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}

export default function Movie({ title, id, poster_path }: IMovieProps) {
  const router = useRouter(); // 우리에게 router에 대한 access를 제공
  const onClick = () => {
    router.push(`/movies/${id}`);
    // push는 페이지를 해당 페이지로 route 해줌
  };
  return (
    <div className={styles.movie}>
      <img src={poster_path} alt={title} onClick={onClick} />
      <Link href={`/movies/${id}`}>{title}</Link>
      <li></li>
    </div>
  );
}
