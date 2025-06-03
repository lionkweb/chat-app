import { Link } from "react-router-dom";

function ChatRoomPreviewComponent(props) {
  
  return (
    <div className="w-full max-w-xs p-4 bg-white shadow rounded">
      <div>
        Room Number: <span>{props.data.room_number}</span>
      </div>
      <div className="border h-48">
        
      </div>
      <div className="text-center mt-3">
        <Link to={"/chat/" + props.data.room_number}
          className="bg-blue-500 text-white rounded-full w-100 p-2 px-6 font-size-4 hover:bg-blue-800"
        >Chat</Link>
      </div>
    </div>
  );
}

export default ChatRoomPreviewComponent;