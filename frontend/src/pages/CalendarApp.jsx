import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
// Import Big Calendar and Moment

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// Create Localizer
const localizer = momentLocalizer(moment);

const CalendarApp = (props) => {

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

    // Toggle Form Entry
    const [formOpen, setFormOpen] = useState(false)

    // Handle Form Toggle
    const handFormOpenToggle = () => {
        setFormOpen(!formOpen);
    }

    // Checkbox Statuses
    const [schoolChecked, setSchoolChecked] = useState(true);
    const [workChecked, setWorkChecked] = useState(true);
    const [homeChecked, setHomeChecked] = useState(true);
    const [otherChecked, setOtherChecked] = useState(true);

    // Handle Checkbox Changing
    const handleSchoolChange = () => {
        setSchoolChecked(!schoolChecked);
    };
    const handleWorkChange = () => {
        setWorkChecked(!workChecked);
    };
    const handleHomeChange = () => {
        setHomeChecked(!homeChecked);  
    };
    const handleOtherChange = () => {
        setOtherChecked(!otherChecked);
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col w-96 ml-10 mt-5 mb-5'>
                {formOpen ? 
                    <div>
                        <BsFillArrowUpCircleFill onClick={handFormOpenToggle} className='mb-2 w-10 h-10' />
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
                    :
                    <BsFillArrowDownCircleFill onClick={handFormOpenToggle} className='w-10 h-10' />
                }
            </div>

            <div className='flex md:flex-row flex-col ml-5 mr-5'>
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
                    className='md:w-9/12 w-full'
                />

                <div className='flex flex-col md:w-3/12 w-full bg-slate-500'>
                    <div className='w-full text-center'>Events List</div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <label>
                                <input type='checkbox' checked={schoolChecked} onChange={handleSchoolChange} />
                                School
                            </label>
                            <label>
                                <input type='checkbox' checked={workChecked} onChange={handleWorkChange} />
                                Work
                            </label>
                        </div>
                        <div className='flex flex-col'>
                            <label>
                                <input type='checkbox' checked={homeChecked} onChange={handleHomeChange} />
                                Home
                            </label>
                            <label>
                                <input type='checkbox' checked={otherChecked} onChange={handleOtherChange} />
                                Other
                            </label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='text-center'>
                                School Items
                            </div>
                            {schoolChecked 
                                ? 
                                <div>
                                    {dataList.map((listItem) => (
                                        listItem.resource === "school" 
                                        ?
                                        <div key={listItem.title}>{listItem.title}</div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div> 
                                : 
                                <div className='text-center'>
                                    ---
                                </div>
                            }
                        </div>
                        <div>
                            <div className='text-center'>
                                Work Items
                            </div>
                            {workChecked 
                                ? 
                                <div>
                                    {dataList.map((listItem) => (
                                        listItem.resource === "work" 
                                        ?
                                        <div key={listItem.title}>{listItem.title}</div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div> 
                                : 
                                <div className='text-center'>
                                    ---
                                </div>
                            }    
                        </div>
                        <div>
                            <div className='text-center'>
                                Home Items
                            </div>
                            {homeChecked 
                                ? 
                                <div>
                                    {dataList.map((listItem) => (
                                        listItem.resource === "home" 
                                        ?
                                        <div key={listItem.title}>{listItem.title}</div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div> 
                                : 
                                <div className='text-center'>
                                    ---
                                </div>
                            }    
                        </div>
                        <div>
                            <div className='text-center'>
                                Other Items
                            </div>
                            {otherChecked 
                                ? 
                                <div>
                                    {dataList.map((listItem) => (
                                        listItem.resource === "other" 
                                        ?
                                        <div key={listItem.title}>{listItem.title}</div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div> 
                                : 
                                <div className='text-center'>
                                    ---
                                </div>
                            }    
                        </div>
                    </div>
                </div>

            </div>
            <div className='m-10'>
                .
            </div>
        </div>
    )
}

export default CalendarApp