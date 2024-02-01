import TextInput from "../UI/Inputs/TextInput";

const AccountSettings = () => {
  return (
    <div className="account-settings">
      <div className="address-book__header-2">Account Settings</div>
      <div className="account-settings__form">
        <form className="account-settings__inputs">
          <TextInput label="Name" defaultValue="Laura" placeholder={""} />
          <TextInput
            label="Username"
            defaultValue="laurawilson"
            placeholder={""}
          />
          <TextInput
            label="Email"
            defaultValue="laurawilson@gmail.com"
            type="email"
            placeholder={""}
          />
          <TextInput
            label="Phone number"
            defaultValue="+82 1057012806"
            type="tel"
            placeholder={""}
          />
          <button className="button button-md">Save Changes</button>
        </form>
        <div className="account-settings__photo">
          <img src="/assets/images/users/default.jpg" alt="" />
          <label htmlFor="photo" className="button button__outline">
            Change Image
          </label>
          <input id="photo" type="file" accept="image/*" />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
