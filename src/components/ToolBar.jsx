import { Message } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ToolBar() {
  return (
    <div className="fixed bottom-6 right-6 sm:hidden">
      <Link
        to="/messenger"
        className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white text-2xl rounded-full ml-4"
      >
        <Message />
      </Link>
    </div>
  );
}
