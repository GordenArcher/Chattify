import Image from '../assets/images/no-select.svg'

const Selected = () => {
  return (
    <div className='no_chat_selected'>
        <div className="no-select-wrap">
            <div className="no-container">
                <div className="no-img">
                    <img src={Image} alt="no chat selected image" />
                </div>

                <div className="empty_select_messagew">
                    <div className="empt_select_message_sm">
                        <p>Start a Conversation <i className="bi bi-person-raised-hand"></i></p>
                    </div>
                    <div className='empt_select_message_lg'>
                        <h4>Choose from your existing conversations, start a new one, or just keep swimming.</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Selected