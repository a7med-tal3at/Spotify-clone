import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, error, isLoading } = useGetTopChartsQuery();
  const genreTitle = "Hiphop";

  if (isLoading) return <Loader title="loading ..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map(
          (song, index) =>
            song.images?.coverart && (
              <SongCard
                activeSong={activeSong}
                isPlaying={isPlaying}
                key={song.key}
                song={song}
                data={data}
                i={index}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Discover;
