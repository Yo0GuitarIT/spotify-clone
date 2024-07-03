import PersonalizedCard from "./PersonalizedCard";
import { useNewReleases } from "../../../hooks/useNewReleases";

function PersionalizedSectionItem() {
  const { newReleases, isLoading, error } = useNewReleases();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="h-[60px] flex flex-col-reverse mb-2">
        <h2 className="text-2xl font-bold">New Releases</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {newReleases.map((release, index) => (
          <PersonalizedCard key={index} release={release} />
        ))}
      </div>
    </div>
  );
}

export default PersionalizedSectionItem;
