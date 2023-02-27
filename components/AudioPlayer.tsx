import { useState } from 'react';
import Wave from './Wave';
// import Link from 'next/link';
import { useRouter } from 'next/router'


const AudioPlayer = ({track}: any) => {
  const router = useRouter()
  const [tags, setTags] = useState(track.tags.replace(/\s/g, '').split(','))
  return (
    <div className="card fadeIn blurOut flex border hover:shadow-xl hover:border-orange-600 dark:hover:border-orange-600 dark:border-zinc-900 dark:bg-zinc-900 bg-zinc-100 rounded-md shadow ">

      <div className="card__heade">
        {/********/
        /** DISPLAY */}
        <Wave url={track.url} bpm={track.bpm} />

        <div className="flex text-xl text-left p-2 "> 
          <h2 className='basis-4/5'>{track.title}</h2> 
          <div className="card__likes flex flex-col-reverse mx-auto text-center hover:text-orange-600 cursor-pointer">
            <span className='text-sm'>{track.likes}</span>
            <svg className="w-6 h-6 hover:stroke-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
        </div>
        <span className='card__categories text-sm pl-2 '>
          Catégorie: 
          <button
            className='hover:text-orange-600 pl-2'
            onClick={(e) => {
                // e.preventDefault()
                router.push({ 
                  pathname: '/', 
                  query: { ...router.query, category: track.category } }, 
                  undefined, {scroll: false})
            }}>{track.category} 
            </button>
          </span>
      </div>

      {/********/
      /** TAGS MAP */}
      <div className="h-28 flex items-end p-2">
        <div className={`card__tags w-max`}>
          {tags.map((tag: string[], id: number) => (
            <button key={id}
              onClick={(e) => {
                router.query.tag = tag
                  // e.preventDefault()
                  router.push({ 
                    pathname: '/', 
                    query: { ...router.query, tag: tag } }, 
                    undefined, {scroll: false})
              }}>
            <span className={`bg-zinc-800 text-white dark:bg-orange-800 dark:hover:bg-orange-600 hover:text-orange-600 dark:hover:text-zinc-200 rounded-md`}>#{tag}</span>
          </button>
          ))}
          <br /><span className={`text-xs`}> By : {track.reporter} - Posted : {track.datePost.slice(0, 4)} </span>
        </div>
      </div>
    </div>

  )
}
export default AudioPlayer