import axios from 'axios';


export async function getTracks(query: any) {
  // console.log(query);
  // &_limit=${query._limit}
  // let url = ``
  // if (query._limit != undefined) {
  //   url = `http://localhost:8080/tracks/${query.category !== undefined ? `?category=${query.category}&_limit=${query._limit}` : `?_limit=${query._limit}` }`
  // } else {
  //   url = `http://localhost:8080/tracks/?_limit=${5}`
  // }
  
  try {
    const res = await fetch(`http://localhost:8080/tracks/${query.category !== undefined ? `?category=${query.category}` : `` }`)
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


