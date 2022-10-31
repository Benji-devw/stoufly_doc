import { useState, useEffect } from 'react'
import Layout from '../components/ui/Layout'
import type { NextPageWithLayout } from './_app'
import Skeleton from '../components/ui/skeletonCard'
import { getTracks, getAllTracks } from './api/tracks';
import AudioPlayer from '../components/AudioPlayer'
import Link from 'next/link';


const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {
  // const [platforms, setPlatforms] = useState<string[]>([])
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<any>(null);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(16)
  const [open, setOpen] = useState(true);
  
  const tracksCat = allTracks.props.res;
  const categorySet = new Set(tracksCat.state.map((cat: any )=> cat.category));
  const catList = Array.from(categorySet).sort();
  const [catActive, setCatActive] = useState()


  useEffect(() => {
    setLoading(true)
    if (res && allTracks) {
      setTimeout(() => {
        setTracks(res.props.res.state);
        setCatActive(query.category)
        setLoading(false);
        setError(false);
      }, 1000)
    }
  }, [res.props.res.state, query.category, res, allTracks])

// console.log(res);


  return (
    <Layout page={"index"}>
      <div className="min-h-screen place-items-center">

        <div className={`relative accordion grid grid-flow-col w-2/3 mx-auto m-10 pl-12 dark:bg-zinc-900 bg-zinc-300`}>
          <button className="absolute left-0 mx-5 my-3 cursor-pointer" onClick={() => setOpen(!open)}>
            {!open ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 test">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 test">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            }
          </button>

          <div className={`${open ? "accordionOpened" : "accordionClosed"} `}>
            <div className=" grid grid-cols-4 md:grid-cols-6">
              <Link href={`/`} scroll={false} passHref className="md:flex" >
                <button onClick={() => {setCatActive(undefined), setLimit(16)}} 
                  type="button"
                  className={`${catActive !== undefined ? '' : 'bg-orange-600'}  w-full m-2 py-1 px-8 hover:bg-orange-600`}
                >All</button>
              </Link>

              {catList.map((cat: any, id: number) => (  
                // <Link key={id} href={`/?category=${cat}&_limit=${limit}`} scroll={false} passHref >
                <Link key={id} href={`/?category=${cat}`} scroll={false} passHref className="md:flex" >
                  <button onClick={() => {setCatActive(cat), setLimit(16)}} 
                    type="button"
                    className={`${cat !== catActive ? '' : 'bg-orange-600'} w-full m-2 py-1 px-1 hover:bg-orange-600`}
                  >{cat}</button>
                </Link>
              ))}
            </div>
            {/* <div className="relative grid grid-cols-4 md:grid-cols-3">
              <Filters data={tracks} />
            </div> */}
          </div>
        </div>


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
