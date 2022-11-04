const Skeleton = ({style}: any) => {
  return (
    <div style={style} className="skeleton p-2 flex dark:bg-zinc-900 bg-gray-200 rounded-md">
    <div className="image mb-2 flex items-center">
      <span className="h-36 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-28 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-16 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-28 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-10 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-16 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-24 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-10 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
      <span className="h-4 w-2 mr-2 rounded-md dark:bg-orange-900 bg-orange-700"></span>
    </div>
    <div className="content">
      <p className="mb-1 h-4 w-3/4 rounded-md dark:bg-zinc-800 bg-zinc-400"></p>
      <h2 className="mb-2 my-4 h-8 w-2/4 rounded-md dark:bg-zinc-800 bg-zinc-400"></h2>
      <p className="mb-1 my-20 h-8 rounded-md dark:bg-zinc-800 bg-zinc-400"></p>
    </div>
  </div>
  )
}
export default Skeleton