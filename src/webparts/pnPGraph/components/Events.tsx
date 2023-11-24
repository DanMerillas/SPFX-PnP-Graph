/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */


import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import EventCard from "./EventCard";
import "@pnp/graph/users";
import '@pnp/graph/calendars';

export default function Events(props: { graph: any }) {

    const [loading, SetLoading] = useState(true);
    const [events, SetEvents] = useState([]);
    const locale: string = "en-US"

    useEffect(() => {
        function ObtenerEventos(today: Date) {

            props.graph.me.calendarView(today.toLocaleDateString(locale), new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(locale))().then((events: any) => {
                SetEvents(events);
                SetLoading(false);
            });
        }

        ObtenerEventos(new Date());
    }, []);

    return (
        <>
            {
                loading ?
                    <span className={"loading"}><CircularProgress /></span>
                    :
                    events && events.length > 0 ?
                        <Carousel animation="slide" autoPlay={false}>

                            {events && events.map((event: any) => {
                                return <EventCard key={event.id} evento={event} />
                            })}
                        </Carousel>
                        :
                        <p>No hay eventos</p>
            }
        </>
    )

}