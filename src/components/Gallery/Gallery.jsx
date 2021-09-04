import React from "react";
import "./style.scss";

const IMAGEFILE = "image_file";
const VIDEOFILE = "video_file";

const mediaFiles = [
  "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
  "https://i.pinimg.com/236x/cb/ed/be/cbedbee750107201a2d1604192c74a7b.jpg",
  "https://hips.hearstapps.com/pop.h-cdn.co/assets/17/24/640x320/landscape-1497533116-not-dead.gif",
  "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg",
  "https://i.pinimg.com/564x/8e/2c/45/8e2c45f0ba71c610699c6696cbed3804.jpg",
  "28606760851a477da185da5584b6d2f1.mp4",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
  "https://i.pinimg.com/564x/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg",
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

const getMediaElement = (media) => {
  if (getFileType(media) === IMAGEFILE)
    return <img src={`${media}`} alt="media" />;
  return (
    <video id="video" autoPlay muted loop>
      <source src={`${media}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const Gallery = () => {
  return (
    <div className="gallery">
      {mediaFiles.map((mediaFile, index) => getMediaElement(mediaFile, index))}
    </div>
  );
};

export default Gallery;
