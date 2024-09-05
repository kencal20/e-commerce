import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <h2 className="text-2xl text-gray-600 mt-4">Oops! Page not found</h2>
            <p className="text-gray-500 mt-2">The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Homepage
            </Link>
        </div>
    );
}
