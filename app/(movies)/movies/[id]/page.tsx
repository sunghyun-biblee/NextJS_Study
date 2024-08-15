import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

// export const metadata = {
//   title: "MovieDetail",
// };
// components -> movie-info
/* 
async function getMovie(id: string) {
  console.log(`Fetching Movies: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
*/

// components -> movie-videos
/* 
async function getVideos(id: string) {
  console.log(`Fetching Movies: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}/${id}/videos`);
  return res.json();
}
  */

interface IParmas {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParmas) {
  const movie = await getMovie(id);
  return { title: movie.title };
}
export default async function MovieDetail({ params: { id } }: IParmas) {
  return (
    <div>
      <Suspense fallback={<h1>Loading Movie Info</h1>}>
        <MovieInfo id={id}></MovieInfo>
      </Suspense>
      <Suspense fallback={<h1>Loading Movie Videos</h1>}>
        <MovieVideos id={id}></MovieVideos>
      </Suspense>
    </div>
  );
}

// api 요청 작업이 2개 이상일때 하나의 작업시간이 오래걸리고, 다른작업이 빨라도 평균작업 시간은 오래걸리게된다.
// 만약 비디오데이터는 1초만에 받아왔으나, 영화 정보를 받아오는데 20초가 걸리게되면 총 작업시간이 21초가 되고, await을 통해 영화정보를 가져온 후 비디오 데이터를 가져오기 때문에 순차적으로 해결하는데 많은 시간이 소요된다.

// 이를 병렬적으로 작업하여, 최적화 해보자

/*
A. getMovie, getVideos 2개의 작업을 promise.all을 사용하여 두 작업 모두 동시에 await을 적용한다.
_ await Promise.all([getMovie(id),getVideos(id)])  => 두 작업을 동시에 시작
위와 같이 작성하게되면 promise.all이 배열에 있는 작업들 모두 await을 적용하게 되고,
각 작업이 끝나면 데이터가 반환된다.
1. Promise.all([ await getMovie(id), await getVideos(id)]) 
2. Promise.all([ movie, await getVideos(id)]) 
3. Promise.all([ movie, videos]) 
=> prmise.all은 결과값을 이루어진 배열을 가지게 됨

B. 모든 작업이 끝나게되면 , promise.all이 결과값으로 이루어진 배열을 반환한다.
이 때 제일 긴 작업 소요시간이 5분이라고 가정하였을 때, 다른 데이터를 사용하기 위해서는 작업이 끝나는 시간인 5분뒤에 데이터를 사용할 수 있기 때문에
작업이 먼저 끝난다면 해당 데이터를 사용할 수있도록 suspense를 통해 병렬적으로 처리가 가능하다


C. 작업은 병렬적으로 처리하나 만약 getMovie 작업이 먼저 끝나게 된다면
getMovie 데이터를 활용하여 ui를 먼저 보여주고, 이후 getVideos 작업이 끝나게되면 
이어서 getVideos를 활용하여 ui를 보여준다

await Promise.all([getMovie(id), getVideos(id)]);
이 코드로는 두 작업이 모두 끝난 이후 ui를 보여줄 수 있기 때문에,
 작업을 동시에 시작하나, 작업은 먼저 끝나면 기다리지않고 ui를 보여주게 만들것이다

- 많은 데이터를 fetch할때에는 page파일에서 데이터를 fetch 한다
- 자동적으로 loading component가 화면에 생길 것이고, fetch이 완료되면 자동으로 바뀌기 때문이다.
- 하지만 데이터 소스가 여러 개라면, Suspense를 사용하면 좋다

ex) 여러개의 작업을 컴포넌트 단위로 분리하여, 데이터를 패칭
Movie => MovieInfo , videos => MovieVideos

D. Error Handling (에러 헨들링)
어플리케이션 사용중 에러가 발생하였을때, 특정 페이지로 이동할 수 있도록 도와주거나,
어떤 에러가 발생했는지 알려줄 수 있다.
  파일명 : error.tsx
  - error component에는 반드시 use client를 추가 해야한다.
  - 
*/
