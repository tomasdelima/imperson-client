const Circle = ({ fill }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill={fill}
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
    />
  </svg>
}

export default Circle
