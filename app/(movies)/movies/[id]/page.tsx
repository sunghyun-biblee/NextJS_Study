import { API_URL } from "../../../(home)/page";

export const metadata = {
  title: "MovieDetail",
};
async function getMovie(id: string) {
  console.log(`Fetching Movies: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
async function getVideos(id: string) {
  console.log(`Fetching Movies: ${Date.now()}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}/${id}/videos`);
  return res.json();
}

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log("==============");
  console.log("start Fetching");
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  console.log("end Fetching");
  return <h1>{movie.title}</h1>;
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

*/
