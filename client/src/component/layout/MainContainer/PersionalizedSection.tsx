import PersonalizedSectionItem from "./PersonalizedSectionItem";
import { useMyTopTracks } from "../../../hooks/useMyTopTracks";
import { useNewReleases } from "../../../hooks/useNewReleases";

function PersonalizedSection() {
  const { MyTopTracks, isLoading, error } = useMyTopTracks();
  const { newReleases } = useNewReleases();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <PersonalizedSectionItem title="My Top Tracks" items={MyTopTracks} />
      <PersonalizedSectionItem title="New Release" items={newReleases} />
    </>
  );
}

export default PersonalizedSection;
