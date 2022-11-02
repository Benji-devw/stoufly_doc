import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'

  /*******/
  /** PROPS TO CALL */
  // const containerRef = useRef<any>()
// const [ ref, isVisible ] = IntersectingObserver({
//   root: null,       rootMargin: "0px",
//   threshold: 1.0,   ref: loadMoreRef
// })

const IntersectingObserver = (options: any) => {

  /*******/
  /** OBSERVER FOR LOAD MORE */
  // const containerRef = useRef<any>()
  const router = useRouter()
  const [ isVisible, setIsVisible] = useState(false)
  const callbackFunction = (entries: any) => {
    const [ entry ] = entries
    setIsVisible(entry.isIntersecting)
  }
  // const [ skip, setSkip ] = useState<number>(15)
  
  useEffect(() => {
    // if (isVisible) {
    //   setSkip(skip + 15)
    //   router.push({ 
    //     pathname: '/', 
    //     query: { ...router.query, skip:  skip + 15 } },
    //     undefined, { shallow: true})
    // }
    const observer = new IntersectionObserver(callbackFunction, options)
    if (options.ref.current) observer.observe(options.ref.current)
    return () => {
      if (options.ref.current) observer.unobserve(options.ref.current)
    }
  }, [options.ref, options, isVisible,router])
  
  return [options.ref, isVisible]
}

export default IntersectingObserver