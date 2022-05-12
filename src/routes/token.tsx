import { useParams, useOutletContext } from "react-router-dom";

export default function Token() {
  const [open, setOpen] = useOutletContext<any>();
  let params = useParams();

  const close = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      {open && (
        <div className="modal">
          <div className="modal_content">
            <div className="modal_text">{params.token}</div>
            <button className="btn_default modal_button" onClick={close}>
              skip
            </button>
          </div>
        </div>
      )}
    </>
  );
}
