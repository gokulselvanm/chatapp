export default function chatBubble(props){

    if(props.sending===true){
        {/*for messages that we are sending */}
        return(
        <div className="chat chat-end">
          <div className="chat-bubble">
            {props.content}
          </div>
        </div>
        );
    }else{
        {/*for messages that we are receiving*/} 
        return(
            <div className="chat chat-start">
              <div className="chat-bubble">
            {props.content}
              </div>
            </div>
        )
    }
}
