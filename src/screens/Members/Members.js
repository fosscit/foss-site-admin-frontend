import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Text } from "recharts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createMemberAction, updateMemberAction, deleteMemberAction, listMembers } from "../../actions/memberActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import API from "../../API/api";

function Members({ history, search }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const memberList = useSelector((state) => state.memberList);
  const { loading, error, members } = memberList;
  
  const [selectedYear, setYear] = useState("");
  const [years, setYears] = useState([]);
  const [memData, setMemData] = useState([]);

  const loadData = (year) => {
    const formattedYear = year.replace(/\s+/g, ''); 
    axios.get(`${API}members/year/${formattedYear}`)
    .then((res)=>{
      if(res.data && res.data.length > 0) {
        setMemData(res.data);
      }
    })
    .catch((err)=>{
      console.log("error:", err.message);
    }); 
  };

  useEffect(()=>{
    axios.get(`${API}members/years`)
    .then((res)=>{
      if(res.data && res.data.length > 0) {
        const years = res.data.map(data => data.year).sort((a, b) => b.localeCompare(a));
        setYear(years[0]);
        setYears(years);
        loadData(years[0]);
      }
    })
    .catch((err)=>{
      console.log("error:", err.message);
    });     
  },[]);

  useEffect(() => {
    if (selectedYear) {
      loadData(selectedYear);
    }
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setYear(year)
  };

  const buttons = years && years.length > 0 ? years.map(value => (
    <Button 
      key={value} 
      variant="primary"
      style={{ backgroundColor: "#A9A9A9", borderColor: "#A9A9A9", color: "##A9A9A9" }}
      onClick={() => handleYearChange(value)}
    >
      {value}
    </Button>
  )) : [];


  const memberDelete = useSelector((state) => state.memberDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = memberDelete;

  const memberCreate = useSelector((state) => state.memberCreate);
  const { success: successCreate } = memberCreate;

  const memberUpdate = useSelector((state) => state.memberUpdate);
  const { success: successUpdate } = memberUpdate;

  useEffect(() => {
    // dispatch(listMembers());
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
      dispatch(deleteMemberAction(id));
    }
  };

  return (
    <MainScreen title={`Members Page`}>
      {buttons}
      <Link to="/addmember">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add Member
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {memData &&
        memData
          .filter((value) => value.members && value.members.length > 0)
          .map((value) => (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '0' }}>{value.id}</h3>
              <hr />
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {value.members
                  .filter(
                    (filteredMember) =>
                      filteredMember.name.toLowerCase().includes(search.toLowerCase()) &&
                      filteredMember.period === selectedYear
                  )
                  .map((member) => (
                    <Card key={member._id} style={{ width: '18rem', margin: '10px' }}>
                      <Card.Body>
                      <Card.Text>
                        <Card.Img variant="top" src={member.pic} style={{objectFit: 'cover', aspectRatio: '5/4'}} />
                      </Card.Text>
                        <Card.Title>{member.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{member.position}</Card.Subtitle>
                        <Card.Text>{member.content}</Card.Text>
                        <Button href={`/member/${member._id}`}>Edit</Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => deleteHandler(member._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
    </MainScreen>
  );
}

export default Members;
