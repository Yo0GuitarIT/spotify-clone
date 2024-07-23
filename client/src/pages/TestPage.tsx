import { useQuery, gql } from "@apollo/client";

const GET_INFO: any = gql`
  query Info {
    getMyTopArtists {
      data {
        artistName
        imageUrl
      }
    }
    getMyTopTracks {
      data {
        albumCoverUrl
        artistName
        songName
      }
    }
    getRecentlyPlayedTracks {
      data {
        albumCoverUrl
        artistName
        songName
      }
    }
  }
`;

interface Artist {
  artistName: string;
  imageUrl: string;
}

interface Track {
  albumCoverUrl: string;
  artistName: string;
  songName: string;
}

interface UserInfoData {
  getMyTopArtists: { data: Artist[] };
  getMyTopTracks: { data: Track[] };
  getRecentlyPlayedTracks: { data: Track[] };
}

function TestPage() {
  const { loading, error, data } = useQuery<UserInfoData>(GET_INFO);

  if (loading) return <p className="mt-8 text-center">Loading...</p>;
  if (error)
    return (
      <p className="mt-8 text-center text-red-500">Error: {error.message}</p>
    );
  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Your Spotify Info</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Top Artists</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data?.getMyTopArtists.data.map((artist, index) => (
            <div key={index} className="text-center">
              <img
                src={artist.imageUrl}
                alt={artist.artistName}
                className="object-cover w-32 h-32 mx-auto mb-2 rounded-full"
              />
              <p className="font-medium">{artist.artistName}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Top Tracks</h2>
        <ul className="space-y-4">
          {data?.getMyTopTracks.data.map((track, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img
                src={track.albumCoverUrl}
                alt={track.songName}
                className="object-cover w-16 h-16"
              />
              <div>
                <p className="font-medium">{track.songName}</p>
                <p className="text-sm text-gray-600">{track.artistName}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Recently Played</h2>
        <ul className="space-y-4">
          {data?.getRecentlyPlayedTracks.data.map((track, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img
                src={track.albumCoverUrl}
                alt={track.songName}
                className="object-cover w-16 h-16"
              />
              <div>
                <p className="font-medium">{track.songName}</p>
                <p className="text-sm text-gray-600">{track.artistName}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TestPage;
