// import WaveSurfer from "wavesurfer.js";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';

type IWaveProps = {
  url: string
  bpm: number
}


const Wave = ({url, bpm}: IWaveProps) => {
   
  const wavesurfer =                  useRef<any>(null);
  const waveformRef =                 useRef<any>(null);
  const [isPlaying, setIsPlaying] =   useState(false)
  const [duration, setDuration] =     useState<number | string>('0:00')
  const [currentTime, setCurrentTime] = useState<number | string>('0:00')
  
  /********/
  /** CALCULATE AND FORMATO TIME TRACKS */
    // const calculateCurrentTime = (value: any) => {
    //   let seconds: number | string = Math.floor(value % 60);
    //   let minutes: number | string = Math.floor((value / 60) % 60);
    //   if (seconds < 10) seconds = "0" + seconds;
    //   return minutes + ":" + seconds;
    // }
    // const calculateDuration = (value: any) => {
    //   let seconds: number | string = Math.floor(value % 60);
    //   let minutes: number | string = Math.floor((value / 60) % 60);
    //   const milliseconds: number | string = Math.floor(value * 1000);
    //   if (seconds < 10) {
    //       if (seconds <= 0) seconds = `0${Math.floor(milliseconds / 10)}`;
    //       else seconds = "0" + seconds;
    //   }
    //   return seconds > 0 ? minutes + ":" + seconds : seconds
    // }


  
  useEffect(() => {
      return () => {
        createWave()
        if (wavesurfer.current) wavesurfer.current.destroy();
      }
  }, [])


  /********/
  /** WAVE CREATE */
  const createWave = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;
    if (!wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ea580c',
        progressColor: '#9a3412',
        // cursorColor: 'black',
        cursorWidth: 1,
        barWidth: 3,
        responsive: true,
        hideScrollbar: true,
        barGap: 3,
        barRadius: 2
      });
  
      wavesurfer.current.load(url);
      wavesurfer.current.on("ready", () => {
        // setDuration(calculateDuration(wavesurfer.current.getDuration()))
        setDuration(wavesurfer.current.getDuration().toFixed(1))
        wavesurfer.current.setVolume(1);
      });
      wavesurfer.current.on("audioprocess", () => {
        // setCurrentTime(calculateCurrentTime(wavesurfer.current.getCurrentTime()))
        setCurrentTime(wavesurfer.current.getCurrentTime().toFixed(1))
      })
      wavesurfer.current.on("play", () => setIsPlaying(true));
      wavesurfer.current.on("pause", () => setIsPlaying(false));
    }
  };

  /********/
  /** WAVE PLAY AND PAUSE */
  const togglePlayback = () => {
    if (!isPlaying) wavesurfer.current.play();
     else wavesurfer.current.pause();
  };


  return (
    <>
      {/********/
      /** WAVE DISPLAY */}
      <div ref={waveformRef}></div>
      
      {/********/
      /** WAVE PLAY AND PAUSE */}
      <div className="card__controls">
        {!isPlaying ? (
          <div onClick={togglePlayback}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:stroke-orange-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
          </div>
        ) : (
          <div onClick={togglePlayback}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8  cursor-pointer hover:stroke-orange-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
          </div>
        )}
      </div>

      {/********/
      /** WAVE PROPS */}
      <div className={`flex text-left py-2`}> 
          <span className='basis-2/3'>... {bpm ? `${bpm} bpm` : ''} </span>
            
          <div className='basis-2/3 relative'> 
            <svg className="card__time w-6 h-6 stroke-orange-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{currentTime} / {duration }</span>
          </div>

          <Link className='basis-1/3 card__download' href={url} download passHref>
            <svg className="w-6 h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </Link>
      </div>
    </>
  )
}
export default Wave