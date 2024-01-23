import Footer from "./footer";
import Header from "./header";

const LayoutWrapper = (props: { children: any }) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default LayoutWrapper;
