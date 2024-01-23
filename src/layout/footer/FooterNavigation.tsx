const myAccountItems = [
  { name: "My Dashboard", link: "/my-dashboard" },
  { name: "Order History", link: "/orders" },
  { name: "My Cart", link: "/my-cart" },
  { name: "Wishlist", link: "/wishlist" },
];
const myHelpsItems = [
  { name: "Contact Us", link: "/contact-us" },
  { name: "Customer Center", link: "/customer-center" },
  { name: "Terms & Privacy", link: "/terms-privacy" },
  { name: "About Us", link: "/about-us" },
];

const FooterNavigation = ({ text }: { text: string }) => {
  let items = text === "My Account" ? myAccountItems : myHelpsItems;
  return (
    <ul className="footer__navigation">
      <li className="footer__navigation--title">{text}</li>
      {items.map((item, i) => (
        <li className="footer__navigation--link" key={i}>
          <a href="/">{item.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default FooterNavigation;
