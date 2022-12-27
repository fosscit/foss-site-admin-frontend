import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventAction, updateEventAction } from "../../actions/eventsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import DatePicker from "react-datepicker";

function SingleEvent({ match, history }) {
  
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [link, setLink] = useState("");
  const [materials, setMaterials] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const dispatch = useDispatch();

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading, error } = eventUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const { loading: loadingDelete, error: errorDelete } = eventDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEventAction(id));
    }
    history.push("/myevents");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/events/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
      setEventDate(new Date());
      setTime(data.time);
      setVenue(data.venue);
      setLink(data.link);
      setMaterials(data.materials);
      setSpeaker(data.speaker);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setEventDate(new Date());
    setTime("");
    setVenue("");
    setLink("");
    setMaterials("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateEventAction(match.params.id, title, content, category, eventDate, time, venue, link, materials, speaker, pic));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/myevents");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>


            <Form.Group controlId="content">
              <Form.Label>Speaker</Form.Label>
              <Form.Control
                type="content"
                value={speaker}
                placeholder="Enter the Speaker Details"
                onChange={(e) => setSpeaker(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Materials</Form.Label>
              <Form.Control
                type="content"
                value={materials}
                placeholder="Enter the Materials Drive Link"
                onChange={(e) => setMaterials(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="content"
                value={link}
                placeholder="Enter the Meet Link"
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="content"
                value={venue}
                placeholder="Enter the Venue"
                onChange={(e) => setVenue(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="content"
                value={time}
                placeholder="Enter the Event Time"
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <DatePicker selected={eventDate} onChange={date => setEventDate(date)} />

            <Form.Group controlId="pic">
            <Form.Label>Poster</Form.Label>
            <Form.File
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="image/png"
                label="Upload Poster"
                custom
              />
            </Form.Group>


            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Event
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Event
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleEvent;
