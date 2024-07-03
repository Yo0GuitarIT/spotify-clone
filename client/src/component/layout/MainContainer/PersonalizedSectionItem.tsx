import PersonalizedCard from "./PersonalizedCard";

function PersionalizedSectionItem({ index }: { index: number }) {
  return (
    <div>
      <div className="h-[60px] flex flex-col-reverse mb-2">
        <h2 className="text-2xl font-bold">
          專為 Chen Yu Ling 精心打造 {index + 1}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {[...Array(8)].map((_, index) => (
          <PersonalizedCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default PersionalizedSectionItem;