import { useState, useEffect, useRef } from 'react'
import Layout from '../components/ui/Layout'
import type { NextPageWithLayout } from './_app'
import Skeleton from '../components/ui/skeletonCard'
import { getTracks, getAllTracks } from './api/tracks';
import AudioPlayer from '../components/AudioPlayer'
import Link from 'next/link';
import { useRouter } from 'next/router'
// import IntersectingObserver from '../components/ui/IntersectingObserver';



const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {

  const router = useRouter()
  const [error, setError] =     useState(false);
  const [tracks, setTracks] =   useState<any>();
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(true);
  
  const [rangeMin, setRangeMin] = useState(!query.BpmMin ? 0 : query.BpmMin);
  const [rangeMax, setRangeMax] = useState(!query.BpmMax ? 200 : query.BpmMax);
  
  /*******/
  /** Category Filter */
  const tracksCat =     allTracks.props.res;
  const categorySet =   new Set(tracksCat.state.map((cat: any )=> cat.category));
  const catList =       Array.from(categorySet).sort();
  const [catActive, setCatActive] = useState(catList)


    /*******/
  /** HANDLE SCROLL MORE 1 */
  // const HandleScrollMore = (e: any) => {
  //   const { offsetHeight, scrollTop, scrollHeight} = e.target
  //   if (offsetHeight + scrollTop === scrollHeight) {
  //     setSkip(skip + 15)
  //     router.push({ 
  //       pathname: '/', 
  //       query: { ...router.query, skip: skip +  15 } },
  //       undefined, {})
  //   }
  // }
      /*******/
  /** HANDLE SCROLL MORE 2 */
  // const [ skip, setSkip ] = useState<number>(15)
  // const containerRef = useRef<any>()
  // const [ ref, isVisible ] = IntersectingObserver({
  //   root: null,       rootMargin: "0px",
  //   threshold: 1.0,   ref: containerRef
  // })
  

  
  useEffect(() => {
    // if (isVisible) {
    //   console.log(isVisible);
    //   router.push({ 
    //     pathname: '/', 
    //     query: { ...router.query, skip: skip +  15 } },
    //     undefined, { shallow: true})
    // }

      setLoading(true)
      setTracks( res.props.res.state);
      setTimeout(() => {
        if (res.props.res.state.length > 0) {
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(true)
        }
      }, 1000)
    

  }, [ query.category, res, allTracks, router.query, catActive, tracks, router])

  
  const [ skip, setSkip ] = useState<number>(15)
  const handleLoadMore = (e: any) => {
      e.preventDefault()
      setSkip(skip + 15)
      router.push({ 
        pathname: '/', 
        query: { ...router.query, skip: skip +  15 } },
        undefined, { })
  }  


  const handleBpmMin = (val: any) => {
      router.query.BpmMin = val
      router.push( { 
          pathname: '/', 
          query: { ...router.query, BpmMin: rangeMin } }, 
          undefined, 
          {}
      )
  }
  const handleBpmMax = (val: any) => {
      router.query.BpmMax = val
      router.push( { 
          pathname: '/', 
          query: { ...router.query, BpmMax: rangeMax } }, 
          undefined, 
          {}
      )
  }



  return (
    <Layout page={"Home - Stouflydoc"}>
      <div className="min-h-screen place-items-center">
      {/* <div className="place-items-center w-full todos-list"   onScroll={(e) => HandleScrollMore(e)}> */}

        {/********/
        /** ACCORDION FILTERS */}
        <div className={`relative accordion grid grid-flow-col w-2/3 mx-auto m-10 pl-12 dark:bg-zinc-900 bg-zinc-300`}>
          <button className="absolute left-0 mx-5 my-3 cursor-pointer" onClick={() => setOpenAccordion(!openAccordion)}>
            {!openAccordion ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 accordion_hov">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 accordion_hov">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            }
          </button>

          <div className={`${openAccordion ? "accordionOpened" : "accordionClosed"} `}>

            {/********/
            /** CATEGORY FILTERS */}
            <div className="category_Item grid grid-cols-4 md:grid-cols-6">
              {catList.map((cat: any, id: number) => (  
                <Link key={id} href={``} legacyBehavior>
                  <a onClick={(e) => {
                    e.preventDefault(),
                    router.query.category = cat, 
                    router.push( {  pathname: '/',  query: { ...router.query, category: cat } },  undefined,  {} )
                  }}> 
                    <button 
                      // onClick={() => {setCatActive(cat)}} 
                      type="button"
                      className={`${cat !== catActive ? '' : 'bg-orange-600'} w-full m-2 py-1 px-1 hover:bg-orange-600`}
                    >{cat}</button>
                  </a>
                </Link>
              ))}
            </div>
           
              {/********/
              /** RANGE FILTERS */}
              <input type="range" defaultValue={!query.BpmMin ? rangeMin : query.BpmMin} step={10} min="0" max="200" onChange={(e: any) => setRangeMin(e.target.value) } />
              <button className=' mx-2 text-lg px-2 py-1 rounded-xl border border-orange-600 text-center' onClick={() => handleBpmMin("BpmMin")}>{rangeMin}</button>
              <input type="range" defaultValue={!query.BpmMax ? rangeMax : query.BpmMax} step={10} min="0" max="200" onChange={(e: any) => setRangeMax(e.target.value) } />
              <button className=' mx-2 text-lg px-2 py-1 rounded-xl border border-orange-600 text-center' onClick={() => handleBpmMax("BpmMax")}>{rangeMax}</button>
          </div>
        </div>
          
        {/********/
        /** ACTIVE QUERY FILTERS */}
        <div className='container w_full flex flex-wrap justify-center align-middle gap-6'>
          <ul className='h-10 my-4 flex'>
            {Object.keys(router.query).map((item, i) => (
              <li key={i} className='cursor-pointer text-lg mx-2 px-2 py-1 rounded-xl opacity-50 hover:opacity-80 border border-orange-600 text-center flex align-text-middle'
                onClick={(e) => {
                  e.preventDefault()
                  delete router.query[item]
                  router.replace({ pathname: router.pathname, query: router.query }, undefined,{})
                }}
              > {item}: {router.query[item]}
                  <svg className="w-7 h-7 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </li>
            ))}
          </ul>
        </div>

        {/********/
        /** DISPLAY */}
        <div className="flex flex-wrap justify-center align-top gap-6" >
            {loading ? ( [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((n: any) => <Skeleton style={{animationDelay: `${n/5}s`}} key={n}/>)
            ) : (
              error ? ( <h4 className='text-xl font-bold relative top-10'>Aucun r??sultat...</h4>
              ) : ( tracks.map((track: any, id: number) => <AudioPlayer key={id} track={track} /> ) )
            )
          } 
        </div>
      </div>

      {/* <div ref={containerRef} className="test h-20"></div> */}
        <button onClick={(e) => handleLoadMore(e)} type="button" className={`m-5 py-2 px-5 rounded-sm mx-auto text-center`}>
            Load more
          </button>
    </Layout>
  )
}

export default Home





export async function getServerSideProps({query}: any) {
  const res = await getTracks(query)
  const allTracks = await getAllTracks()
  return { props: {res, allTracks, query} }
}
