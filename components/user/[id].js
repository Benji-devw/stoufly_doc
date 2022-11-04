import React, {useState, useEffect} from "react";
import Layout from "@/components/Layout";
import { useSession } from 'next-auth/client';
import Cookies from 'js-cookie';
import Router from 'next/router';


export default function Profile () {

  const [session] = useSession();
  const [user, setUser] = useState();
  const [datas, setDatas] = useState([])


  useEffect(() => {
    const item = window.localStorage.getItem('user')

    if (item) {
      setDatas(user);
    }
   else if (session) { 
      setDatas(session);
    }

    if (!user && !session) Router.push('/'); 
  }, [user, session, setUser, setDatas])



  console.log(session);
  console.log(user);
  console.log(datas);

  return (
    <Layout page={'Profile'}>
          {session || user ?
            <>
              <h2 className="text-3xl text-white">Welcom {}</h2>
                  
            </>
          : ""
          }
    </Layout>

  )
}
