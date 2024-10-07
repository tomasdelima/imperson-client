import { useTheme } from '@mui/material'

const Loading = () => {
  const { palette } = useTheme()
  const fill = palette.text.primary

  return <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle
      fill={fill}
      cx="4"
      cy="12"
      r="3"
    >
      <animate
        id="spinner_1"
        begin="0;spinner_3.end+0.25s"
        attributeName="cy"
        calcMode="spline"
        dur="0.6s"
        values="12;6;12"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
      />
    </circle>
    <circle
      fill={fill}
      cx="12"
      cy="12"
      r="3"
    >
      <animate
        begin="spinner_1.begin+0.1s"
        attributeName="cy"
        calcMode="spline"
        dur="0.6s"
        values="12;6;12"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
      />
    </circle>
    <circle
      fill={fill}
      cx="20"
      cy="12"
      r="3"
    >
      <animate
        id="spinner_3"
        begin="spinner_1.begin+0.2s"
        attributeName="cy"
        calcMode="spline"
        dur="0.6s"
        values="12;6;12"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
      />
    </circle>
  </svg>
}

export default Loading
