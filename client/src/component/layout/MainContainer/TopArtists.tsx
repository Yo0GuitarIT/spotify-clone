import TopArtistsItem from "./TopArtistsItem";
import { useMyTopArtitsts } from "../../../hooks/useMyTopArtist";

function TopArtists() {
  const { myTopArtists, isLoading, error } = useMyTopArtitsts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {myTopArtists.slice(0, 8).map((artist, index) => (
        <TopArtistsItem key={index} artist={artist} />
      ))}
    </div>
  );
}

export default TopArtists;