import { Link } from "react-router-dom";

const HeaderTop = () => {
  return (
    <div className="header__top">
      <div className="container">
        <div className="header__top--content">
          <Link to="/home" className="header__brand">
            Welcome To Groceteria
          </Link>
          <form className="header__search">
            <input type="text" placeholder="Search for products" />
            <img
              className="search-icon"
              src="/assets/icons/search-icon.svg"
              alt="Search Icon"
            />
            <button className="search-btn button">Search</button>
          </form>
          <div className="header__cart">
            <div className="header__cart--liked">
              <div>
                <svg>
                  <use href="/assets/icons/icons.svg#icon-heart"></use>
                </svg>
              </div>
            </div>
            <div className="header__cart--bag">
              <div className="cart-bag">
                <svg>
                  <use href="/assets/icons/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span className="items-number">2</span>
              </div>
            </div>
            <div className="header__cart--auth">
              <div className="header__cart--not-logged">
                <Link to="/auth/login" className="login-btn">
                  Sign in
                </Link>
                <span> / </span>
                <Link to="/auth/signup" className="login-btn">
                  Sign up
                </Link>
              </div>
              {/* <Link to="/my-dashboard" className="header__cart--user">
                    <img src="/assets/images/users/default.jpg" alt="User" />
                  </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
