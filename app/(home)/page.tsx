import Link from "next/link";

export const metadata = {
  title: "home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
const getMovies = async () => {
  const response = await fetch(API_URL);
  const json = response.json();
  return json;
};
export default async function HomePage() {
  // 컴포넌트 앞에 async를 작성하는 이유는
  // Next.js가 이 component는 await을 해야하기 때문
  const movies = await getMovies();
  return (
    <div>
      <h1>hello</h1>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
      {/* {JSON.stringify(movies)} */}
    </div>
  );
}

// 사용자가 웹사이트에 도착하는 순간
// next.js는 즉시 사용자에게 로딩 상태를 전달한다
// 하지만 streaming을 사용하여, next.js는 기본적으로 우리의 페이지를 작은 html 부분으로 나눠서 준비된 html부분을 브라우저에게 줄 수 있다.
// 예시로, navigation bar와 loading component  요소
// 위 2가지 컴포넌트들은 사용자에게 보여질 준비가 되어있기 떄문에, 해당 html 부분들은 브라우저에 즉시 전달된다.

// 그리고 브라우저에게 백엔드에서 작업이 마무리되지 않아서, 기다려줘야 한다고 하는 것
// await이 끝나면 브라우저에게 마지막 html 부분을 전달하게 되고,
// 그럼 이때, 프레임워크가 loading component를 await된 component로 바꿔주게 된다.

// *. 프레임워크가 우리의 페이지를 작은 html 부분으로 나누고, 준비된 부분들을 하나씩 보여준다는 것

/*
1. <Loading/>
2. const html= await Homepage()
3. isLoading ? <Loading/>: html
*/
