import React, { useState, useEffect, useRef } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import PropTypes from "prop-types";
import "./style.scss";
// import 'gif-me-duration'

// const gifDurations = require("gif-me-duration");

// // Function takes in a single url or array of gif urls
// let gifUrls = [
//   'https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/640x320/landscape-1497533116-not-dead.gif'
// ];

// Use an async function to await the results
// const asyncExample = async (gifUrl) => {
//   const result = await gifDurations(gifUrl);
//   console.log(result);
//   return result;
// };

// asyncExample(
//   "https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/640x320/landscape-1497533116-not-dead.gif"
// ).then((result) => console.log("gg ", result));
// console.log(df);

// // Or use .then promise chain to access results
// const promiseExample = (gifUrl) => {
//   gifDurations(gifUrl).then((results) => {
//     console.log(results[0].duration);
//     return results[0].duration;
//   });
// };

// const ff = promiseExample(
//   //   "https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/640x320/landscape-1497533116-not-dead.gif"
//   "https://c.tenor.com/QfeoKJri8-8AAAAd/spongebob-long-list.gif"
// );
// console.log("sds", ff);

const IMAGEFILE = "image_file";
const VIDEOFILE = "video_file";

const mediaFiles = [
  "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
  "https://c.tenor.com/QfeoKJri8-8AAAAd/spongebob-long-list.gif",
  "https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/640x320/landscape-1497533116-not-dead.gif",
  "28606760851a477da185da5584b6d2f1.mp4",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
];

const imageFileFormats = ["jpg", "jpeg", "png", "gif"];
const videoFileFormats = [
  "mp4",
  "mpeg",
  "avi",
  "mpg",
  "mov",
  "ogg",
  "webm",
  "wmv",
  "rm",
  "ram",
  "swf",
  "flv",
];

const getFileType = (media) => {
  const fileFormat = media.split(".").pop();
  if (imageFileFormats.includes(fileFormat)) return IMAGEFILE;
  return VIDEOFILE;
};

for (let i = 0; i < mediaFiles.length; i++) {
  const fileFormat = mediaFiles[i].split(".").pop();
  if (
    !(
      imageFileFormats.includes(fileFormat) ||
      videoFileFormats.includes(fileFormat)
    )
  )
    mediaFiles.splice(i, 1);
}

const Slideshow = ({ endSlideshow }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const timeoutRef = useRef(null);
  //   const pauseTimeout = useRef(null);
  const playerLineRef = useRef(null);
  const slideshowRef = useRef(null);
  //   const [timeouts, setTimeouts] = useState(Array(mediaFiles.length).fill(4000));
  // const [timeout, setTimeout] = useState(1000);
  const defaultTimeout = 4000;
  // const indexCircles = [];
  const videoRef = useRef(null);
  const slideshowContainerRef = useRef();

  useEffect(() => {
    disableBodyScroll(slideshowContainerRef.current, {
      reserveScrollBarGap: true,
    });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);
  // for (let i = 0; i < mediaFiles.length; i++) {
  //   indexCircles.push(
  //     <div
  //       key={i}
  //       className={`index-circle " ${
  //         i === slideIndex ? "current-circle" : ""
  //       } ${i <= slideIndex ? "completed" : ""}`}
  //     >
  //       {i + 1}
  //     </div>
  //   );
  // }

  const getMediaElement = (media) => {
    if (getFileType(media) === IMAGEFILE)
      return <img src={`${media}`} alt="media" />;
    return (
      <video id="video" ref={videoRef} autoPlay muted>
        <source src={`${media}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function updateSlide() {
    if (slideIndex === mediaFiles.length - 1) {
      endSlideshow();
    } else {
      setSlideIndex(slideIndex + 1);
    }
  }

  useEffect(() => {
    resetTimeout();

    const currentMedia = slideshowRef.current.children[slideIndex].children[0];
    if (slideIndex !== 0)
      playerLineRef.current.style.animation = `width-reduce 1000ms linear`;
    const time0 = performance.now();

    if (
      getFileType(mediaFiles[slideIndex]) === IMAGEFILE &&
      !currentMedia.complete
    ) {
      currentMedia.addEventListener("load", () => {
        const time1 = performance.now();
        const delay =
          slideIndex === 0 ? 0 : Math.max(0, 1000 - (time1 - time0));

        setTimeout(() => {
          playerLineRef.current.style.animation = `width-animate ${
            defaultTimeout - 1000
          }ms linear`;
        }, delay);

        timeoutRef.current = setTimeout(() => {
          updateSlide();
        }, defaultTimeout - 1000 + delay);
      });
    } else if (
      getFileType(mediaFiles[slideIndex]) === VIDEOFILE &&
      currentMedia.readyState !== 4
    ) {
      currentMedia.addEventListener("loadeddata", () => {
        const time1 = performance.now();
        const delay =
          slideIndex === 0 ? 0 : Math.max(0, 1000 - (time1 - time0));

        setTimeout(() => {
          playerLineRef.current.style.animation = `width-animate ${
            currentMedia.duration * 1000
          }ms linear`;
        }, delay);

        timeoutRef.current = setTimeout(() => {
          updateSlide();
        }, currentMedia.duration * 1000 + delay);
      });
    } else {
      let timeout =
        getFileType(mediaFiles[slideIndex]) === IMAGEFILE
          ? defaultTimeout
          : currentMedia.duration * 1000;
      if (slideIndex === 0) timeout -= 1000;

      if (getFileType(mediaFiles[slideIndex]) === VIDEOFILE) {
        currentMedia.currentTime = 0;
        // // play video only after sliding completed
        //     currentMedia.pause();
        //     pauseTimeout.current = setTimeout(
        //         () => currentMedia.play(), 1000
        //     );
      }

      setTimeout(() => {
        if (playerLineRef.current) {
          playerLineRef.current.style.animation = `width-animate ${
            timeout - 1000
          }ms linear`;
        }
      }, 1000);

      timeoutRef.current = setTimeout(() => {
        updateSlide();
      }, timeout);
    }

    return () => {
      resetTimeout();
      //   if (pauseTimeout.current) {
      //     clearTimeout(pauseTimeout.current);
      //   }
    };
  }, [slideIndex]);

  return (
    <div className="slideshow-container" ref={slideshowContainerRef}>
      <div
        ref={slideshowRef}
        className="slideshow"
        style={{ transform: `translate3d(${-slideIndex * 100}%, 0, 0)` }}
      >
        {mediaFiles.map((media, index) => (
          <div key={index} className="media-container">
            {getMediaElement(media, index)}
          </div>
        ))}
      </div>
      <div className="counter-container">
        <div className="counter">
          <div className="player-line-background">
            <div className="horizontal-line" />
            {slideIndex === mediaFiles.length - 1 && (
              <div className="vertical-line" />
            )}
          </div>
          <div className="index-circles-container">
            {mediaFiles.map((mediaFile, index) => (
              <button
                type="button"
                key={index}
                disabled={index < slideIndex}
                className={`index-circle " ${
                  index === slideIndex ? "current-circle" : ""
                } ${index <= slideIndex ? "completed" : ""}`}
                onClick={() => setSlideIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div
            ref={playerLineRef}
            className="player-line"
            style={{ transform: `translateX(${-70 + slideIndex * 30}px)` }}
          />
        </div>
        <button
          type="button"
          className="previous-next-button"
          disabled={slideIndex === mediaFiles.length - 1}
          onClick={() => {
            setSlideIndex((prevIndex) => prevIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Slideshow.propTypes = {
  endSlideshow: PropTypes.func.isRequired,
};

export default Slideshow;
