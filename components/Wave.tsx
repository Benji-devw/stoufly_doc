// import WaveSurfer from "wavesurfer.js";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';



const Wave = ({url, tempo}:any) => {
   
  const waveformRef = useRef(null!);
  const wavesurfer = useRef<any>(waveformRef);
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')


  // Calcule and format Time
    const calculateCurrentTime = (value: any) => {
      let seconds: any = Math.floor(value % 60);
      let minutes = Math.floor((value / 60) % 60);
      if (seconds < 10) seconds = "0" + seconds;
      return minutes + ":" + seconds;
  }
  const calculateDuration = (value: any) => {
      let seconds: any = Math.floor(value % 60);
      let minutes = Math.floor((value / 60) % 60);
      const milliseconds = Math.floor(value * 1000);
      if (seconds < 10) {
          if (seconds <= 0) seconds = `0${Math.floor(milliseconds / 10)}`;
          else seconds = "0" + seconds;
      }
      return seconds > 0 ? minutes + ":" + seconds : seconds
  }


  
  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
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
    wavesurfer.load(url)
    wavesurfer.on("ready", () => {
      setDuration(calculateDuration(wavesurfer.getDuration()))
      wavesurfer.setVolume(1);
      if (isPlaying) wavesurfer.playPause()
      else wavesurfer.pause(); setCurrentTime('0:00');
  });
  wavesurfer.on("audioprocess", () => {
      setCurrentTime(calculateCurrentTime(wavesurfer.getCurrentTime()))
  })
  return () => wavesurfer.destroy();
}, [wavesurfer, url, isPlaying, waveformRef])




  return (
    <>
      {/* <div ref={waveformRef} onClick={() => setIsPlaying(!isPlaying)}></div> */}
      <div ref={waveformRef} onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() =>setIsPlaying(false)}></div>
      <div className={`flex text-left py-2`}> 
          <span className='basis-2/3'>... {tempo ? `${tempo} bpm` : ''} </span>
            
          <div className='basis-2/3 relative'> 
            <svg className="w-6 h-6 time stroke-orange-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{currentTime} / {duration }</span>
          </div>

       
          <Link className='basis-1/3 download' href={url} download passHref>
            <svg className="w-6 h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </Link>
      </div>
    </>
  )
}
export default Wave