import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { amber, orange } from "@mui/material/colors";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/es/integration/react";
import "@tremor/react/dist/esm/tremor.css";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: orange["900"],
        contrastText: "#fff",
      },
      secondary: {
        main: amber["900"],
        contrastText: "#000",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
