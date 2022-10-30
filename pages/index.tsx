import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'


const Home: NextPageWithLayout = () => {
  const [platforms, setPlatforms] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/platforms')
      .then(res => res.json())
      .then(setPlatforms)
      .catch(console.error);
  }, [])

  
  return (
    <Layout page={"index"}>
    <div className="grid min-h-screen place-items-center">
      <div>
      <h1 className="text-3xl">Deploy this !</h1>
        {platforms.map((pl, id) => (
          <p key={`platform-${id}`} className="text-center"> {pl} </p>
        ))}
      </div>
    </div>
    </Layout>
  )
}

export default Home
