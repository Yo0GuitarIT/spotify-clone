import RecentlyPlayedItem from "./RecentlyPlayedItem"

function RecentlyPlayed() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(8)].map((_, index) => (
          <RecentlyPlayedItem key={index} />
        ))}
      </div>
    )
}

export default RecentlyPlayed;