import { useContext, useState, useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { MusicVideoContext } from '../../contexts/music-video.context';
import './music-video-overlay.component.css';

const MusicVideoOverlay = () => {
  const { video, setVideo } = useContext(MusicVideoContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  const overlayProps = useSpring({
    config: { duration: 200 },
    opacity: overlayVisible ? 1 : 0,
  });

  const videoProps = useSpring({
    transform: overlayVisible ? 'scale(1)' : 'scale(0.8)',
  });

  const isWebMSupported = () => {
    // music video element reference
    const { current } = videoRef;

    // Check if the browser supports the 'video/webm' MIME type
    if (current.canPlayType('video/webm')) {
      return true;
    }

    // Check if the browser supports any WebM codecs
    if (
      current.canPlayType('video/webm; codecs="vp8"') === 'probably' ||
      current.canPlayType('video/webm; codecs="vp9"') === 'probably'
    ) {
      return true;
    }

    return false;
  };

  const closeOverlay = e => {
    if (
      e.key === 'Escape' ||
      e.target === overlayRef.current ||
      e.target.classList.contains('close-overlay-btn') ||
      e.target.classList.contains('fa-xmark')
    ) {
      const { current } = videoRef;
      const { currentTime } = current;
      setOverlayVisible(false);
      setVideo({ ...video, link: '', prevCurrentTime: currentTime });
    }
  };

  const playVideo = () => {
    if (video.sameSong) {
      const { current } = videoRef;
      const seekPos = Math.round(video.prevCurrentTime);
      current.currentTime = seekPos;
      current.play();
    }
    setOverlayVisible(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', closeOverlay);

    return () => {
      document.removeEventListener('keydown', closeOverlay);
    };
  }, [video]);

  useEffect(() => {
    setVideo({ ...video, canBePlayed: isWebMSupported() });
  }, []);

  return (
    <animated.div
      ref={overlayRef}
      style={overlayProps}
      className={`overlay w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-[999] ${
        !overlayVisible ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      onClick={closeOverlay}
    >
      <div className="wrapper relative w-[85%] landscape:w-[65%] lg:landscape:w-8/12 xl:w-8/12">
        <header className="text-[var(--main-text)] w-full">
          <h2 className="text-[1.1rem] font-bold mb-3">
            {`${video.slug} - ${video.songTitle}`}
          </h2>
        </header>
        <animated.video
          ref={videoRef}
          onLoadedData={playVideo}
          autoPlay
          loop
          style={videoProps}
          className="rounded-md aspect-video w-full outline-none music-video"
          src={video.link}
          controls
        />
      </div>
      <button
        onClick={closeOverlay}
        title="Close Overlay"
        className="close-overlay-btn absolute flex justify-center items-center top-2 md:top-3 right-3 md:right-10 rounded-full p-3 w-12 h-12 transition-all duration-200 text-[var(--main-text)]"
      >
        <i className="fa-solid text-2xl fa-xmark"></i>
      </button>
    </animated.div>
  );
};

export default MusicVideoOverlay;
