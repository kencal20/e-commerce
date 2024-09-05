import { Link } from 'react-router-dom';
import CardComponent from './cardComponent';

export default function Dashboard() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                    <ul>
                        <li className="mb-4">
                            <Link to="/dashboard" className="hover:text-gray-400">Home</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/products" className="hover:text-gray-400">Products</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/orders" className="hover:text-gray-400">Orders</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/users" className="hover:text-gray-400">Users</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="hover:text-gray-400">Settings</Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



                    <CardComponent
                        title='Sales Overview'
                        className=' shadow rounded-lg p-6'   >
                        <p className="text-gray-700">Total sales this month: $12,345</p>
                    </CardComponent>



                    <CardComponent
                        title='User Statictics'
                        className='shadow rounded-lg p-6'    >
                        <p className="text-gray-700">Total users: 1,234</p>
                        <p className="text-gray-700">New sign-ups this month: 56</p>

                    </CardComponent>

                    <CardComponent
                    title='Orders Summary'>

                        <h2 className="text-xl font-semibold mb-4"></h2>
                        <p className="text-gray-700">Total orders this month: 123</p>
                        <p className="text-gray-700">Pending orders: 15</p>
                    </CardComponent>
                
                </div>
            </main>
        </div>
    );
};

