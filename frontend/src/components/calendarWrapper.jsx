import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CalendarWrapper(props) {
    return (
        <div style={{ height: "95vh"}}>
            <BigCalendar {...props} localizer={localizer} />;
        </div>
    ) 
}