export interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <h1 className="mt-14 text-center text-2xl font-bold text-gray-400">
        Shinoa Quotes
      </h1>
      <main className="max-w-xl mx-auto mt-8 px-8 py-7 bg-gray-700 rounded-lg shadow-md">
        {children}
      </main>
    </>
  );
};

export default Container;
