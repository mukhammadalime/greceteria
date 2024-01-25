const AdditionalInfo = () => {
  return (
    <div className="additional">
      <h2>Additional Information</h2>
      <div className="input-form additional__main">
        <div className="input">
          <label htmlFor="note">
            Order Notes <span>(Optional)</span>{" "}
          </label>
          <textarea
            name="notes"
            id="note"
            placeholder="Notes about your order, e.g. special notes for delivery"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
