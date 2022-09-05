import { useState } from "react";
import { useLocation } from "react-router";

const VideoView = () => {
  const location = useLocation();
  const [showMeta, setShowMeta] = useState(true);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  return (
    <div>
      {showMeta && (
        <div
          onClick={(e) => setShowMeta(false)}
          style={{
            cursor: "pointer",
            zIndex: 1,
            padding: 20,
            color: "red",
            display: "flex",
            position: "absolute",
            flexDirection: "row",
          }}
        >
          <strong style={{ paddingRight: 8 }}>[HIDE]</strong>
          <span>{location.state.fileName}</span>
        </div>
      )}
      <video
        id="videoPlayer"
        width="100%"
        controls
        playsInline
        autoPlay
        muted
        loop
      >
        <source
          src={`${
            process.env.REACT_APP_SERVER_HOSTNAME
          }/api/videos?fileName=${encodeURIComponent(
            location.state.fileName
          )}&token=${token}&email=${encodeURIComponent(email)}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoView;
