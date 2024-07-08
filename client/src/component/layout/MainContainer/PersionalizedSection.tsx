import PersonalizedSectionItem from "./PersonalizedSectionItem";
import { useMyTopTracks } from "../../../hooks/useMyTopTracks";
import { useNewReleases } from "../../../hooks/useNewReleases";

function PersonalizedSection() {
  const { myTopTracks, isLoading: isLoadingTracks, error: tracksError } = useMyTopTracks();
  const { newReleases, isLoading: isLoadingReleases, error: releasesError } = useNewReleases();

  if (isLoadingTracks || isLoadingReleases) return <div>Loading...</div>;
  if (tracksError || releasesError) return <div>Error loading data</div>;

  return (
    <>
      <PersonalizedSectionItem title="My Top Tracks" items={myTopTracks}  type="track"/>
      <PersonalizedSectionItem title="New Release" items={newReleases} type="album" />
    </>
  );
}

export default PersonalizedSection;
