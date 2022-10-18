import { Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";

function TicketButton(props){
    return(
        <AiFillPlusCircle 
            onClick={() => {props.takeTicket(props.service.ServiceName);}} style={{cursor:'pointer'}}
        ></AiFillPlusCircle>
    );

}

export {TicketButton};