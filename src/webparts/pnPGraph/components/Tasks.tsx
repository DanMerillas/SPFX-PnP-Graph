/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react"
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel'
import TaskCard from "./TasksCard";
import "@pnp/graph/planner";
import "@pnp/graph/users";

export default function Tasks(props: { graph: any }) {

    const [loadingEvents, SetLoadingEvents] = useState(true);
    const [tasks, SetTasks] = useState([]);

    useEffect(() => {
        function obtenerTareas() {
            props.graph.me.tasks().then((tasks: any) => {
                SetTasks(tasks.filter((task: any) => task.percentComplete !== 100).sort(function (o: any) { return new Date(o.createdDateTime) }));
                SetLoadingEvents(false);
            });
          }

          obtenerTareas();
        }, []);

    

    return (<>{
        loadingEvents ?
          <span className={"loading"}><CircularProgress /></span>
          :
          tasks && tasks.length > 0 ?
            <Carousel animation="slide" autoPlay={false}>
              {
                tasks && tasks.map((task: any) => {
                  return <TaskCard key={task.bucketId} tarea={task} />
                })
              }
            </Carousel>
            :
            <p>No hay tareas</p>
      }</>)
}