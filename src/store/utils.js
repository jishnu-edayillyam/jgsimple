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

export const slugify = (str) => {
  let slug = str.replace(/[^a-zA-Z0-9\s]+/g, ""); // trim
  slug = slug.replace(/^\s+|\s+$/g, ""); // trim
  slug = slug.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    slug = slug.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  slug = slug
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return slug;
};
