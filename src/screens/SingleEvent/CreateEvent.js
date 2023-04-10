import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEventAction } from "../../actions/eventsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateEvent({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [link, setLink] = useState("");
  const [materials, setMaterials] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/webp") {
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

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, error, event } = eventCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setDate(new Date());
    setTime("");
    setVenue("");
    setLink("");
    setMaterials("");
    setStartYear("");
    setEndYear("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEventAction(title, content, category, date, time, venue, link, materials, speaker, pic, startYear, endYear));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/myevents");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Add a new Event">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
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
              <Form.Label>Event Batch</Form.Label>
              <Row>
                <Col lg={5} md={5} sm={11} xs={11}>
                  <Form.Control
                    type="content"
                    placeholder="Enter the Start Year"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                </Col>
                <Col>
                  {"-"}
                </Col>
                <Col lg={5} md={5} sm={11} xs={11}>
                  <Form.Control
                    type="content"
                    placeholder="Enter the End Year"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
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
                placeholder="Enter a Relevant Link"
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

            <DatePicker selected={date} onChange={date => setDate(date)} />

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

            <Card.Text>
              <Card.Img variant="top" src={pic} style={{objectFit: 'cover', aspectRatio: '16/9'}} />
            </Card.Text>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Add Event 
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateEvent;
