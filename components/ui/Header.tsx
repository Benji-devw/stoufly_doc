import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../ui/Button"
import Script from 'next/script'


const Header = () => {
  const {systemTheme, theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() =>  {
    setMounted(true)
  },[])

  const navigation = [
    {label: 'Home', path: '/'},
    {label: 'Create', path: '/create'},
    {label: 'Create', path: '/create'},
    {label: 'Create', path: '/create'},
  ]

  const RenderThemeCanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (!mounted) return null
    return (
      currentTheme === 'dark' ? 
        <Button className="" onClick={() => setTheme('light')}>
          <svg  className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </Button>
        : 
        <Button className="" onClick={() => setTheme('dark')}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
         </svg>
        </Button>
    )
  }




  return (
    <header className="container mx-auto p-2 flex sm:flex-row flex-col justify-between">
      <div className="basis-1/4 flex items-center">01</div>
      
      <div className="basis-1/2">
          <form>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm outline outline-offset-0 outline-0 text-gray-900 bg-gray-50 rounded-lg border border-gray-600  focus:border-orange-600 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-700 dark:hover:bg-orange-600 dark:focus:ring-orange-800">Search</button>
            </div>
        </form>
      </div>

      <div className="basis-1/4 flex items-center">
        {navigation.map((nav, id) => (
          <Link key={id} href={nav.path} className="mr-4 ml-4">{nav.label}</Link>
        ))}
      </div>

      <div className="basis-1/4 flex items-center">
        <RenderThemeCanger />
      </div>
      <Script src="https://unpkg.com/wavesurfer.js" />

    </header>
  )
}

export default Header