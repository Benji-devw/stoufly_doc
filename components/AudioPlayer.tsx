import { useState } from 'react';
import Wave from './Wave';
import Link from 'next/link';
import { useRouter } from 'next/router'


const AudioPlayer = ({track}: any) => {
  const router = useRouter()
  const [tags, setTags] = useState(track.tags.replace(/\s/g, '').split(','))
  return (
    <div className="card fadeIn blurOut p-2 flex dark:bg-zinc-900 bg-zinc-300 rounded-md">

      <div className="wave">
        {/********/
        /** DISPLAY */}
        <Wave url={track.url} bpm={track.bpm} />

        <div className=" flex text-xl text-left py-2"> 
          <h2 className='basis-4/5'>{track.title}</h2> 
            <svg className="w-6 h-6 basis-1/5 mx-auto hover:stroke-orange-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </div>
      </div>

      {/********/
      /** TAGS MAP */}
      <div className="h-28 flex items-end">
        <div className={`tags w-max`}>
          {tags.map((tag: string[], id: number) => (
            <button key={id}
            onClick={(e) => {
              router.query.tag = tag
                 e.preventDefault()
                 router.push({ 
                   pathname: '/', 
                   query: { ...router.query, tag: tag } }, 
                   undefined, {})
             }}>
           <span className="align-middle bg-orange-700 hover:bg-orange-800 rounded-md px-2 mr-1 mb-1">#{tag}</span>
         </button>
          ))}
          <br /><span className={`text-xs`}> By : {track.reporter} - Posted : {track.datePost.slice(0, 4)} </span>
        </div>
      </div>
    </div>

  )
}
export default AudioPlayer