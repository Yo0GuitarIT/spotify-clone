import PersonalizedSectionItem from "./PersonalizedSectionItem";

function PersionalizedSection() {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((_, sectionIndex) => (
          <PersonalizedSectionItem key={sectionIndex} index={sectionIndex} />
        ))}
    </>
  );
}

export default PersionalizedSection;
