import { services } from '../data/servicesData'; // Adjust the path to where your servicesData file is located

export default function ServicesComponent() {
    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Services</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                            <div className="mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
