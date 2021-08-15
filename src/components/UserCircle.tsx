import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/client";
import { Fragment } from "react";

export interface UserCircleProps {}

const UserCircle: React.FC<UserCircleProps> = () => {
  const [session] = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="fixed right-8 top-8">
      <Menu>
        <Menu.Button className="rounded-full hover:bg-opacity-30 focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-opacity-75">
          <img className="w-12 rounded-full" src={session.user.image} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-44 mt-2 origin-top-right bg-gray-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-gray-700"
                  } group flex rounded-md items-center w-full px-4 py-3 text-sm text-white`}
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserCircle;
