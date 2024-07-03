function NowPlaying() {
  return (
    <div className="flex-1 flex items-center gap-2">
      <img
        src="https://i.scdn.co/image/ab67616d00001e0290ceed4862375f0d68f55002"
        alt="img"
        className="rounded-sm size-14"
      />
      <div className="flex flex-col gap-[2px]">
        <p>宇多田光 </p>
        <p className="text-sm text-[#a7a7a7]">First Love</p>
      </div>
    </div>
  );
}

export default NowPlaying;
