
export default function Button ({ text = "Button", onClickHandler, className }) {
  return (
    <button
      className={`${className} text-black flex items-center rounded-full hover:scale-105 transition-all duration-150 ease-linear bg-purple-200 drop-shadow-lg `}
      onClick={onClickHandler}
    >
        <p className="font-poppins font-bold py-5 ">
        {text}
        </p>
    </button>
  );
};

