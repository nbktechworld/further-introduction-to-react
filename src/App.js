import "./styles.css";
import React from "react";

export default function App() {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("hello");

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        titles = posts.slice(0, 10).map((post) => post.title);
        setMessages(titles);
      });
  }, []);

  function onSendClick(event) {
    setMessages([...messages, newMessage]);
    setNewMessage("");
  }

  function onNewMessageChange(event) {
    setNewMessage(event.target.value);
  }

  return (
    <>
      <div className="App">
        {messages.map((message) => (
          <div className="message">{message}</div>
        ))}
      </div>
      <div className="send-box">
        <input type="text" value={newMessage} onChange={onNewMessageChange} />
        <button type="button" onClick={onSendClick}>
          Send
        </button>
      </div>
    </>
  );
}
