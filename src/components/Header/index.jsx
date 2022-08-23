import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../redux/auth';
import loginIcon from './login.svg';
import logoutIcon from './logout.svg';

const Icon = styled.img`
  width: 15px;
`;

export default function Header() {
  const { isAuth } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    // navigate('/');
  };

  const iconSrc = isAuth ? logoutIcon : loginIcon;

  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
      <Container>
        <Nav>
          <Icon src={iconSrc} />
          {isAuth && (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          )}
          {!isAuth && (
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
