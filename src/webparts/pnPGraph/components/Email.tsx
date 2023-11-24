/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { useEffect, useState } from "react";
import EmailElement from "./EmailElement";
import CircularProgress from "@mui/material/CircularProgress";


export default function EmailElem(props: { graph: any }) {

    const [totalMessages, setTotalMessages] = useState([]);
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {

            const email = await props.graph.me.messages();
            setTotalMessages(email);
            SetLoading(false);
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchData();

    }, []);

    return (<>{
        loading ?
        <span className={"loading"}><CircularProgress /></span>
        :
        totalMessages.map((mail: any) => {
            return <EmailElement key={mail.id} mail={mail} />
        })}
    </>)

}