import { Link } from 'react-router-dom';
import CardComponent from './cardComponent';

// Define your CardListContainer if needed
const CardListContainer = [
    {
        title: 'Sales Overview',
        content: 'Total sales this month: $12,345'
    },
    {
        title: 'User Statistics',
        content: [
            'Total users: 1,234',
            'New sign-ups this month: 56'
        ]
    },
    {
        title: 'Orders Summary',
        content: [
            'Total orders this month: 123',
            'Pending orders: 15'
        ]
    }
];

export default function Dashboard() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0 dark:bg-dark_theme-background dark:text-dark_theme-text">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                    <ul>
                        <li className="mb-4">
                            <Link to="/dashboard" className="hover:text-gray-400 dark:hover:text-gray-300">Home</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/products" className="hover:text-gray-400 dark:hover:text-gray-300">Products</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/orders" className="hover:text-gray-400 dark:hover:text-gray-300">Orders</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/users" className="hover:text-gray-400 dark:hover:text-gray-300">Users</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="hover:text-gray-400 dark:hover:text-gray-300">Settings</Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100 dark:bg-dark_theme-background">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CardListContainer.map((card, index) => (
                        <CardComponent
                            key={index}
                            title={card.title}
                            className='shadow-xl rounded-lg p-6 border-0 dark:bg-gray-800 dark:text-dark_theme-text'
                            titleClassName='text-xl font-semibold dark:text-dark_theme-header'
                            childrenClassName=''
                        >
                            {Array.isArray(card.content) ? (
                                card.content.map((text, idx) => (
                                    <p key={idx} className="text-gray-700 dark:text-gray-300">{text}</p>
                                ))
                            ) : (
                                <p className="text-gray-700 dark:text-gray-300">{card.content}</p>
                            )}
                        </CardComponent>
                    ))}
                </div>
            </main>
        </div>
    );
}
