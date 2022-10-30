import Wave from './Wave';


const AudioPlayer = ({track}:any) => {
  return (
    <div className="">
      <Wave url={track.url} id={track._id} tempo={track.tempo} />
  </div>
  )
}
export default AudioPlayer