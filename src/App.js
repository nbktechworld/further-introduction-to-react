import "./styles.css";
import React from "react";

export default function App() {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("hello");

  React.useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        const titles = posts.slice(-10).map((post) => post.title);
        setMessages(titles);
      });
  }, []);

  function onSendClick(event) {
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      body: JSON.stringify({ title: newMessage }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    }).then((createdPost) => {
      setMessages([...messages, newMessage]);
      setNewMessage("");
      // throw new Error('failed!') // error simulation to test .catch below
    }).catch((error) => {
      // handle the error somehow.
      // setError('Failed to post message')
    });
    

  }

  function onNewMessageChange(event) {
    setNewMessage(event.target.value);
  }

  return (
    <>
      <div className="App">
        {messages.map((message, index) => (
          <div className="message" key={index}>{message}</div>
        ))}
      </div>
      <div className="send-box">
        <input type="text" value={newMessage} onChange={onNewMessageChange} />
        <button type="button" onClick={onSendClick}>
          Send
        </button>
      </div>
      {/* {error && <div>{error}</div>} */}
    </>
  );
}
