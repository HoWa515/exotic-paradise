/*eslint-disable*/
import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "./../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  /* background-image: url("../exotic-paradise-2026.jpg"); */
  background: linear-gradient(#d5f8f899, #a4fcfc81), url("./../exotic.png");
  background-size: cover;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      {/* <Heading as="h4">Log in to your account</Heading> */}
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
