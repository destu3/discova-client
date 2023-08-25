import { MoonLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div
      aria-label="loader-div"
      className="text-[var(--main-text)] h-screen w-screen fixed top-0 left-0 flex justify-center items-center"
    >
      <MoonLoader color="#bb86fc" />
    </div>
  );
};

export default Loader;
