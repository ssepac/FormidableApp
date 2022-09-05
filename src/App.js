import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchVideoList } from "./networking/video-api";
import VideoList from "./components/VideoList";
import VideoView from "./components/VideoView";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import AuthView from "./components/AuthView";

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/auth" element={<AuthView />} />
      {["/video/list", "/"].map((path) => (
        <Route
          key={`route-path`}
          path={path}
          element={
            <VideoList
              onSelectItem={(selection) => {
                navigate(`/video/player`, {
                  state: {
                    fileName: selection,
                  },
                });
              }}
            />
          }
        ></Route>
      ))}
      <Route path="/video/player" element={<VideoView />}></Route>
    </Routes>
  );
}

export default App;
