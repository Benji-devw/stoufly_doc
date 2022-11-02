import React, { useEffect, useState } from "react";
import { getAllTracks } from './api/tracks';
import Layout from '../components/ui/Layout';
import AudioPlayer from "../components/AudioPlayer";
import Skeleton from '../components/ui/skeletonCard'
import Router from "next/router";

export default function Currency({ res, query}: any) {
    const [tracks, setTracks] = useState([])

    /***************************/
    /***** SearchBar Filters *****/
    const [searchEnter, setSearchEnter] = useState<any>(query.query)
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(true)


    useEffect(() => {
      setLoading(true)
      if (query.query) {

          setLoading(false)
          console.log(query.query);
          
          if(loading) {
           
            setLoading(false)
          }
      }
    //   if (query.query) {
    //     setSearchEnter(query.query)
    //     setTimeout(() => {
    //       const searchBar = () => {
    //         const fullListMap = tracks.map(prod => prod)
    //         let fullList = fullListMap.flat()
    //         let term = searchEnter.toLowerCase()
    //           setTracks(fullList.filter(track => 
    //             track.title.toLowerCase().indexOf(term) > -1 ||
    //             track.tags.toLowerCase().indexOf(term) > -1 ||
    //             track.reporter.toLowerCase().indexOf(term) > -1
    //           ))
    //           setLoading(false)
    //         }
    //         if(loading) {
    //           searchBar()
    //           setLoading(false)
    //         }

    //   }, 1000)
    // }
      // if (query.query !== searchEnter) return Router.reload();
      // e.preventDefault()

    }, [query.query, searchEnter])


    // console.log(searchEnter);

    return (
      <Layout page={`Search result for ${searchEnter} - Stouflydoc`}>
        <div className={`flex my-2 px-5 text-white flex-wrap`}>
          <div  className={`w-full mx-4 my-5 sm:flex sm:p-0`}>
              <h2 className="text-left text-4xl text-white">Resultat pour : {query.query} </h2>
          </div>

          <div className={` w-full mx-3 my-2`}></div>
          
          <div  className={`w-full mx-4 sm:flex sm:p-0`}>
            <h3 className="text-left text-2xl text-white"> ... trouvé ({tracks.length}) </h3>
          </div>

          <div className={`flex flex-wrap justify-center align-middle gap-4`}>
            {loading ? (
              [1,2,3,4,5,6,7,8].map((n) => <Skeleton style={{animationDelay: `${n/5}s`}} key={n}/>) 
              ) : ( 
              tracks.map((track: any, id: any) => <AudioPlayer key={id} track={track} /> ) )
            }
          </div>
        </div>        
      </Layout>
    )
}


export async function getServerSideProps({ query }: any) {
  const res = await getAllTracks()
  return { props: {res, query} }
  }