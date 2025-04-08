import { useClerk } from "@clerk/clerk-react";

export default function LogoutButton() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Sign Out
    </button>
  );
}
