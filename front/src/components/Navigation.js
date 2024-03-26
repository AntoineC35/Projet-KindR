import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="return-button" onClick={goBack}>
      <em>=</em>
    </button>
  );
};

export default Navigation;
