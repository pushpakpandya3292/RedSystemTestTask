import { useState, useEffect } from 'react';
import { Title } from 'components/Title';
import useApi from 'hooks/useApi';

import { Calendar as FullCalendar, momentLocalizer } from "react-big-calendar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

export default function HomePage() {
    const api = useApi();
	const [pageReady, setPageReady] = useState(true);
const DnDCalendar = withDragAndDrop(FullCalendar);
    const [events, setEvents] = useState([]);
    const getEventsFromApi = () => {
        //fetch data from the api
        api.get("calendar/events")
            .then(response => {
                const updatedEvents = response.data;
                updatedEvents.map((event) => {
                  event.start = new Date(event.start);
                  event.end = new Date(event.end);
                });
                setEvents(updatedEvents);
                console.log(response);
                console.log('Api Data: ', events)
            })
            .catch(error => {
                console.error(e); 
            });
    }
    useEffect(() => {
      getEventsFromApi();
      console.log('Api Data: ', events)
    }, [])
    function updateData(url, formValues) {
      const postData = normalizeFormData(formValues);
      console.log(postData);
      return api.post(url, postData).then((res) => res?.data);
    }
    function normalizeFormData(formValues) {
      const postData = { ...formValues };
      Object.keys(postData).forEach(function (key) {
        const fieldValue = postData[key];
        if (Array.isArray(fieldValue)) {
          let firstItem = fieldValue[0];
          if (firstItem && typeof firstItem == "string") {
            postData[key] = fieldValue.toString();
          } else {
            postData[key] = fieldValue;
          }
        } else if (fieldValue instanceof Date) {
          postData[key] = fieldValue
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        } else if (fieldValue === "") {
          postData[key] = null;
        }
      });
      return postData;
    }
    const updateDataFilter = (data) => {
        const { start, end, event } = data;
        const eventIndex = events.findIndex((data) => data.id === event.id);
        if (eventIndex !== -1) {
          const tempEvents = events;
          tempEvents[eventIndex] = {
            ...tempEvents[eventIndex],
            start: start,
            end: end,
          };
          setEvents(tempEvents);
          var url = "calendar/edit/" + events[eventIndex].id;
          updateData(url, {
            date: events[eventIndex].start,
            starttime: events[eventIndex].start,
            endtime: events[eventIndex].end,
          }).then((result) =>
            console.log(result)
          );
        }
        return {
        };
    }
    const localizer = momentLocalizer(moment);
    const onEventResize = (data) => {
       updateDataFilter(data);
    };
    const onEventDrop = (data) => {
      updateDataFilter(data);
    }
	return (
		<main id="HomePage" className="main-page">
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col-6 comp-grid" >
                <Title title="Home"   titleClass="text-lg font-bold text-primary" subTitleClass="text-500"       />
            </div>
            <div className="col-sm-6 col-md-4 col-6 comp-grid" >
                <div className="">
                    <div>
                        <DnDCalendar
                        localizer={localizer}
                        events={events ?? []}
                        defaultDate={new Date()}
                        defaultView="week"
                        views={["week", "day", "month"]}
                        selectable
                        resizable
                        style={{ height: 500 }}
                        onEventDrop={onEventDrop}
                        onEventResize={onEventResize}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
		</main>
	);
}
