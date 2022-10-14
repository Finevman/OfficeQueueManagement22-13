import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RiddleMain from './RiddleMain.js';
import Leaderboard from './Leaderboard.js';



function Main(props) {
  return (
    <Container>
      <Row>
        <Col xs lg="3">
          <br />
          <Leaderboard leaderboard={props.leaderboard} scoreUpdate={props.scoreUpdate} style={{ marginRight: 60 }} />
        </Col>
        <Col xs lg="9">
          <br />
          <RiddleMain riddles={props.riddles} user={props.user} userFilter={props.userFilter} readUsersScore={props.readUsersScore} timerArray={props.timerArray} scoreUpdate={props.scoreUpdate} setScoreUpdate={props.setScoreUpdate} />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;