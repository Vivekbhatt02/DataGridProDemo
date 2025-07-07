import React, {useState} from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import ShiftPlanManagementDialog from "./ShiftPlanManagementDialog.jsx";

const localizer = momentLocalizer(moment)

export default function ShiftPlanGrid() {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const myEventsList = [];

    const handleSelectSlot = ({start}) => {
        setSelectedDate(start);
        setOpen(true);
    };
    return <>
        <Calendar
            localizer={localizer}
            event={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            onSelectSlot={handleSelectSlot}
            selectable={true}
            style={{height: '100vh', width: '100vw'}}
        />
        <ShiftPlanManagementDialog
            open={open}
            onClose={() => setOpen(false)}
            date={selectedDate}
        />
    </>
}