
 import { setSearchValue } from '../redux/reducer'
 import { useDispatch } from "react-redux";
 import { Link } from 'react-router-dom';
 import "./pages.css"
export default function List(props) {
    const {list, page, linkTo} =props;
    const dispatch = useDispatch();
 return (
    <div data-testId="list" className="panelList">
    <ul className={page==="rocket" ? "panelListUl": "panelListUlRocket"}>
{list.map((data, index)=>(<li key={`${index}_item`} data-testId="list" onClick={()=>dispatch(setSearchValue({page, id: `${data[props.id]}`}))} className="panelListLi"><Link to="details">{data[linkTo]}</Link></li>))}
    </ul>
    </div>
 )
}