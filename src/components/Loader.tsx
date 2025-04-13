interface LoaderProps {
  message: string;
}

const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin" />
      <p className="text-lg text-green-500 font-bold mt-4">Generating {message}...</p>
    </div>
  );
};

export default Loader;
