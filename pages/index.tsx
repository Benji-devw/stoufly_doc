import { useState, useEffect, useRef } from 'react'
import Layout from '@/components/ui/Layout'
import type { NextPageWithLayout } from './_app'
import Skeleton from '@/components/ui/skeletonCard'
import { getTracks, getAllTracks } from './api/tracks';
import AudioPlayer from '@/components/AudioPlayer'
import Link from 'next/link';
import { useRouter } from 'next/router'
import {BpmRangeFilter} from '@/components/ui/RangeFilter';

// import IntersectingObserver from '../components/ui/IntersectingObserver';



const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {
  
  const router = useRouter()
  const [error, setError] =     useState<boolean>(false);
  const [tracks, setTracks] =   useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);

    /*******/
  /** Query Filter */
  const [searchQuery, setSearchQuery] = useState<string | any>();
  const [tag, setTag] = useState<string | any>();

  
  /*******/
  /** Category Filter */
  const tracksCat = allTracks?.props?.res || { state: [] };
  const categorySet = new Set((tracksCat.state || []).map((cat: any) => cat?.category || 'Non catégorisé').filter(Boolean));
  const catList = Array.from(categorySet).sort();
  const [catActive, setCatActive] = useState<any>(catList);

  /*******/
  /** Limit & counter */
  const [counter, setCounter] = useState<number>(9);
  const [ skip, setSkip ] = useState<number>(9)
  const [ currentPos, setCurrentPos ] = useState<number>(9)



  useEffect(() => {
    // Définir l'état de chargement au début
    setLoading(true);
    
    // Vérifier que res et ses propriétés sont définis
    const datas = res?.props?.res?.state || [];
    
    // Mettre à jour les états avec les nouvelles données
    setTracks(datas);
    setCounter(datas.length);
    setSearchQuery(router.query.search || '');
    setTag(router.query.tag || '');
    
    // Utiliser un délai plus court pour une meilleure expérience utilisateur
    const timer = setTimeout(() => {
      if (datas.length > 0) {
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    }, 600); // Augmenter légèrement le délai pour une meilleure transition
    
    // Nettoyer le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, [res, router.query]); // Réduire les dépendances pour éviter les rendus inutiles
  
  const handleLoadMore = (e: any) => {
      // e.preventDefault()
      const newSkip = skip + 9;
      setSkip(newSkip);
      // router.push({
      //   pathname: '/',
      //   query: { ...router.query, skip: newSkip } },
      //   undefined, {scroll: false})
  }  

  function getResultRangeBpm(value:any) {
    handleBpm([value[0], value[1]])
  }
  const handleBpm = (val: any) => {
    setSkip(9)
    setLoading(true)
    router.query.BpmMin = val[0]
    router.query.BpmMax = val[1]
    router.push( { 
        pathname: '/', 
        query: { ...router.query, BpmMin: val[0] } },
        undefined, {scroll: false})    
      router.push( { 
        pathname: '/', 
        query: { ...router.query, BpmMax: val[1] } },
        undefined, {scroll: false})
  }  



  return (
    <Layout page={"Sample Home | Stouflydoc"}>
      <div className="min-h-screen place-items-center">

        <div className="container mx-auto filters__Section">
          {/********/
          /** INTRO */}
          <h1 className='border-b border-b-1 border-orange-600'>{"Plateforme de partage, de sauvegarde, d'achat, de vente et de téléchargement de sample. Publier et partager vos créations musicales avec la communauté, ou simplement explorer et découvrer de nouveaux contenu."}</h1>

          {/********/
          /** ACCORDION FILTERS */}
          <div className={`relative accordion grid grid-flow-col w-2/3 mx-auto mt-10 p-2 dark:bg-zinc-900 bg-zinc-100 rounded-md shadow-md`}>
            {/* <button className="cursor-pointer p-2 dark:bg-zinc-900 bg-zinc-100 rounded-md accordion_button" onClick={() => setOpenAccordion(!openAccordion)}>
              {!openAccordion ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 accordion_hov mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                : 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 accordion_hov mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              }
            </button> */}

            <div className={`${openAccordion ? "accordionOpened" : "accordionClosed"} `}>
              {/********/
              /** CATEGORY FILTERS */}
              <div className="category_Item grid grid-cols-4 md:grid-cols-6">
                {catList.map((cat: any, id: number) => (  
                  <Link key={id} href={``} legacyBehavior>
                    <a onClick={(e) => {
                      e.preventDefault(),
                      setSkip(9)
                      setLoading(true)
                      setCounter(tracks.length)
                      router.query.category = cat, 
                      router.push( {  pathname: '/',  query: { ...router.query, category: cat } },  undefined,  {scroll: false} )
                    }}> 
                      <button 
                        onClick={() => {setCatActive(cat)}} 
                        type="button"
                        className={`${cat !== router.query.category ? '' : 'bg-orange-600'} w-full m-2 py-1 px-1 hover:bg-orange-600`}
                      >{cat}</button>
                    </a>
                  </Link>
                ))}
              </div>
            
                {/********/
                /** RANGE FILTERS */}
                <BpmRangeFilter min={0} max={200} getResultRangeBpm={getResultRangeBpm}/>
            </div>
          </div>

          {/********/
          /** ACTIVE QUERY FILTERS */}
          <div className='container w_full flex flex-wrap justify-center align-middle p-2'>
            <ul className='flex flex-wrap justify-center align-middle'>
              {Object.keys(router.query).map((item, i) => (
                <li key={i} className='cursor-pointer text-md m-1 px-2 py-1 rounded-xl opacity-50 hover:opacity-80 border border-orange-600 text-center flex align-text-middle'
                  onClick={(e) => {
                    e.preventDefault()
                    setSkip(9)
                    setLoading(true)
                    delete router.query[item]
                    router.replace({ pathname: router.pathname, query: router.query }, undefined, {scroll: false})
                  }}
                > {item}: {router.query[item]}
                    <svg className="w-7 h-7 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/********/}
        {/** DISPLAY */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
              Samples disponibles
              <span className="ml-2 px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full">
                {loading ? '...' : counter}
              </span>
            </h2>
            
            {/* Boutons de tri (à implémenter plus tard) */}
            <div className="hidden md:flex space-x-2">
              <button className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-800 rounded-md hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                Les plus récents
              </button>
              <button className="px-3 py-1 text-sm bg-zinc-200 dark:bg-zinc-800 rounded-md hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                Les plus populaires
              </button>
            </div>
          </div>
          
          {/* Conteneur principal avec hauteur minimale fixe */}
          <div className="min-h-[70vh]">
            {loading ? (
              /* État de chargement */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {[...Array(skip < counter ? skip : 9)].map((n: any, id: number) => (
                  <Skeleton key={`skeleton-${id}`} style={{animationDelay: `${id/10}s`}} />
                ))}
              </div>
            ) : error ? (
              /* Message d'erreur */
              <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-zinc-400 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <h4 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">Aucun résultat trouvé</h4>
                <p className="text-zinc-500 mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              /* Tracks réelles */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {tracks.slice(0, skip).map((track: any, id: number) => (
                  <AudioPlayer key={`track-${id}`} track={track} />
                ))}
              </div>
            )}
          </div>
          
          {skip < counter && (
            <div className="flex justify-center mt-10">
              <button 
                onClick={(e) => handleLoadMore(e)} 
                type="button" 
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <span>Charger plus</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Home





export async function getServerSideProps({ query }: any) {
  const res = await getTracks(query);
  const allTracks = await getAllTracks();

  // Vérifier que res et allTracks sont définis
  return { 
    props: { 
      res: res || { props: { res: { state: [] } } }, 
      allTracks: allTracks || { props: { res: { state: [] } } }, 
      query 
    } 
  };
}
