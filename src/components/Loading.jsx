import { BarLoader } from "react-spinners";
function Loading() {
  return (
    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4">
      <BarLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
