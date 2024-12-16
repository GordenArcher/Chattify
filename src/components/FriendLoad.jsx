import { LineWave } from 'react-loader-spinner'
const FriendLoad = () => {
  return (
    <div className="spin mid">
        <LineWave
        visible={true}
        height="150"
        width="150"
        color="#fff"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
        />
    </div>
  )
}

export default FriendLoad
