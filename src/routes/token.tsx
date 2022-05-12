import { useParams, useOutletContext } from "react-router-dom";
import ArrowRight from "../components/ArrowRight";

export default function Token() {
  const [open, setOpen] = useOutletContext<any>();
  let params = useParams();

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      {open && ( // Open modal only when a word is clicked.
        <div className="modal">
          <div className="modal_content">
            <div className="modal_text">{params.token}</div>
            <button className="btn_default modal_button" onClick={close}>
              skip <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
