/*eslint-disable*/
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  // 1. load the authencated user
  const { isLoading, isAuthenticated } = useUser();

  //2.if no auth user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3. while loading, dispaly spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. if has auth user, render the app
  if (isAuthenticated) return children;
}

export default ProtectRoute;
