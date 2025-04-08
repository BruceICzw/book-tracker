import { Authenticated, Unauthenticated } from "convex/react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function HomePage() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <BookOpen size={64} className="hero-icon" />
                <h1>Welcome to Book Tracker</h1>
                <p className="subtitle">Keep track of your reading journey and never lose sight of your literary adventures</p>
            </div>
            
            <div className="cta-section">
                <Authenticated>
                    <Link to="/dashboard" className="primary-button">
                        Go to your dashboard
                    </Link>
                    <p>Manage your book collection and track your reading progress</p>
                </Authenticated>
                <Unauthenticated>
                    <Link to="/sign-in" className="primary-button">
                        Sign in to get started
                    </Link>
                    <p>Create an account to start tracking your books</p>
                </Unauthenticated>
            </div>
        </div>
    )
}