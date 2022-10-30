import { useState, useEffect } from 'react'
import Layout from '../components/ui/Layout'
import type { NextPageWithLayout } from './_app'
import { GetServerSideProps } from 'next'
import Skeleton from '../components/ui/skeleton'
import { getTracks, getAllTracks } from './api/tracks';
import AudioPlayer from '../components/AudioPlayer'


const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {
  // const [platforms, setPlatforms] = useState<string[]>([])
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<any>(null);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(15)


  useEffect(() => {
    setTimeout(() => {
      try {
        setTracks(res.props.res.state);
        setLoading(false);
        setError(false);
      } catch(err) {
        console.log(err);
        setError(true);
      }
    }, 1000)
  }, [res.props.res.state])

console.log(tracks);


  return (
    <Layout page={"index"}>
    <div className="min-h-screen place-items-center">
      {/* <div>
      <h1 className="text-3xl">Deploy this !</h1>
        {platforms.map((pl, id) => (
          <p key={`platform-${id}`} className="text-center"> {pl} </p>
        ))}
      </div> */}
      <div className="flex flex-wrap justify-center align-middle gap-4">
        {loading ? (
          [1,2,3,4,5,6,7,8,9,10,11,12].map((n) => <Skeleton style={{animationDelay: `${n/5}s`}} key={n}/>)
        ) : (
          (tracks.slice(0, limit).map((track: any, id: number) => <AudioPlayer key={id} track={track} /> ))
        )} 
      </div>
    </div>
    </Layout>
  )
}

export default Home





type Data = { 
  query: any
}
export async function getServerSideProps({query}: Data) {
  const res = await getTracks(query)
  const allTracks = await getAllTracks()
  return { props: {res, allTracks, query} }
}
// export async function getServerSideProps: GetServerSideProps<{ data: Data }> ({query}) {
//   const res = await getTracks(query)
//   const allTracks = await getAllTracks()
//   return { props: {res, allTracks, query} }
// }

