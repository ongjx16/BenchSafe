
export default function Button({ text = "Button", onClickHandler, className }) {
    return (
        <button
            className={`${className} text-black flex w-5/6 items-center rounded-full hover:scale-105 transition-all duration-150 ease-linear bg-gradient-to-r from-blue-300 to-blue-600 drop-shadow-lg `}
            onClick={onClickHandler}>
            <p className="font-poppins font-bold py-5">
                {text} hello
            </p>
        </button>
    );
};

