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

  return (
    <div className='flex h-screen bg-sky-500 p-10 border-black' style={{ }}>
      <Calendar 
        className='h-full w-full m-auto bg-red-300 border-black'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default calendar;
