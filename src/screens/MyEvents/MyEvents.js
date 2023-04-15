import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Row, Col, Image } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, listEvents } from "../../actions/eventsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import API from "../../API/api";

function MyEvents({ history, search }) {
  const dispatch = useDispatch();
  
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const [selectedYear, setYear] = useState("");
  const [years, setYears] = useState([]);

  useEffect(()=>{
    axios.get(`${API}events/years`)
    .then((res)=>{
      if(res.data && res.data.length > 0) {
        const years = res.data.map(data => data.year).sort((a, b) => b.localeCompare(a));
        setYear(years[0]);
        setYears(years);
      }
    })
    .catch((err)=>{
      console.log("error:", err.message);
    });     
  },[]);

  const buttons = years && years.length > 0 ? years.map(value => (
    <Button 
      key={value} 
      variant="primary"
      style={{ backgroundColor: "#A9A9A9", borderColor: "#A9A9A9", color: "##A9A9A9" }}
      onClick={() => setYear(value)}
    >
      {value}
    </Button>
  )) : [];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  const eventCreate = useSelector((state) => state.eventCreate);
  const { success: successCreate } = eventCreate;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { success: successUpdate } = eventUpdate;

  useEffect(() => {
    dispatch(listEvents());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEventAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      
      {buttons}
      <Link to="/createevent">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add Event
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {events && (
        <Row>
          {events
            .filter(filteredEvent =>
              (filteredEvent.title.toLowerCase().includes(search.toLowerCase()) && filteredEvent.eventYear === selectedYear)
            )
            .reverse()
            .map(event => (
              <Col key={event._id} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{event.category}</Card.Subtitle>
                    <Card.Text>
                      <Card.Img variant="top" src={event.pic} style={{objectFit: 'cover', aspectRatio: '16/9'}} />
                    </Card.Text>
                    <Button href={`/event/${event._id}`}>Edit</Button>
                    <Button variant="danger" className="mx-2" onClick={() => deleteHandler(event._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </MainScreen>
  );
}

export default MyEvents;
