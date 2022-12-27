import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, listEvents } from "../../actions/eventsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyEvents({ history, search }) {
  const dispatch = useDispatch();

  const [selectedYear, setYear] = useState(new Date().getFullYear());
  
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  let buttons = null;
  if(events) {
    const years = new Set(events.map((event) => event.eventYear));
    const Years = [...years].sort().reverse();
    buttons = Years.map(value => (
      <button key={value} onClick={() => setYear(value)}>{value}</button>
    ));
  }

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
      {events &&
        events
          .filter((filteredEvent) =>
            (filteredEvent.title.toLowerCase().includes(search.toLowerCase()) && filteredEvent.eventYear === selectedYear)
          )
          .reverse()
          .map((event) => (
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.category}</Card.Subtitle>
                <Card.Text>
                  {event.content}
                </Card.Text>
                <Button href={`/event/${event._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(event._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
    </MainScreen>
  );
}

export default MyEvents;
