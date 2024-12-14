import { Bars } from 'react-loader-spinner'

export const Loader = () => {
  return (
    <div className="spin">
        <Bars
        height="30"
        width="30"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
  )
}
