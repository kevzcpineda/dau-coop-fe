import React, { useState, useLayoutEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Index';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import logo from '../assets/noimage.png';
// import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // const {authTokens, logoutUser} = useContext(AuthContext);

  let api = useAxios()

  useLayoutEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    // const response = await fetch('https://web-production-94d8.up.railway.app/user/', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${String(authTokens.access)}`
    //     },
    // });
    // const data = await response.json();
    setLoading(true);
    const response = await api.get('/user/')
    
    if(response.status === 200) {
      if(response.data.is_change_password === false) {
        navigate("/change-password");
        setLoading(false);
      } else {
        setUserInfo(response.data)
        setLoading(false);
      }
    } 

    // else if (response.status === 401) {
    //   logoutUser();
    // }
  }

  if(loading) {
    return (
      <Layout className="container-height">
        <Row className='h-100 justify-content-center align-items-center'>
          <Col className='justify-content-center'>
            <Spinner animation="border" style={{ width: "5rem", height: "5rem",  }} />;
          </Col>
        </Row>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Row>
          <Col xs={3}>
            <Image src={logo} alt='logo' width={200} height={250} />
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type='Text' placeholder={userInfo.first_name} disabled readOnly />
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type='text' placeholder={userInfo.last_name} disabled readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control type='text' placeholder={userInfo.middle_name} disabled readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Age</Form.Label>
                  <Form.Control type='text' placeholder={userInfo.age} disabled readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type='text' placeholder={userInfo.gender} disabled readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type='text' placeholder={userInfo.birth_date} disabled readOnly />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Full Address</Form.Label>
              <Form.Control type='text' placeholder={userInfo.address} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type='text' placeholder={userInfo.phone_no} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Civil Status</Form.Label>
              <Form.Control type='text' placeholder={userInfo.civil_status} disabled readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Date of Membership</Form.Label>
              <Form.Control type='text' placeholder={userInfo.date_of_membership} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Driver Licinse Number</Form.Label>
              <Form.Control type='text' placeholder={userInfo.driver_license_no} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Member Status</Form.Label>
              <Form.Control type='text' placeholder={userInfo.member_status} disabled readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Height</Form.Label>
              <Form.Control type='text' placeholder={userInfo.height} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Weight</Form.Label>
              <Form.Control type='text' placeholder={userInfo.weight} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Blood Type</Form.Label>
              <Form.Control type='text' placeholder={userInfo.blood_type} disabled readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Philhealth No.</Form.Label>
              <Form.Control type='text' placeholder={userInfo.philhealth_no} disabled readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>SSS</Form.Label>
              <Form.Control type='text' placeholder={userInfo.sss_no} disabled readOnly />
            </Form.Group>
          </Col>
        </Row>
      </Layout>
    );
  }
};

export default Home;