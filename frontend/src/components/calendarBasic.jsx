import React from 'react';
import moment from "moment";
import { Calendar } from '../pages';

const events = [
    {
        start:moment('2023-10-25T10:00:00').toDate(),
        end:moment('2023-10-25T12:00:00').toDate(),
        title:("MRI Registration")
    }
]

export default function BasicCalendar() {
    return <Calendar events={events} />
}