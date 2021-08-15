import { useSession } from "next-auth/client";

export interface UserCircleProps {}

const UserCircle: React.FC<UserCircleProps> = () => {
  const [session] = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="fixed right-8 top-8">
      <img className="w-12 rounded-full" src={session.user.image} />
    </div>
  );
};

export default UserCircle;
