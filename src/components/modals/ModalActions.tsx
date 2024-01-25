const ModalActions = (props: { closeModal: () => void; text: string }) => {
  return (
    <div className="address-form__bottom">
      <button className="button button-md" onClick={props.closeModal}>
        Save Product
      </button>
      <div>
        {props.text.includes("Edit") && (
          <button
            className="button button-md delete-button"
            children="Delete"
          />
        )}
        <button className="button button-md" onClick={props.closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalActions;
