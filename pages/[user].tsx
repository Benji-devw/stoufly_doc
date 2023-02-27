import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getSession  } from "next-auth/react"
import Layout from '@/components/ui/Layout';
// import { getAllTracks } from './api/tracks';
// import AudioPlayer from "@/components/AudioPlayer";
// import Skeleton from '@/components/ui/skeletonCard'


export default function User() {
  const router = useRouter()
  const { data: session, status } = useSession()
  // const [datas, setDatas] = useState([])

  useEffect(() => {
    if (status === "loading") <div>Loading...</div>;
    if (!session) router.push('/');
  },[status, session, router])

    return (
      <Layout page={`Stouflydoc - Dashboard ${session!.user!.name}`}>
        {session &&
          <div className={`flex justify-center align-middle h-full flex-wrap`}>
            <div  className={`w-full m-4`}>
                <h2 className="text-4xl">Dashboard </h2>
            </div>
            {/* <div className={`w-full mx-3 my-2`}></div> */}
          </div>
        }
      </Layout>
    )
}

// export async function getServerSideProps({ query }: any) {
//   const res = await getAllTracks()
//   return { props: {res, query} }
//   }