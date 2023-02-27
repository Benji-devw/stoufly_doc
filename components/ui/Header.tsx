import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../ui/Button"
import { useRouter } from 'next/router'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import  AuthPopup  from "../../components/user/authPopup"



const Header = () => {
  const { data: session, status } = useSession()
  
  const router =                                useRouter()
  const [query, setQuery] =                     useState<string>('');
  const {systemTheme, theme, setTheme} =        useTheme()
  const [mountedTheme, setMountedTheme] =       useState<boolean>(false)
  const [ifQueryisEmpty, setIfQueryIsEmpty] =   useState<boolean>(true);
  const [showLogSettings, setShowLogSettings] = useState<boolean>(false);


  useEffect(() => {
    if (!mountedTheme) setMountedTheme(true);
    if (query !== '' ) setIfQueryIsEmpty(false);
    else setIfQueryIsEmpty(true);
  }, [mountedTheme, query, status])


  /********/
  /** LINKS ARRAY */
  const navigation = [
    {label: 'Home', path: '/'},
    {label: 'Post', path: '/post'},
    {label: 'User', path: '/user'},
  ]

  /********/
  /** THEME CHANGER */
  const RenderThemeCanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (!mountedTheme) return null
    return (
      currentTheme === 'dark' ? 
        <Button className="ml-4" onClick={() => setTheme('light')}>
          <svg  className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </Button>
        : 
        <Button className="ml-4" onClick={() => setTheme('dark')}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
         </svg>
        </Button>
    )
  }

  const HandleLogSettings = () => {
    setShowLogSettings(!showLogSettings)
  }


  
  return (
    <div className="header__wrapper bg-zinc-900 text-white">
    <header className="container mx-auto p-2 flex flex-wrap sm:flex-row flex-col justify-between">

      {/********/
      /** LOGO HEADER */}
      <div className="basis-1/4 flex items-center">
        <Image src="/StouflyDoc_Logo.svg" alt="logo" width={50} height={50} />
        <h3 className="text-xl font-bold relative bottom-1 ml-2">StouflyDoc</h3>
      </div>
      
      <div className="basis-1/2">
          <form>
              {/********/
              /** SEARCH BAR HEADER */}
            <div className="Search_Bar relative flex m-2">
              <label htmlFor="Default-Search" className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-zinc-300">Search</label>
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-6 h-6 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" required defaultValue={router.query.search ? router.query.search : ''} id="default-search"  placeholder="Loop, jazz, drop, artiste..."
                className="block caret-orange-600 p-2 pl-10 w-full text-md outline outline-offset-0 outline-0 text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-600  focus:border-orange-600 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-600 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600" 
                onChange={(e) => { setQuery(e.target.value.replace(/\s+/g, ' ').trim())}}
                // onKeyPress={handleKeyPress}
                />
                {/********/
                /** SEARCH BUTTON HEADER */}
                <button disabled={ifQueryisEmpty ? true : false}
                  onClick={(e) => {
                    router.query.search = query.replace(/\s+/g, ' ').trim()
                        e.preventDefault()
                        router.push({ 
                          pathname: '/', 
                          query: { ...router.query, search: query } },
                          undefined, {})
                    }}>  <span className="search__Button bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 p-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Search</span>
                </button>
            </div>
        </form>
      </div>

      {/********/
      /** LINKS HEADER */}
      <div className="basis-1/4 flex items-center relative">
      <Link href={"/"} className="mx-4">Home</Link>

        {navigation.map((nav, id) => (
          nav.label === 'User' ? 
            session ? (
              <div key={id}>
                {/********/
                /** AUTH  */}
                <Image onClick={() => HandleLogSettings()} src={`${session.user!.image}`} alt={`${session.user!.name}`} className="rounded-full cursor-pointer" width='30' height='30' />
                {/* Signed in as {session.user!.email} <br /> */}
                {showLogSettings && 
                  <div className="Auth_Settings z-50 w-48 text-center p-2 absolute right-20 top-16 bg-zinc-900 border border-orange-600 dark:bg-zinc-900 rounded-md shadow-md">
                    <ul className="flex flex-col justify-end">
                      <li className="pb-4 p-2 border-b border-orange-900 dark:border-gray-200 text-center">{session.user!.name}</li>
                      <Link href={`${session.user!.name}`} onClick={() => HandleLogSettings()} className="mx-4 p-2 hover:text-orange-600">Dashboard</Link>
                      <Link href={`${"/post"}`} className="mx-4 p-2 hover:text-orange-600">Post Sample</Link>
                      {/* <li className="p-2">Post Sample</li> */}
                      {/* <Link href={nav.path} className="mx-4">{nav.label}</Link> */}
                      {/* <li className="p-2">Settings</li> */}
                      <button onClick={() => signOut()} className="p-2 border-t border-orange-900 dark:border-gray-200 text-center hover:text-orange-600">Logout</button>      
                    </ul>
                  </div>
                }
              </div>
            ) : (
            <div key={id}>
            <Button className="" onClick={() => AuthPopup("/auth", "")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </Button>
            </div>
          )
          : ""
        ))}
        <RenderThemeCanger />
      </div>
    </header>
    </div>
  )
}

export default Header