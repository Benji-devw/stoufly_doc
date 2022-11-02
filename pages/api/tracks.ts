import axios from 'axios';


export async function getTracks(query: any) {

  let esc = encodeURIComponent;
  let queries = Object.keys(query)
    .map(k => esc(k) + '=' + esc(query[k]))
    .join('&');

  
  try {
    const res = await fetch(`http://localhost:8080/tracks/${query ? '?' : ''}${queries}`)
    
      .then(r => r.json())
      return {
        props: {res}
      }
  } catch (err) {
    console.error(err);
  }
}

export async function getAllTracks() {
  try {
    const res = await fetch(`http://localhost:8080/tracks/all`)
    .then(r => r.json())
    return {
      props: {res}
    }
  } catch (err) {
    console.error(err);
  }
}


export async function postTrack(payload: any) {

  await axios
  .post('http://localhost:8080/tracks', payload)
  .then((res) => {
    console.log("File Upload success");
  })
  .catch((err) => console.log("File Upload Error"));
}


