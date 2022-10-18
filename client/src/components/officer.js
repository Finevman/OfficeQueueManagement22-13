import { Button, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Row} from "react-bootstrap";


function Officer(){
    return(
        <Col className="vh-200">
            <Row><div style={{ fontSize: 45, width: "100%" }}>Officer Page</div></Row>
            <Row><th> Ticket Number </th></Row>
            <Row><Button> Served</Button></Row>
            <Row><Button> Absent</Button></Row>        
        </Col>
    );
}

function Officer_2(props) {
    return (
      <Row className="vh-200">
        <Col md={12} className="below-nav">
            HELLOOOO
        </Col>
      </Row>
    );
  }


export {Officer, Officer_2};