import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../ui/Button"
import Router from 'next/router';
import { useRouter } from 'next/router'
import Image from "next/image";


const Header = () => {

  const router = useRouter()
  const {systemTheme, theme, setTheme} = useTheme()
  const [mountedTheme, setMountedTheme] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);


  useEffect(() =>  {
    if (!mountedTheme) {setMountedTheme(true);}
    if (query !== '' ) setIsEmpty(false);
    else setIsEmpty(true);
  }, [mountedTheme, query])


  /********/
  /** SEARCH BAR ENTER E.KEY */
  // const handleKeyPress = (e: any) => {
  //   if (query === null) return;
  //   else if (e.key === 'Enter') {
  //     e.preventDefault()
  //     router.query.search = query
  //     router.push({ 
  //         pathname: '/', 
  //         query: { ...router.query, search: query } }, 
  //         undefined, 
  //         {})
  //   }
  // }
  

  /********/
  /** LINKS ARRAY */
  const navigation = [
    {label: 'Home', path: '/'},
    {label: 'Create', path: '/create'},
    {label: 'Login', path: '/login'},
  ]

  /********/
  /** THEME CHANGER */
  const RenderThemeCanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (!mountedTheme) return null
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
    <header className="container mx-auto p-2 flex flex-wrap sm:flex-row flex-col justify-between">
      <div className="basis-1/4 flex items-center"><Image src="/StouflyDoc_Logo.svg" alt="logo" width={50} height={50} /><h3 className="text-xl font-bold relative bottom-1 ml-2">StouflyDoc</h3></div>
      
      <div className="basis-1/2">
          <form>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-zinc-300">Search</label>
            <div className="relative flex item-center">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              {/********/
              /** SEARCH BAR HEADER */}
              <input type="search" required defaultValue={router.query.search ? router.query.search : ''} id="default-search"  placeholder="Loop, jazz, drop..."
                className="block p-4 pl-10 w-full text-md outline outline-offset-0 outline-0 text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-600  focus:border-orange-600 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-600 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600" 
                onChange={(e) => { setQuery(e.target.value)}}
                // onKeyPress={handleKeyPress}
                />
                {/********/
                /** SEARCH BUTTON HEADER */}
                <button disabled={isEmpty ? true : false}
                  onClick={(e) => {
                    router.query.search = query
                        e.preventDefault()
                        router.push({ 
                          pathname: '/', 
                          query: { ...router.query, search: query } },
                          undefined, {})
                    }}>  <span className="absolute right-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Search</span>
                </button>
            </div>
        </form>
      </div>

      {/********/
      /** LINKS HEADER */}
      <div className="basis-1/4 flex items-center">
        {navigation.map((nav, id) => (
          <Link key={id} href={nav.path} className="mr-4 ml-4">{nav.label}</Link>
        ))}
        <RenderThemeCanger />
      </div>
    </header>
  )
}

export default Header