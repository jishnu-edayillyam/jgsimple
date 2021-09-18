import React from "react";
import {
  IMAGEFILE,
  IMAGE_FILE_FORMATS,
  VIDEOFILE,
  VIDEO_FILE_FORMATS,
} from "../constants";

export const getFileType = (media) => {
  const fileFormat = media.split(".").pop();
  if (IMAGE_FILE_FORMATS.includes(fileFormat)) return IMAGEFILE;
  return VIDEOFILE;
};

export const filterMediaFiles = (mediaFiles) => {
  for (let i = 0; i < mediaFiles.length; i++) {
    const fileFormat = mediaFiles[i].split(".").pop();
    if (
      !(
        IMAGE_FILE_FORMATS.includes(fileFormat) ||
        VIDEO_FILE_FORMATS.includes(fileFormat)
      )
    )
      mediaFiles.splice(i, 1);
  }
};

export const getMediaElement = (media) => {
  if (getFileType(media) === IMAGEFILE)
    return <img src={`${media}`} alt="media" />;
  return (
    <video id="video" autoPlay muted loop>
      <source src={`${media}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
