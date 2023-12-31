/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import {  useState } from "react";
import MailIcon from '@mui/icons-material/Mail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function EmailElement(props: {mail:any}) {

    const [viewBody, setViewBody] = useState(false);

    return <div key={props.mail.id} className="mailContainer">
        <h4 className="mailTitle" onClick={() => setViewBody(!viewBody)}>{props.mail.isRead ? <MailOutlineIcon/> : <MailIcon/>} {props.mail.subject}</h4>
        <div className="mailBody" style={viewBody ? { display: "block" } : { display: "none" }}>
            <p className="mailDate">{new Date(props.mail.receivedDateTime).toLocaleString()}</p>
            <p className="mailDate">{`${props.mail.from?.emailAddress?.name} <${props.mail.from?.emailAddress?.address}>`}</p>
            <div dangerouslySetInnerHTML={{ __html: props.mail.body.content }}></div>
        </div>

    </div>

}