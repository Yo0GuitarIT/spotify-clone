import { IResolvers } from "@graphql-tools/utils";
import { IDataService } from "../interface/interface";
import { NotFoundError } from "../utils/customError";

export const typeDefs = `#graphql
  type Track {
    songName: String!
    artistName: String!
    albumCoverUrl: String!
  }
  type RecentlyPlayedTracksResponse {
    success: Boolean!
    data: [Track!]!
    message: String!
  }
  type Query {
    recentlyPlayedTracks: RecentlyPlayedTracksResponse!
  }
`;

export const createResolvers = (dataService: IDataService): IResolvers => ({
  Query: {
    recentlyPlayedTracks: async () => {
      try {
        const data = await dataService.getMyRecentlyPlayedTracks();
        if (!data) {
          throw new NotFoundError("No recently played tracks found");
        }
        const extractedData = data.body.items.map((item: any) => ({
          songName: item.track.name,
          artistName: item.track.artists[0].name ?? "Unknown Artist",
          albumCoverUrl: item.track.album.images[2]?.url ?? "",
        }));
        return {
          success: true,
          data: extractedData,
          message: "Recently played tracks retrieved successfully",
        };
      } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        throw error;
      }
    },
  },
});
