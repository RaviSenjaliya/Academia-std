import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Swal from 'sweetalert2';
import moment from 'moment';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    Swal.fire({
      title: `Event...💬`,
      html: `<input type="text" id="login" class="swal2-input" placeholder="Event name">`,
      confirmButtonText: 'Done',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#login').value;
        if (title) {
          setEventsData([
            ...eventsData,
            {
              start,
              end,
              title,
            },
          ]);
        }
      },
    });
  };

  const myadd = () => (event) => {
    Swal.fire({
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        handleEventDelete(event);
      }
    });
  };

  const handleEventDelete = (eventToDelete) => {
    const updatedEvents = eventsData.filter((event) => event !== eventToDelete);
    setEventsData(updatedEvents);
  };

  return (
    <div className="App">
      <Calendar
        views={['day', 'agenda', 'work_week', 'month']}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: '100vh' }}
        onSelectEvent={myadd()}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
