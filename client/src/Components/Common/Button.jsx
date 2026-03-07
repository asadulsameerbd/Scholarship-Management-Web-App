const Button = ({ children, type = "button" }) => {
  return (
    <div>
      <button
        type={type}
        className="btn bg-[#f39c12] text-black py-1 rounded-lg"
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
