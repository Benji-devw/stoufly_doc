// import WaveSurfer from "wavesurfer.js";
import { useState, useEffect, useRef } from 'react'




const Wave = ({url, tempo}:any) => {
   
  const waveformRef = useRef(null!);
  const wavesurfer = useRef<any>(waveformRef);
  const [isPlaying, setIsPlaying] = useState(false)


    // Calcule Time
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


    const [duration, setDuration] = useState('0:00')
    const [currentTime, setCurrentTime] = useState('0:00')
  
  useEffect(() => {

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ff5901',
      progressColor: 'orange',
      barWidth: 2,
      responsive: true,
      hideScrollbar: true,
      // barRadius: 1
  })

  wavesurfer.current.load(url);
  wavesurfer.current.on("ready", function() {
    setDuration(calculateDuration(wavesurfer.current.getDuration()))
    wavesurfer.current.setVolume(1);
    if (isPlaying) wavesurfer.current.play();
    else wavesurfer.current.pause(); setCurrentTime('0:00');
});
wavesurfer.current.on("audioprocess", function() {
    setCurrentTime(calculateCurrentTime(wavesurfer.current.getCurrentTime()))
})

return () => wavesurfer.current.destroy();
}, [wavesurfer, url, isPlaying])





  return (

          <>
            <div ref={waveformRef} onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() =>setIsPlaying(false)}></div>
            <div className={`text-gray-400 text-md text-left py-2`}> 
                ... <span>{tempo ? `${tempo}bpm` : ''} </span>
                <span className='ml-2'> {currentTime} /</span>
                <span> {duration }</span>
                <span className={``}>
                {/* <Link href={url} download passHref><a><AiOutlineDownload /></a></Link> */}
                </span>
            </div>
            
        </>

  )
}
export default Wave