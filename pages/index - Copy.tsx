import { useState, useEffect } from 'react'
import Layout from '../components/ui/Layout'
import type { NextPageWithLayout } from './_app'
import Skeleton from '../components/ui/skeletonCard'
import { getTracks, getAllTracks } from './api/tracks';
import AudioPlayer from '../components/AudioPlayer'
import Link from 'next/link';
import { useRouter } from 'next/router'
import test from 'node:test';


const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {

  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<any>(null);
  const [error, setError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(true);

  const [rangeLower, setRangeLower] = useState(0);

  /*******/
  /** Search Bar */
  const [resultCategory, setResultCategory] = useState<string>();

  
  /*******/
  /** Category Filter */
  const tracksCat = allTracks.props.res;
  const categorySet = new Set(tracksCat.state.map((cat: any )=> cat.category));
  const catList = Array.from(categorySet).sort();
  const [catActive, setCatActive] = useState(query.category)


  const [queryList, setQueryList] = useState<any>()


  useEffect(() => {
    setLoading(true)
    setQueryList(router.query)
    if (res && allTracks) {
      setTimeout(() => {

          /*******/
          /** Display All Tacks */
          setTracks(res.props.res.state);
          // setCatActive(query.category)
          // setResultCategory(catActive)
          setLoading(false);
          setError(false);
          
        }, 1000)
    } else if (tracks.length <= 0) {
      setError(true);
    }
  }, [ query.category, res, allTracks, router.query, catActive, tracks])



  const handleBpmLowerBound = (val: any) => {
      router.query.BpmLowerBound = val
      router.push( { 
          pathname: '/', 
          query: { ...router.query, BpmLowerBound: rangeLower } }, 
          undefined, 
          {}
      )

  }

  const test = (val: any) => {

    const vv = []
    if (typeof URLSearchParams !== 'undefined') {
      const params = new URLSearchParams(queryList)
      
      console.log(params)
      params.delete(val)
      console.log(params)

      vv.push(params)
      console.log(vv);
      
      setQueryList(params)
    router.replace(
        {
            pathname: router.pathname,
            query: queryList
        },
        undefined,
        { shallow: true}
    );
    }
  }

  console.log(queryList);
  


  return (
    <Layout page={"Home - Stouflydoc"}>
      <div className="min-h-screen place-items-center">

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
            <div className=" grid grid-cols-4 md:grid-cols-6">
              <Link href={`/`} scroll={false} passHref className="md:flex" >
                <button onClick={() => {setCatActive(undefined)}} 
                  type="button"
                  className={`${catActive !== undefined ? '' : 'bg-orange-600'}  w-full m-2 py-1 px-8 hover:bg-orange-600`}
                >All</button>
              </Link>

              {/* {catList.map((cat: any, id: number) => (  
                <Link key={id} href={``} legacyBehavior>
                  <a onClick={(e) => {
                    e.preventDefault(),
                    router.query.category = cat, 
                    router.push( {  pathname: '/',  query: { ...router.query, category: cat } },  undefined,  {} )
                  }}> 
                    <button onClick={() => {setCatActive(cat)}} 
                      type="button"
                      className={`${cat !== catActive ? '' : 'bg-orange-600'} w-full m-2 py-1 px-1 hover:bg-orange-600`}
                    >{cat}</button>
                  </a>
                </Link>
              ))} */}
            </div>
           
            <label htmlFor="rangeLower">{rangeLower}</label>
              {/* <input type="range" id="rangeLower" name="rangeLower" defaultValue={filters.bpmLowerBound} step={10} min="0" max="200" onChange={(e: any) => setFilters(prevState => ({ ...prevState, bpmLowerBound: e.target.value }) )} /> */}
              <input type="range" id="rangeLower" name="rangeLower" defaultValue={rangeLower} step={10} min="0" max="200" onChange={(e: any) => setRangeLower(e.target.value) } />
              <button onClick={handleBpmLowerBound}>apply</button>
          </div>
        </div>
          
        {queryList &&
          <div className="result">
            <h2 className="text-left text-2xl m-4">Flitres : 
              <ul>
                {Object.keys(router.query).map((val, id): any => 
                  <li key={id} onClick={() => test(val)}> <span>{val}</span> </li>
                  // Object.values(router.query).map((va, i) => <li key={i} onClick={() => test(val)}> <span>{va}</span> </li>)
                )}
              </ul> </h2>

          </div>
        
        }

        <div className="flex flex-wrap justify-center align-middle gap-6">
          {loading ? (
            [1,2,3,4,5,6,7,8].map((n) => <Skeleton style={{animationDelay: `${n/5}s`}} key={n}/>)
          ) : 
            error ? <h5>Aucun résultat</h5> : 
            (tracks.map((track: any, id: number) => <AudioPlayer key={id} track={track} /> ))
          } 
        </div>
      </div>
    </Layout>
  )
}

export default Home





export async function getServerSideProps({query}: any) {
  const res = await getTracks(query)
  const allTracks = await getAllTracks()
  return { props: {res, allTracks, query} }
}
