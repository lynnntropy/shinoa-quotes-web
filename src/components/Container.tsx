import Link from "next/link";
import { homePage } from "../utils/routes";

export interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <div className="mt-14 flex justify-center">
        <Link href={homePage()}>
          <a>
            <h1 className="inline-block text-2xl font-bold text-gray-lightest">
              Shinoa Quotes
            </h1>
          </a>
        </Link>
      </div>

      <main className="max-w-xl mx-auto my-8 px-8 py-7 md:bg-gray md:rounded-lg md:shadow-md">
        {children}
      </main>
    </>
  );
};

export default Container;
