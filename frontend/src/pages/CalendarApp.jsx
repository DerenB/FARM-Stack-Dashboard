import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
// Import Big Calendar and Moment

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

    const [dataList, setDataList] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/calendar')
        .then(res => {
            setDataList(res.data)
        })
    }, []);

    console.log(dataList);

    const events = [
        {
            title: "Test Event",
            start:"2023-11-03T10:00:00.000Z",
            end:"2023-11-03T12:00:00.000Z",
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

    return (
        <div>
            <div>
                <p>Filter By Category</p>
                <label>
                    <input type='checkbox' checked={schoolChecked} onChange={handleSchoolChange} />School
                </label>
                <label>
                    <input type='checkbox' checked={workChecked} onChange={handleWorkChange} />Work
                </label>
            </div>
            <Calendar 
                localizer={localizer}
                events={dataList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
            />
        </div>
    )
}

export default CalendarApp