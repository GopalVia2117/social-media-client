function NoPost() {
  return (
    <div className="w-full h-96 flex flex-col justify-center items-center shadow-md rounded-sm gap-4">
      <video autoPlay loop className="w-36" src="/assets/no-photo.mp4">
        {" "}
        &#128546;{" "}
      </video>
      <p className="font-medium text-2xl text-red-400">No post to show.</p>
    </div>
  );
}

export default NoPost;
