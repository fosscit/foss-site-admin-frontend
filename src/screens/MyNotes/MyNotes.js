import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const [selectedYear, setYear] = useState(new Date().getFullYear());
  
  const noteList = useSelector((state) => state.noteList);
  // const { loading, error, notes } = noteList;
  const { loading, error } = noteList; //temp
  let buttons = null;
  const notes = [
    {
      title: 'event3',
      content: 'content for event 3',
      category: 'open source',
      eventDate: '2022-10-17T12:14:38.000Z',
      eventYear: '2022',      __v: 0
    },
    {
      title: 'event0',
      content: 'some content',
      category: 'open source',
      eventDate: '2020-10-18T12:51:10.000Z',
      eventYear: '2020',
      __v: 0
    },
    {
      title: 'sdc djc',
      content: 'sdv smdv dsmv',
      category: 'open source',
      eventDate: '2022-10-03T15:02:49.000Z',
      eventYear: '2022',
      __v: 0
    },
    {
      title: 'event 4',
      content: 'content of the event',
      category: 'open source',
      eventDate: '2021-12-22T17:37:03.000Z',
      eventYear: '2021',
      __v: 0
    }
  ]



  // if(notes) {
    const years = new Set(notes.map((note) => note.eventYear));
    const Years = [...years].sort().reverse();
    buttons = Years.map(value => (
      <button key={value} onClick={() => setYear(value)}>{value}</button>
    ));
  // }



  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    // if (!userInfo) {
    //   history.push("/");
    // }
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
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      
      {buttons}
      <Link to="/createnote">
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
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .filter((note) => note.eventYear === selectedYear)
          .map((note) => (
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{note.category}</Card.Subtitle>
                <Card.Text>
                  {note.content}
                </Card.Text>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
    </MainScreen>
  );
}

export default MyNotes;
