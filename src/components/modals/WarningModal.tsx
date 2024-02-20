import ReactDOM from "react-dom";
import CloseIcon from "../UI/Icons/CloseIcon";
import { useContext, useState } from "react";
import { CartContext } from "../../store/CartContext";
import { deleteProductCart } from "../../api/cart";
import LoadingButtonSpinner from "../UI/Icons/LoadingButtonSpinner";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const WarningOverlay = ({ closeModal, text, id }: WarningModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state, dispatch } = useContext(CartContext);
  const axiosPrivate = useAxiosPrivate();

  const onDeleteProductFromCart = async () => {
    await deleteProductCart(dispatch, id, axiosPrivate, setLoading);
    closeModal();
  };

  return (
    <div className="warning">
      <div className="warning__header">
        <h3>Confirm</h3>
        <div className="warning__close" onClick={closeModal}>
          <CloseIcon />
        </div>
      </div>
      <h2>{text}</h2>
      <div className="warning__bottom">
        <button
          className="button"
          onClick={onDeleteProductFromCart}
          disabled={state.updateLoading && true}
          children={loading ? <LoadingButtonSpinner /> : "Confirm"}
        />
        <button className="button" onClick={closeModal}>
          No, thanks
        </button>
      </div>
    </div>
  );
};

const WarningModal = ({ closeModal, text, id }: WarningModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <WarningOverlay closeModal={closeModal} text={text} id={id} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface WarningModalProps {
  closeModal: () => void;
  text: string;
  id: string;
}

export default WarningModal;
