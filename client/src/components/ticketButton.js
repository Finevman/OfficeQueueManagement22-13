import { Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";

function takeTicket(){
    
}

function TicketButton(props){
    return(
        <AiFillPlusCircle 
            onClick={() => {takeTicket();}} style={{cursor:'pointer'}}
        ></AiFillPlusCircle>
    );

}

export {TicketButton};