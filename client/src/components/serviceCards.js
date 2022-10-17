import { Card, Button, Container } from "react-bootstrap";
import { TicketButton } from "./ticketButton";

function calcWait(tr, nr, ki, sir){

    //Missing implementation of the calculation

    return tr
}

function ServiceCard(props) {
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.service.ServiceName}</Card.Title>
            <Card.Text>Expected wait: {calcWait(props.service.AverageTime,0,0,0)}</Card.Text>
            <TicketButton></TicketButton>
        </Card.Body>
        </Card>
    );
}

function ServicesContainer(props){
    const services = props.services;
    // console.log(services)
    return(
        <Container>
            {services.map((service) => {return(<ServiceCard key={service.ServiceName} service={service}/>)})}
        </Container>
    );
}



export {ServicesContainer};