import { useOutletContext } from "react-router-dom";
import ArrowRight from "../components/ArrowRight";

export default function Token() {
  const [modalContext, setModalContext] = useOutletContext<any>();

  const close = () => {
    setModalContext({ ...modalContext, open: false });
  };

  return (
    <>
      {modalContext.open && ( // Open modal only when a word is clicked.
        <div className="modal">
          <div className="modal_content">
            <div className="modal_text">{modalContext.token}</div>
            <button className="btn_default modal_button" onClick={close}>
              skip <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
