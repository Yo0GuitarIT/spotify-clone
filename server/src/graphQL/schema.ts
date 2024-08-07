import { IResolvers } from "@graphql-tools/utils";
import { IDataService } from "../interface/interface";
import { NotFoundError } from "../utils/customError";

export const typeDefs = `#graphql
  type Track {
    songName: String!
    artistName: String!
    albumCoverUrl: String!
  }
  
  type Artist {
  artistName:String!
  imageUrl:String!
  }

  type TracksResponse {
    success: Boolean!
    data: [Track!]!
    message: String!
  }

  type ArtistsResponse {
    success: Boolean!
    data: [Artist!]!
    message: String!
  }

  type Query {
    getRecentlyPlayedTracks: TracksResponse!
    getMyTopTracks: TracksResponse!
    getMyTopArtists: ArtistsResponse!
  }
`;

export const createResolvers = (dataService: IDataService): IResolvers => ({
  Query: {
    getRecentlyPlayedTracks: async () => {
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

    getMyTopTracks: async () => {
      try {
        const data = await dataService.getMyTopTracks();
        if (!data) {
          throw new NotFoundError("My top tracks not found");
        }
        const extractedData = data.body.items.slice(0, 16).map((item: any) => ({
          songName: item.name,
          artistName: item.artists.map((artist: any) => artist.name).join(", "),
          albumCoverUrl: item.album.images[0]?.url ?? "",
        }));
        return {
          success: true,
          data: extractedData,
          message: "Top tracks retrieved successfully",
        };
      } catch (error) {
        console.error("My top tracks not found");
        throw error;
      }
    },

    getMyTopArtists: async () => {
      try {
        const data = await dataService.getMyTopArtists();
        if (!data) {
          throw new NotFoundError("My top artists not found");
        }
        const extractedData = data.body.items.map((item: any) => ({
          artistName: item.name,
          imageUrl: item.images[1].url,
        }));
        return {
          success: true,
          data: extractedData,
          message: "Top artists retrieved successfully",
        };
      } catch (error) {
        console.error("Top artists not foound");
      }
    },
  },
});
