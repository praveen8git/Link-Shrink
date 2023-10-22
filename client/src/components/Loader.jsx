export default function BouncingLoader() {
  return (
    <>
    <div className="flex justify-center items-center overflow-hidden h-[60px]">
      <div className="dot animate-loader"></div>
      <div className="dot animate-loader animation-delay-200"></div>
      <div className="dot animate-loader animation-delay-400"></div>
    </div>
    </>
  );
}