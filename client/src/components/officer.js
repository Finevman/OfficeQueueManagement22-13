import { Button, ButtonGroup, Col, FormGroup, FormLabel } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";



function Officer(props){
    return(
        <>
        <label style={{ fontSize: 45, fontWeight:'bold', textAlign: 'left', paddingTop: '30px'}}>Counter N°</label>
        <FormGroup id='officer_options' style={{padding:'80px', textAlign:'center', alignItems:'center', justifyContent:'center'}}>
            <FormLabel style={{ fontSize: 45, width: "100%"}}>Welcome Officer {/*props.user.name*/}</FormLabel>
            <FormLabel style={{ fontSize: 65, fontWeight:'bold',width: "100%", paddingTop:'40px'}}>Ticket Number</FormLabel>
           
            <ButtonGroup style={{paddingTop: '70px', justifyContent:'space-between'}}>
                <Button style={{fontSize: 25, background:'green'}}> Served</Button>
                <Button style={{fontSize: 25, background:'red'}}> Absent</Button>
            </ButtonGroup>
                   
        </FormGroup>
        </>
    );
}



export {Officer};