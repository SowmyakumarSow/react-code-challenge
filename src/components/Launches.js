import React, { memo, useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { setLoader } from "../redux/reducer";
import "./loader.css";
import "./pages.css"
import List from "./List";

 function Launches(){
    const [launches, setLaunch]=useState([]);
    const loader = useSelector((state) => state.spaceX.loader);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(launches.length<=0){
        dispatch(setLoader(true))    
        fetch("https://api.spacexdata.com/v3/launches")
        .then(res => res.json())
        .then(y => {console.log(y); setLaunch(y)});

        dispatch(setLoader(false))
        }
    },[launches.length])

    console.log("loader", loader)
    return (
        <div style={{justifyContent: "space-between", display:"contents", overflowX:"hidden"}}>
   <List page={"launches"} list={launches} linkTo={"mission_name"} id={"flight_number"}/>
    <div data-testId="rightpanel" className="rightPanel" >
        <h3 data-testId="overview">Overview</h3>
        <div data-testId="content">In 2001, Musk conceptualised "Mars Oasis", a project to land a miniature experimental greenhouse containing seeds with dehydrated gel on Mars to grow plants on Martian soil, "so this would be the furthest that life's ever travelled" in an attempt to regain public interest in space exploration and increase the budget of NASA. But Musk realized that even with a much larger space budget, travel to Mars would be prohibitively expensive without a fundamental breakthrough in rocket technology. In October 2001, Musk travelled to Moscow with Jim Cantrell and Adeo Ressi to buy refurbished Dnepr ICBMs that could send the envisioned payloads into space.In early 2002 Musk was seeking staff for the new company and approached rocket engineer Tom Mueller, who would eventually become SpaceX's CTO of Propulsion until 2020. SpaceX was first headquartered in a 75,000 square feet warehouse in El Segundo, California. Musk decided SpaceX's first rocket would be named Falcon 1 a nod to Star Wars' Millennium Falcon. Musk planned for Falcon 1's first launch to occur in November 2003, 15 months after the company started.
On August 4, 2008 SpaceX accepted a further $20 million investment fromFounders Fund In early 2012, approximately two-thirds of the company were owned by its founder and his 70 million shares were then estimated to be worth $875 million on private markets, which roughly valued SpaceX at $1.3 billion as of February 2012. After the COTS 2+ flight in May 2012, the company private equity valuation nearly doubled to $2.4 billion.
On 16 June 2009 SpaceX announced the opening of its Astronaut Safety and Mission Assurance Department. It hired former NASA astronaut Ken Bowersox to oversee the department as a vice president of the company. However, it has since been reported that the former astronaut subsequently left SpaceX in late 2011. No reason was given and no replacement in that position has been announced.
On 16 June 2009 SpaceX announced the opening of its Astronaut Safety and Mission Assurance Department. It hired former astronaut Ken Bowersox to oversee the department as a vice president of the company. However, it has since been reported that the former astronaut subsequently left SpaceX in late 2011. No reason was given and no replacement in that position has been announced.</div> 
</div>
<div className="detailsList">
   { launches && !loader && launches.map(data => (
    <div className="detailsListItem">
        <table className="detailsListTable">
         <tr><td className="detailsListTableRow">Title</td><td className="detailsTableDetails">{data.mission_name}</td></tr>
         <tr><td className="detailsListTableRow">Details</td><td className="detailsTableDetails">{data.details}</td></tr> 
         <tr><td className="detailsListTableRow">Flight number</td><td className="detailsTableDetails">{data.flight_number}</td></tr> 
         <tr><td className="detailsListTableRow">Launch year</td><td className="detailsTableDetails">{data.launch_year}</td></tr> 
         <tr><td className="detailsListTableRow">Article link</td><td className="detailsTableDetails"><a href={data.links.article}>Aricle link</a></td></tr> 
         
         </table>
         {loader && <div className="loader"></div>}

    </div>
   ))}
  
   </div>
   </div>
   )
};

export default memo(Launches);
    