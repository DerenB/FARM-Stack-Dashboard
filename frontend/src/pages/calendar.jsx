import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const calendar = () => {

  const events = [
    {
      start:moment('2023-10-24T10:00:00').toDate(),
      end:moment('2023-10-24T12:00:00').toDate(),
      title:"Test Event"
    },
    {
      start:moment('2023-10-24T11:00:00').toDate(),
      end:moment('2023-10-24T13:00:00').toDate(),
      title:"Event 2"
    },
  ]

  const [id, setId] = useState();
  const [subject, setSubject] = useState();
  const [category, setCategory] = useState();
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();

  const addCalenderItemHandler = () => {
    axios.post('htt[://127.0.0.1:8000/calendar', {
      'id': id,
      'subject': subject,
      'category': category,
      'starttime': starttime,
      'endtime': endtime
    })
    .then(res => console.log(res))
  }

  return (
    <div>
      <div className='flex h-screen bg-sky-500 p-10 border-black' style={{ }}>
        <Calendar 
          className='h-full w-full m-auto bg-red-300 border-black'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
      <div>
        <span>Enter New Calendar Item</span>
        <form onSubmit={addCalenderItemHandler}>
          <label>
            Category:
            <select onChange={event => setCategory(event.target.value)}>
              <option value="school">School</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
              <option value="other">Other</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
    
  )
}

export default calendar;
