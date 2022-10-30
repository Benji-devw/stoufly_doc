import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'


const Create: NextPageWithLayout = () => {
  
  return (
    <Layout page={"Create"}>
    <div className="grid min-h-screen place-items-center">
      <div>
      <h1 className="text-3xl">Create</h1>
      </div>
    </div>
    </Layout>
  )
}

export default Create
