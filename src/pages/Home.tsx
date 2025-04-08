import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";


export default function HomePage() {
    return (
        <div>
            <h1>Welcome to Book Tracker</h1>
            <SignedOut>
                <p>Please <Link to="/sign-in">sign in</Link> to access your book Collection</p>
            </SignedOut>
            <SignedIn>
                <p>Go to your <Link to="/dashboard">dashboard</Link> to see your books.</p>
            </SignedIn>
        </div>
    )
}