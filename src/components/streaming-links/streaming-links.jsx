import { useContext } from 'react';
import { MusicVideoContext } from '../../contexts/music-video.context';
import './streaming-links-component.css';

const StreamingLinks = ({ theme, slug, iconSize }) => {
  const { songTitle, video, songId, artists } = theme;
  const { video: musicVideo, setVideo } = useContext(MusicVideoContext);

  const displayVideo = () => {
    setVideo({
      ...musicVideo,
      link: video.link,
      slug,
      songTitle,
      songId,
      sameSong: musicVideo.songId === songId,
    });
  };

  return (
    <ul className="streaming-links flex gap-2">
      {musicVideo.canBePlayed && (
        <li>
          <button
            onClick={displayVideo}
            className="play-mv outline-none"
            title="Play Music Video"
          >
            <i
              className={`fa-regular fa-circle-play ${iconSize} transition-colors duration-300`}
            ></i>
          </button>
        </li>
      )}

      <li>
        <a
          target="_blank"
          title="Search on YouTube"
          rel="noreferrer"
          href={encodeURI(
            `https://www.youtube.com/results?search_query=${songTitle} ${
              artists.length > 0 ? `${artists[0].name}` : ''
            }`
          )}
          className="youtube-link"
        >
          <i className={`fa-brands fa-youtube ${iconSize}`}></i>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          title="Search on Spotify"
          rel="noreferrer"
          href={encodeURI(
            `https://open.spotify.com/search/${songTitle} ${
              artists.length > 0 ? `${artists[0].name}` : ''
            }`
          )}
          className="spotify-link"
        >
          <i className={`fa-brands fa-spotify ${iconSize}`}></i>
        </a>
      </li>
    </ul>
  );
};

export default StreamingLinks;
