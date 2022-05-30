import "./App.css";
import LoginPage from "./pages/LoginPage";
import styledComponent from "styled-components";

const AppForm = styledComponent.div`
  width: 100%;
  height:100vh;
  background-color: #ddd;
`;
function App() {
  return (
    <>
      <AppForm>
        <LoginPage></LoginPage>
      </AppForm>
    </>
  );
}

export default App;
