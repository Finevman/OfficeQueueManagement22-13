import { Button, ButtonGroup, Col, FormGroup, FormLabel } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";



function Officer(){
    return(
        <FormGroup id='officer_options' style={{padding:'100px', textAlign:'center', alignItems:'center', justifyContent:'center'}}>
            <FormLabel style={{ fontSize: 45, width: "100%"}}>Welcome Officer n°xxx</FormLabel>
            <FormLabel style={{ fontSize: 65, fontWeight:'bold',width: "100%", paddingTop:'40px'}}>Ticket Number</FormLabel>
            <ButtonGroup style={{paddingTop: '70px', justifyContent:'space-between'}}>
                <Button style={{fontSize: 25, background:'green'}}> Served</Button>
                <Button style={{fontSize: 25, background:'red'}}> Absent</Button>
            </ButtonGroup>
                   
        </FormGroup>
    );
}



export {Officer};