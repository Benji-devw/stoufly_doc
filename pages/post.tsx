import React, { useState } from 'react';
import { getTracks, getAllTracks } from './api/tracks';
import Layout from '@/components/ui/Layout'
import type { NextPageWithLayout } from './_app'
import Image from 'next/image';

interface FormValues {
  url: string;
  title: string;
  tempo: string;
  category: string | any;
  description: string;
  reporter: string;
  tags: string;
  yearCollection: string;
  comments: string;
  price: string;
  likes: string;
  datePost: string;
}

const PostSample: NextPageWithLayout = ({res}: any) => {

  const categorySet =       new Set(res.props.res.state.map((cat: any) => cat.category));
  const catList =           Array.from(categorySet).sort();
  const [alert, setAlert] = useState<null | string>(null);
  const [selectedFile, setSelectedFile] = useState<File | any>(null);
  
  const [formValues, setFormValues] = useState<FormValues>({
    url: '',
    title: '',
    tempo: "",
    category: catList[0],
    description: '',
    reporter: '',
    tags: '',
    yearCollection: '',
    comments: '',
    price: '',
    likes: '',
    datePost: new Date().toISOString()
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let valueChecked: string | number | null = null
    if (name === "price" || name === "tempo" || name === "yearCollection" || name === "likes") {
       valueChecked = name === "price" ? parseFloat(e.target.value) : parseInt(e.target.value);
    } else {
      valueChecked = e.target.value;
    }
    
    setFormValues(prevState => ({ ...prevState, [name]: valueChecked }));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setFormValues(prevState => ({
      ...prevState,
      "category": category,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      Array.from(selectedFile.target.files).forEach((file: any) => {
        formData.append(selectedFile.target.name, file);
      });
      formData.append('url', formValues.url)
      formData.append('title', formValues.title)
      formData.append('tempo', formValues.tempo)
      formData.append('category', formValues.category)
      formData.append('description', formValues.description)
      formData.append('reporter', formValues.reporter)
      formData.append('tags', formValues.tags)
      formData.append('yearCollection', formValues.yearCollection)
      formData.append('comments', formValues.comments)
      formData.append('price', formValues.price)
      formData.append('likes', formValues.likes)
      formData.append('datePost', formValues.datePost)
      
      // const config = {
      //   headers: { 'content-type': 'multipart/form-data' },
      //   onUploadProgress: (event: any) => {
      //     console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      //   },
      // };
    // postTrack(formData)
    
    } else {
      // console.log('file null');
      setAlert('error')
      return;
    }
  }




  
  return (
    <Layout>
      <form 
        encType="multipart/form-data"
        onSubmit={handleSubmit} 
        className={`track__Post__Form px-5 py-5 md:w-2/3 fadeIn mx-auto`}
      >
      
      <h2 className="create-title text-3xl text-center mb-5">Post Sample</h2>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="title">
              Titre
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="title" type="text" name="title" onChange={handleChange} 
              />
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="tempo">
              bpm
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tempo" type="number" name="tempo" onChange={handleChange} placeholder="160"
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="category">
              Ajouter une Categorie
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="category" type="text" name="category" onChange={handleChange} 
                // disabled={true}
              />
              </label>
            </div>
          </div>
           
          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              Categories
              <br />
              <div className="inline-block relative w-full">
                <select name="category" onChange={handleCategoryChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                  <option> --- </option>
                  {catList.map((cat: any, id) => (
                  <option key={id}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="description">
              Description
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description" type="text" name="description" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
          <div className="w-full md:w-1/2">
              <div className="text-center p-2">
                <label className="block mb-2" htmlFor="tags">
                Tags
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="tags" type="text" name="tags" onChange={handleChange} 
                  placeholder="Kick,Loop,Hi-Hat"
                />
                </label>
              </div>
            </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="yearCollection">
              Année
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="yearCollection" type="number" max={2023} name="yearCollection" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">
        <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="reporter">
              Posté par
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="reporter" type="text" name="reporter" onChange={handleChange} 
              />
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-center p-2">
              <label className="block mb-2" htmlFor="comments">
              Commentaire
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="comments" type="text" name="comments" onChange={handleChange} 
              />
              </label>
            </div>
          </div>
        </div>

        <div className="flex content-center flex-wrap">

          <div className="w-full md:w-1/2">
          </div>
          <div className="w-full md:w-1/2">
              <div className="text-center p-2">
                <label className="block mb-2" htmlFor="price">
                Prix
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="price" type="number" name="price" onChange={handleChange} placeholder="3.20 1 0.25"
                />
                </label>
              </div>
            </div>
        </div>
    
        <div className="mt-1 flex justify-center my-3 px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
          {selectedFile !== null ? (
            <div className='content-center'>
              <button onClick={() => setSelectedFile(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 m-2 rounded">X</button>
              {selectedFile.target.files[0].name}
            </div>
          ) : (
          <label
            className="
              mx-auto
              w-64
              flex flex-col
              items-center
              px-4
              bg-white
              rounded-md
              shadow-md
              tracking-wide
              uppercase
              border border-blue
              cursor-pointer
              hover:bg-blue-600 hover:text-white
              ease-linear
              transition-all
              duration-150 "
          >
            <Image src="/cloud-upload-alt-solid.svg" alt="cloud logo" width={112} height={80} />
            <span style={{color: '#FF5901'}} className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e)}
              className="hidden"
              name='SampleFile'
              // label="Upload Single File"
            />
              <p className=" leading-normal text-gray-800">
                WAV, MP3, 10MB
              </p>
          </label>
          )}
        </div>


        <div className={`flex items-center justify-between`}>
          {/* <Button>
            Send
          </Button> */}
        </div>
      </form>

      {alert === 'error' && 
        <div onClick={() => setAlert(null)} className="fixed right-3 top-20 fadeIn bg-red-100 border border-red-400 text-red-700 px-10 py-3 rounded cursor-pointer" role="alert">
          <strong className="font-bold">Fichier Incorrect</strong>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
      }

    </Layout>
  )
}

export default PostSample


// Server side renderer - Rendu coté server
export async function getStaticProps() {
  const res = await getAllTracks()
  return { props: {res} }
}