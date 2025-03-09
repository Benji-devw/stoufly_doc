import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import type WaveSurfer from 'wavesurfer.js';


interface IWaveProps {
  url: string;
  bpm: number;
}


const Wave = ({url, bpm}: IWaveProps) => {
   
  const waveform = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] =   useState(false);
  const [duration, setDuration] =     useState<number | string>('0:00');
  const [currentTime, setCurrentTime] = useState<number | string>('0:00');
  const [isReady, setIsReady] = useState(false);

  
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


      /********/
  /** WAVE CREATE */
  const createWave = async () => {
    if (waveformRef.current && !waveform.current) {
      try {
        const WaveSurfer = (await import("wavesurfer.js")).default;
        waveform.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#ea580c',
          progressColor: '#9a3412',
          // cursorColor: 'black',
          cursorWidth: 2,
          barWidth: 3,
          height: 122,
          hideScrollbar: true,
          barGap: 2,
          barRadius: 2,
          normalize: true,
          backend: "WebAudio",
        });
  
        waveform.current.load(url);
        waveform.current.on("ready", () => {
          // setDuration(calculateDuration(waveform.current.getDuration()));
          setDuration(waveform.current?.getDuration().toFixed(1) || '0:00');
          waveform.current?.setVolume(1);
          setIsReady(true);
        });
        waveform.current.on("audioprocess", () => {
          // setCurrentTime(calculateCurrentTime(waveform.current.getCurrentTime()));
          setCurrentTime(waveform.current?.getCurrentTime().toFixed(1) || '0:00');
        });
        waveform.current.on("play", () => setIsPlaying(true));
        waveform.current.on("pause", () => setIsPlaying(false));
      } catch (error) {
        console.error("Erreur lors de la création de WaveSurfer:", error);
      }
    }
  };

  useEffect(() => {
    // Réinitialiser l'état si l'URL change
    setIsReady(false);
    
    // Détruire l'instance précédente si elle existe
    if (waveform.current) {
      waveform.current.destroy();
      waveform.current = null;
    }
    
    // Créer une nouvelle instance après un court délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      createWave();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (waveform.current) {
        waveform.current.destroy();
        waveform.current = null;
      }
    };
  }, [url]);

  /********/
  /** WAVE PLAY AND PAUSE */
  const togglePlayback = () => {
    if (!waveform.current || !isReady) return;
    
    if (!isPlaying) {
      waveform.current.play();
    } else {
      waveform.current.pause();
    }
  };





  return (
    <>
      {/********/
      /** WAVE DISPLAY */}
      <div className="wave__wrapper  bg-zinc-900 rounded-md">
        <div ref={waveformRef} id="waveform" className="wave"></div>
      </div>
      
      {/********/
      /** WAVE PLAY AND PAUSE */}
      <div className="card__controls p-2">
        {!isPlaying ? (
          <div onClick={togglePlayback} className={!isReady ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:stroke-orange-600">
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
      <div className={`flex text-left p-2`}> 
          <span className='basis-2/3'>... {bpm ? `${bpm} bpm` : ''} </span>
            
          <div className='basis-2/3 relative'> 
            <svg className="card__time w-6 h-6 stroke-orange-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{currentTime} / {duration}</span>
          </div>

          <a 
            className='basis-1/3 card__download cursor-pointer' 
            href={url} 
            download={`track-${new Date().getTime()}.mp3`}
            onClick={(e) => {
              e.preventDefault();
              // Créer un élément a temporaire pour forcer le téléchargement
              const link = document.createElement('a');
              link.href = url;
              link.download = `track-${new Date().getTime()}.mp3`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <svg className="w-6 h-6 mx-auto hover:stroke-orange-600 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </a>
      </div>
    </>
  )
}
export default Wave