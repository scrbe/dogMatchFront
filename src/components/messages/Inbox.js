import React, { useEffect } from "react";
import { getMessagesService } from "../../service/message.service";
import { Link } from "react-router-dom";

function Inbox() {
  const [inbox, setInbox] = React.useState([]);

  async function getAllMessages() {
    try {
      const { data: messages } = await getMessagesService();
      console.log("messages :>> ", messages);
      setInbox(messages);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <div className="dog-list">
      <h2>HOLA</h2>
      <p>
        {/* {inbox.outbox.map((message) => {
          return (
            <div>
              <p>{message.message}</p>
            </div>
          );
        })} */}
      </p>
      {/* {inbox.outbox.map((message) => {
        return (
          <div key={message._id}>
            <h4>
              Author: <span className="dog-info">{message.author}</span>{" "}
            </h4>
            <h4>
              Message for dog: <span className="dog-info">{message.dog}</span>
            </h4>
            <p>{message.message}</p>
          </div>
        );
      })} */}
    </div>
  );
}

export default Inbox;
