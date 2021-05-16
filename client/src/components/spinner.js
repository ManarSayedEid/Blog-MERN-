import spinner from "../img/Spinner.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt="Loading.."
        style={{ margin: "auto", display: "block" }}
      />
    </>
  );
};

export default Spinner;
