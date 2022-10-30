const Skeleton = ({style}: any) => {
  return (
    <div style={style} className="skeleton p-2 flex dark:bg-gray-900 bg-gray-300 rounded-md">
    <div className="image mb-2 rounded-md dark:bg-gray-800 bg-gray-200"></div>
    <div className="content">
      <h2 className="mb-2 h-8 w-2/4 rounded-md dark:bg-gray-800 bg-gray-200"></h2>
      <p className="mb-1 h-4 w-3/4 rounded-md dark:bg-gray-800 bg-gray-200"></p>
      <p className="mb-1 h-4 rounded-md dark:bg-gray-800 bg-gray-200"></p>
    </div>
  </div>
  )
}
export default Skeleton