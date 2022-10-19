import { Card, Button, Container, Row } from "react-bootstrap";
import { TicketButton } from "./ticketButton";



function calcWait(tr, nr, ki, sir){

    //Missing implementation of the calculation

    return tr
}

function ServiceQueue(props) {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.service.ServiceName}</Card.Title>
                <Card.Text>Current Ticket: XYY</Card.Text>
                <Card.Text>Queue Length: XX</Card.Text>                
            </Card.Body>
        </Card>
    );
}

function ServiceCard(props) {
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.service.ServiceName}</Card.Title>
            <Card.Text>Expected wait: {calcWait(props.service.AverageTime,0,0,0)}</Card.Text>
            <TicketButton takeTicket={props.takeTicket} service={props.service}></TicketButton>
        </Card.Body>
        </Card>
    );
}

function ServicesContainer(props){
    const services = props.services;
    // console.log(services)
    return(
        <Container>
            {services.map((service) => {return(<Row><ServiceCard key={service.ServiceName} service={service} takeTicket={props.takeTicket}/><ServiceQueue key={service.ServiceName} service={service}/></Row>)})}
        </Container>
    );
}



export {ServicesContainer};