import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// Import Big Calendar and Moment

// Create Localizer
const localizer = momentLocalizer(moment);

const CalendarApp = (props) => {

    const [schoolChecked, setSchoolChecked] = useState(false);
    const [workChecked, setWorkChecked] = useState(false);

    const handleSchoolChange = () => {
        setSchoolChecked(!schoolChecked);
        for (let eventItem in events) {
            console.log(eventItem[4]);
            if (eventItem.resource === "school" && schoolChecked) {
                console.log("Item:" + eventItem)
                addEvents(eventItem)
            }
        }
    };

    const handleWorkChange = () => {
        setWorkChecked(!workChecked);
    };

    const [eventsToRender, setEventsToRender] = useState([])

    const events = [
        {
            title: "Test Event",
            start:moment('2023-11-03T10:00:00').toDate(),
            end:moment('2023-11-03T12:00:00').toDate(),
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

    const addEvents = (item) => {
        eventsToRender.push(item)
        setEventsToRender(eventsToRender)
    }

    console.log(eventsToRender);

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
                events={eventsToRender}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
            />
        </div>
    )
}

export default CalendarApp