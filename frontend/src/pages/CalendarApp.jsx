import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
// Import Big Calendar and Moment

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// Create Localizer
const localizer = momentLocalizer(moment);

const CalendarApp = (props) => {

    const [schoolChecked, setSchoolChecked] = useState(false);
    const [workChecked, setWorkChecked] = useState(false);
    const handleSchoolChange = () => {
        setSchoolChecked(!schoolChecked);
        
    };
    const handleWorkChange = () => {
        setWorkChecked(!workChecked);
    };

    const events = [
        {
            title: "Test Event",
            start:moment('2023-11-02T11:00:00').toDate(),
            end:moment('2023-11-02T13:00:00').toDate(),
            allDay: false,
            resource: "school"
        },
        {
            title:"Event 2",
            start:moment('2023-11-02T11:00:00').toDate(),
            end:moment('2023-11-02T13:00:00').toDate(),
            allDay: true,
            resource: "work"
        },
    ]

    // ---------- ---------- ---------- ----------

    // Variable for getting Database calendar events
    const [dataList, setDataList] = useState([])

    // UseEffect for getting database calendar events and setting to dataList
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/calendar')
        .then(res => {
            setDataList(res.data)
        })
    }, []);

    // Iterates over the dataList and converts the date string to a DateTime
    const appointments = dataList.map(appointment =>({
        title: appointment.title,
        start: new Date(appointment.start), 
        end: new Date(appointment.end), dataList:{appointment},
        allDay: appointment.allDay,
        resource: appointment.resource
    }))

    // Create a new Event Item
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [allDay, setAllDay] = useState();
    const [resource, setResource] = useState("");

    // Category Resource options
    const resourceOptions = [
        { value: 'school', label: 'School' },
        { value: 'work', label: 'Work' },
        { value: 'home', label: 'Home' },
        { value: 'other', label: 'Other' }
    ]

    // All Day Options
    const allDayOptions = [
        { value: true, label: "All Day" },
        { value: false, label: "Hourly" }
    ]

    // Add new Event to the Database
    const addEventHandler = () => {
        axios.post('http://127.0.0.1:8000/calendar', {
            'title': title,
            'start': start,
            'end': end,
            'allDay': allDay.value,
            'resource': resource.value
        })
        .then(res => console.log(res))
    };

    return (
        <div>
            <div className='flex flex-col w-96 ml-10 mt-5 mb-5'>
                <input type='text' placeholder='Title' className='mb-5 p-2 form-control outline' onChange={event => setTitle(event.target.value)} />
                <div>Start Date Time:</div>
                <DateTimePicker onChange={setStart} value={start} className='mb-5' />
                <div>End Date Time:</div>
                <DateTimePicker onChange={setEnd} value={end} className='mb-5' />
                <label>
                    All Day?:
                    <Select options={allDayOptions} onChange={setAllDay} className='mb-5 p-2' />
                </label>
                <label>
                    Category:
                    <Select options={resourceOptions} onChange={setResource} className='mb-5 p-2' />
                </label>
                <button onClick={addEventHandler} className='btn outline'>Add Event</button>
            </div>

            {/* <div>
                <p>Filter By Category</p>
                <label>
                    <input type='checkbox' checked={schoolChecked} onChange={handleSchoolChange} />School
                </label>
                <label>
                    <input type='checkbox' checked={workChecked} onChange={handleWorkChange} />Work
                </label>
            </div> */}

            <Calendar 
                localizer={localizer}
                events={appointments}
                titleAccessor='title'
                startAccessor="start"
                endAccessor="end"
                allDayAccessor="allDay"
                resourceAccessor='resource'
                defaultView='week'
                style={{ height: 900 }}
            />

            <div className='m-10'>
                .
            </div>
        </div>
    )
}

export default CalendarApp