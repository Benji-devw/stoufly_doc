const API_URL = process.env.ENV === 'dev' ? process.env.NEXT_LOCAL_API_URL : process.env.NEXT_PUBLIC_API_URL;

/********/
/** GET TRACKS WITH QUERY */
export async function getTracks(query: any) {
  // Si query est undefined, initialiser comme un objet vide
  query = query || {};

  let esc = encodeURIComponent;
  let queries = Object.keys(query)
    .map(k => esc(k) + '=' + esc(query[k]))
    .join('&');

  try {
    const response = await fetch(`${API_URL}/tracks/${Object.keys(query).length > 0 ? '?' : ''}${queries}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const res = await response.json();
    return {
      props: { res }
    };
  } catch (err) {
    console.error("Erreur lors de la récupération des pistes:", err);
    // Retourner un objet avec un état vide plutôt que undefined
    return {
      props: { 
        res: { 
          state: [] 
        } 
      }
    };
  }
}

/********/
/** GET ALL TRACKS FOR MAP CAT TAG ...  */
export async function getAllTracks() {
  try {
    const response = await fetch(`${API_URL}/tracks/all`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const res = await response.json();
    return {
      props: { res }
    };
  } catch (err) {
    console.error("Erreur lors de la récupération de toutes les pistes:", err);
    return {
      props: { 
        res: { 
          state: [] 
        } 
      }
    };
  }
}

/********/
/** POST TRACKS */
// export async function postTrack(payload: any) {
//   await axios
//   .post('http://localhost:8080/tracks', payload)
//   .then((res) => {
//     console.log("File Upload success");
//   })
//   .catch((err) => console.log("File Upload Error"));
// }


