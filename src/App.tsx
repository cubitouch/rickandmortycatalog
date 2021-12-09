import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useRoutes } from "raviger";
import React from "react";
import "./App.css";
import { Character } from "./components/character";
import { Home } from "./components/home";

const routes = {
  "/": () => <Home />,
  "/character/:id": (params: any) => <Character id={parseInt(params.id)} />,
};

function App() {
  let route = useRoutes(routes);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rick and Morty
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>{route}</Container>
    </>
  );
}

export default App;
