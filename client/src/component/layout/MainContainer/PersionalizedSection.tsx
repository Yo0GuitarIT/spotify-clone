import PersonalizedSectionItem from "./PersonalizedSectionItem";
import { useNewReleases } from "../../../hooks/useNewReleases";
import { useFeaturedPlaylists } from "../../../hooks/useFeaturedPlaylists";

function PersonalizedSection() {
  const {
    newReleases,
    isLoading: isLoadingNewReleases,
    error: newReleasesError,
  } = useNewReleases();
  const {
    featuredPlaylists,
    isLoading: isLoadingPlaylists,
    error: playlistsError,
  } = useFeaturedPlaylists();

  if (isLoadingNewReleases || isLoadingPlaylists) return <div>Loading...</div>;
  if (newReleasesError || playlistsError) return <div>Error loading data</div>;

  return (
    <>
      <PersonalizedSectionItem title="New Releases" items={newReleases} />
      <PersonalizedSectionItem
        title="featuredPlaylists"
        items={featuredPlaylists}
      />
    </>
  );
}

export default PersonalizedSection;
