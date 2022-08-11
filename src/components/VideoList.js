import { createRef, useEffect, useMemo, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";
import {
  ERROR_BAD_REQUEST,
  ERROR_MISSING_AUTH_PARAMS,
  ERROR_NOT_AUTHENTICATED,
} from "../networking/errors";
import { fetchVideoList } from "../networking/video-api";
import "./VideoList.css";
/* import image1 from "../test-images/fantom.png";
import { Carousel } from "react-responsive-carousel";
import image2 from "../test-images/avatar.jpeg";
import image3 from "../test-images/coinbase.gif";
import {FastAverageColor} from "fast-average-color" */

const VideoList = ({ onSelectItem }) => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState();
  const [notAuthed, setNotAuthed] = useState();
  const [errorState, setErrorState] = useState(); //used for non-recoverable back-end error
  /* const ref = useRef(); */

  useEffect(() => {
    if (!videos) {
      fetchVideoList()
        .then((resp) => {
          if (!resp.error) return resp.result;
          throw resp.errorObject
        })
        .then((files) => setVideos(files))
        .catch((errorObject) => {
          if (errorObject) {
            switch (errorObject) {
              case ERROR_BAD_REQUEST:
              case ERROR_NOT_AUTHENTICATED:
                navigate("/auth");
                return;
              case ERROR_MISSING_AUTH_PARAMS: {
                setNotAuthed(true);
                return;
              }
              default:
                break;
            }
          }
          setErrorState(true);
        });
    }
  });

  useEffect(() => {
    if (notAuthed) {
      navigate("/auth");
    }
  }, [notAuthed]);

  const errorView = useMemo(()=><span style={{color:'red'}}>Unknown error.</span>, [errorState])

  const videoList = useMemo(() => {
    if (!videos) return <span>Loading...</span>;

    return (
      <ul>
        {videos.map((videoName) => (
          <li key={`listitem-${videoName.replace(/\s/gm, "")}`}>
            <span
              className="videoLink"
              onClick={(e) => onSelectItem(videoName)}
              style={{ cursor: "pointer" }}
            >
              {videoName}
            </span>
          </li>
        ))}
      </ul>
    );
  }, [videos]);
  /* 
  const carousel = useMemo(() => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Carousel
          autoFocus
          centerMode
          centerSlidePercentage="20"
          dynamicHeight={false}
          onChange={(index, item)=>{
            console.log((item.props.children.find((child)=>child.type==="img")));
            console.log(new FastAverageColor().getColor(item.props.children.find((child)=>child.type==="img").ref.current))
          }}
          showThumbs={false}
          stopOnHover
          swipeable
          useKeyboardArrows
        >
          <div>
            <img src={image1} ref={ref} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={image2} />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={image3} />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img src={image1} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={image2} />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={image3} />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img src={image1} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={image2} />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={image3} />
            <p className="legend">Legend 3</p>
          </div>
          <div>
            <img src={image1} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={image2} />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={image3} />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
    );
  }); */

  return <div>{errorState ? errorView : videoList}</div>;
};

export default VideoList;
