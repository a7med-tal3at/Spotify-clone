import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { PlayPause } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  handlePlay,
  handlePause,
}) => (
  <div
    className={`w-full flex flex-row justify-between items-center ${
      activeSong?.title === song?.title && "bg-[#4c426e]"
    } hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <div className="flex flex-row justify-center items-center">
      <h2 className="font-bold text-xl text-white mr-4">{index + 1}.</h2>
      <img
        src={song?.images.coverart}
        alt="Artist Image."
        className="w-20 h-20 rounded-lg "
      />
      <div className="ml-4">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song?.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
    <PlayPause
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />
  </div>
);

const TopPlay = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="xl:ml-6 xl:mb-0 xl:max-w-[500px] ml-0 mb-6 flex-1 max-w-full flex flex-col"
      ref={divRef}
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Top Charts</h2>
          <Link to="/to-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, index) => (
            <TopChartCard
              key={song.key}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song, index)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Top Artists</h2>
          <Link to="/to-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        modules={[FreeMode]}
        className="mt-4"
        freeMode
        centeredSlides
        centeredSlidesBounds
      >
        {topPlays?.map((song, index) => (
          <SwiperSlide
            key={song?.key}
            style={{ width: "25%" }}
            className="shadow-lg rounded-full animate-slideright "
          >
            <Link to={`/artists/${song?.artists[0].adamid}`}>
              <img
                src={song?.images.background}
                alt="Artist Image"
                className="rounded-full w-full h-full"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopPlay;
