import React , {memo, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../redux/reducer";
import "./loader.css"
 function Details(){
    const storeSearchObj = useSelector((state) => state.spaceX.searchObj);
    const storeLoader = useSelector((state) => state.spaceX.loader);
    const searchObj = storeSearchObj? storeSearchObj : JSON.parse(localStorage.getItem("serachObj"));
    const loader = storeLoader !== undefined ? storeLoader : localStorage.getItem("loader");
    const dispatch = useDispatch();
    console.log("Details", searchObj)
    const [APIResponse, setApiResponse] = useState({});

    useEffect(()=>{
        console.log("loader...", loader)
        dispatch(setLoader(true));
        console.log("loader...", loader)
        localStorage.setItem("loader", true);
        fetch(`https://api.spacexdata.com/v3/${searchObj && searchObj.page}/${searchObj && searchObj.id}`)
        .then(res => res.json())
        .then(resp => {
            console.log(resp);
           setApiResponse(resp);
        })
        dispatch(setLoader(false))
        localStorage.setItem("loader", false);
    },[])

    console.log("loader...", loader)

    const setLocalStorage = () => {
        localStorage.setItem("serachObj",JSON.stringify(searchObj));
        localStorage.setItem("loader", loader);
    }

    return (
        <div data-testId="details" className="noClass">
        {searchObj && searchObj.page === "history" && !loader && (
     <div className="detailsPagediv">
    { APIResponse.title && <div className="detailsPageInnerdiv"><span className="detailsPageInnerSpan">{`${APIResponse.title}`}</span></div>}
     <table className="detailsPageTable">
    {APIResponse.title && <tr className="detailsPageTableRow"><td>Title</td><td className="detailsPageTableRowData">{APIResponse.title}</td></tr>}
   {APIResponse.details && <tr className="detailsPageTableRow"><td>Details</td><td className="detailsPageTableRowData">{APIResponse.details}</td></tr>}
    {APIResponse.flight_number && <tr className="detailsPageTableRow"><td>Flight number</td><td className="detailsPageTableRowData">{APIResponse.flight_number}</td></tr>}
    {APIResponse.event_date_utc && <tr className="detailsPageTableRow"><td>Date</td><td className="detailsPageTableRowData">{APIResponse.event_date_utc}</td></tr>}
   
    </table> 
     </div>   
     )}
             { searchObj && searchObj.page === "launches" && !loader && (
     <div className="detailsPagediv">
    {APIResponse.mission_name && <div className="detailsPageInnerdiv"><span className="detailsPageInnerSpan">{`${APIResponse.mission_name}`}</span></div>}
     <table className="detailsPageTable">
    {APIResponse.mission_name && <tr className="detailsPageTableRow"><td>Title</td><td className="detailsPageTableRowData">{APIResponse.mission_name}</td></tr>}
   {APIResponse.details && <tr className="detailsPageTableRow"><td>Details</td><td className="detailsPageTableRowData">{APIResponse.details}</td></tr>}
    {APIResponse.flight_number && <tr className="detailsPageTableRow"><td>Flight number</td><td className="detailsPageTableRowData">{APIResponse.flight_number}</td></tr>}
    {APIResponse.launch_date_utc && <tr className="detailsPageTableRow"><td>Date</td><td className="detailsPageTableRowData">{APIResponse.launch_date_utc}</td></tr>}
   {APIResponse.launch_success!==undefined && <tr className="detailsPageTableRow"><td>SuccessFul</td><td className="detailsPageTableRowData">{APIResponse.launch_success ? "YES" : "NO"}</td></tr>}
    </table>
     </div>   
     )}
                  {searchObj && searchObj.page === "rockets" && !loader &&  (
     <div className="detailsPagediv">
     {APIResponse.rocket_name && <div className="detailsPageInnerdiv"><span className="detailsPageInnerSpan">{`${APIResponse.rocket_name}`}</span></div>}
     <table className="detailsPageTable">
    {APIResponse.company && <tr className="detailsPageTableRow"><td>Title</td><td className="detailsPageTableRowData">{APIResponse.company}</td></tr>}
   {APIResponse.description && <tr className="detailsPageTableRow"><td>Details</td><td className="detailsPageTableRowData">{APIResponse.description}</td></tr>}
    {APIResponse.country && <tr className="detailsPageTableRow"><td>Country</td><td className="detailsPageTableRowData">{APIResponse.country}</td></tr>}
    {APIResponse.success_rate_pct && <tr className="detailsPageTableRow"><td>Success rate</td><td className="detailsPageTableRowData">{APIResponse.success_rate_pct}</td></tr>}
    {APIResponse.reddit && <tr className="detailsPageTableRow"><td>Reddit link</td><td style={{width:"1200px", paddingLeft:"30px" }}><a href={APIResponse.links.reddit} onClick={()=> setLocalStorage()}>Reddit link</a></td></tr> }
    {APIResponse.wikipedia && <tr className="detailsPageTableRow"><td>Wikipedia link</td><td style={{width:"1200px", paddingLeft:"30px" }}><a href={APIResponse.wikipedia} onClick={()=> setLocalStorage()}>Wikipedia link</a></td></tr> }
    {APIResponse.cost_per_launch && <tr className="detailsPageTableRow"><td>Cost per launch</td><td className="detailsPageTableRowData">{APIResponse.cost_per_launch}</td></tr>}
   {APIResponse.launch_success!==undefined &&  <tr className="detailsPageTableRow"><td>SuccessFul</td><td className="detailsPageTableRowData">{APIResponse.launch_success ? "YES" : "NO"}</td></tr>}
    </table>
     </div>   
     )}

     {loader &&
     <div className="loader"></div> }
     </div>
    )
}

export default memo(Details)