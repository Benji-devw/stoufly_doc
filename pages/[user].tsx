import React, { useEffect, useState } from "react";
import Layout from '@/components/ui/Layout';
import { useRouter } from 'next/router'
// import { getAllTracks } from './api/tracks';
// import AudioPlayer from "@/components/AudioPlayer";
// import Skeleton from '@/components/ui/skeletonCard'

import { useSession, signIn, signOut, getSession  } from "next-auth/react"


export default function User() {

  const router = useRouter()
  const { data: session, status } = useSession()
  // const [datas, setDatas] = useState([])

  
  useEffect(() => {
    // const item = window.localStorage.getItem('user')
    // if (!session) router.push('/')

    // if (status === "unauthenticated") {
    //  return;
    // }
      
  //  else if (session) { 
  //     setDatas(session);
  //   }

  return () => {
    if (status === "loading") {
      router.push('/')
    }
  }
    // else return router.push('/'); 
  }, [router, status])

    return (
      <Layout page={`Dashboard`}>
        <div className={`flex justify-center align-middle h-full flex-wrap`}>
          
          <div  className={`w-full m-4`}>
              <h2 className="text-4xl">Dashboard </h2>
          </div>

          {/* <div className={`w-full mx-3 my-2`}></div> */}
          
        </div>
      </Layout>
    )
}


// export async function getServerSideProps({ query }: any) {
//   const res = await getAllTracks()
//   return { props: {res, query} }
//   }