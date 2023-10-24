import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

const calendar = () => {
  const [date, changeDate] = useState(new Date());

  function changeValue(val) {
    changeDate(val);
 }

  const test_date = [
    {
      "id": 2,
      "subject": "Test Subject",
      "location": "Test Location",
      "starttime": "2023-11-24T12:00:00.000Z",
      "endtime": "2023-11-24T16:00:00.000Z",
      "categorycolor": "#0000ff"
    },
    {
      "id": 1,
      "subject": "Test Subject",
      "location": "Test Location",
      "starttime": "2023-11-24T12:00:00.000Z",
      "endtime": "2023-11-24T16:00:00.000Z",
      "categorycolor": "#0000ff"
  }
  ]

  return (
    <div>
      <Calendar onChange={changeValue} value={date} />
    </div>
  )
}

export default calendar