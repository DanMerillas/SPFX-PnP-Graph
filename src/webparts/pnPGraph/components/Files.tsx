/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { Button, CircularProgress } from '@mui/material';
import FileCard from "./FileCard";
import "@pnp/graph/users";
import "@pnp/graph/onedrive"
import { useEffect, useState } from "react";

export default function Files(props: { graph: any }) {

    const [filesPaged, SetFilesPaged] = useState([]);
    const [files, SetFiles] = useState([]);
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        function obtenerDocumentos() {
            props.graph.me.drive.recent().then((files: any) => {

                const filesPaged = []
                //const filterFiles = files.filter((f: any) => f.file && f.file.mimeType !== "application/msonenote")

                for (let i = 0; i < 5; i++)
                    filesPaged.push(files[i])

                SetFilesPaged(filesPaged);
                SetFiles(files);
                SetLoading(false);
            });
        }

        obtenerDocumentos();
    }, []);

    function verMas() {
        const filesPagedAux = [...filesPaged]

        for (let i = filesPaged.length; i < (filesPaged.length + 5); i++)
            filesPagedAux.push(files[i])

            SetFilesPaged(filesPagedAux);
    }

    return (<>
        {loading ?
            <span className="loading">< CircularProgress /></span >
            :
            <>
                {filesPaged && filesPaged.map((file: any) => {
                    return <FileCard key={file.id} file={file} />
                })}


                {filesPaged && filesPaged.length > 0 ?
                    <Button variant="contained" onClick={verMas.bind(this)}>Ver más</Button>
                    :
                    <p>No hay documentos en este momento</p>}
            </>
        }</>)

}