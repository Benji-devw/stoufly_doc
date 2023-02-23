// import Image from "next/image"

const Footer = () => {
  
  return (
    <footer className="flex flex-row justify-center p-2 mt-6">
      {new Date().getFullYear()} - <span className="mr-2 ml-2">Product by Jamin_dev_art </span> - <span className="mr-2 ml-2">Stouflydoc version test</span>
        {/* <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank" rel="noopener noreferrer" >
          Powered by{' JaminCode'}
          <span className={""}> <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> </span>
        </a> */}
    </footer>
  )
}

export default Footer