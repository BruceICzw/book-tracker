import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <LogOut size={16} />
      <span>Sign Out</span>
    </button>
  );
}
