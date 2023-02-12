import ReactDOM from "react-dom";

// HOC
const Portal = (Component: React.FunctionComponent<any>) => (props: any) => {
  return ReactDOM.createPortal(
    <Component {...props} />,
    document.getElementById("portal") as HTMLElement
  );
};

export default Portal;
