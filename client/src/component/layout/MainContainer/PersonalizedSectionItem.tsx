import PersonalizedCard from "./PersonalizedCard";

interface PersionalizedSectionItemProps {
  title: string;
  items: any[];
}

function PersionalizedSectionItem({
  title,
  items,
}: PersionalizedSectionItemProps) {
  return (
    <div>
      <div className="h-[60px] flex flex-col-reverse mb-2">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {items.map((item, index) => (
          <PersonalizedCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PersionalizedSectionItem;
