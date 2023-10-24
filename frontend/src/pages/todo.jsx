import React, { useState } from 'react';
import axios from 'axios';

function todo() {

  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const addTodoHandler = () => {
    axios.post('http://127.0.0.1:8000/todo', {
      'title': title,
      'desc': desc
    })
    .then(res => console.log(res))
  }

  return (
    <div>
      <div>
        <span>Enter your To-Do Item</span>
        <div>
          <input onChange={event => setTitle(event.target.value)} placeholder='Title' />
          <input onChange={event => setDesc(event.target.value)} placeholder='Description' />
          <button onClick={addTodoHandler}>
            Add Todo
          </button>
        </div>
      </div>
    </div>
  )
}

export default todo