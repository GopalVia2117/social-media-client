import { useRef } from "react";

export default function UnderDevelopment({ setModal }) {
  const closeBtn = useRef();
  const model = useRef();

  setModal(model);

  return (
    <>
      <dialog
        className="flex flex-col justify-center text-center content-center rounded-md w-80 h-96"
        ref={model}
      >
        <div className="">
          <video autoplay loop src="/assets/presentation.mp4">
            Working on this feature...
          </video>
          <button
            className="bg-green-800 text-white rounded-lg px-2 py-1 mt-2"
            onClick={() => {
              model.current.close();
            }}
            value="close"
            ref={closeBtn}
            formMethod="dialog"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
