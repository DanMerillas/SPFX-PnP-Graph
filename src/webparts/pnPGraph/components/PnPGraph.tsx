/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SPFx, graphfi } from "@pnp/graph";

import * as React from "react";
import { useEffect, useState } from "react";
import "@pnp/graph/users";
import "@pnp/graph/messages";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from './TabComponent';
import Tasks from "./Tasks";
import Email from "./Email";
import Events from "./Events";
import Files from "./Files";


export default function PnpGraph(props: { context: any }) {

  const [graph, setGraph] = useState<any>(undefined);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const graph = graphfi().using(SPFx(props.context));
    setGraph(graph);
  }, []);

  function handleChange(event: React.SyntheticEvent, newValue: number): void {
    setValue(newValue);
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  return (
    <>
      {graph && <section className="todayWork"><Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} TabIndicatorProps={{ sx: { display: 'none' } }} sx={{'& .MuiTabs-flexContainer': {flexWrap: 'wrap',},}} onChange={handleChange.bind(this)}

        >
          <Tab className={"labels"} label="Tareas" {...a11yProps(0)} />
          <Tab className={"labels"} label="Correos" {...a11yProps(1)} />
          <Tab className={"labels"} label="Reuniones" {...a11yProps(2)} />
          <Tab className={"labels"} label="Ficheros" {...a11yProps(3)} />
        </Tabs>
      </Box>

        <TabPanel value={value} index={0}>
          <Tasks graph={graph} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Email graph={graph} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Events graph={graph} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Files graph={graph} />
        </TabPanel> </section>}
    </>
  );
}

