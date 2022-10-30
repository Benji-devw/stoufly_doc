const Button = ({children, className, onClick}: any) => {
  return (
    <button
      className={`p-2 rounded-md hover:ring-1 hover:ring-orange-600 ${className}`}
      onClick={onClick}
    >{children}</button>
  )
}
export default Button