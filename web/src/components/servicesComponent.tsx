import CardComponent from './cardComponent';
import services from '../data/servicesData';

export default function ServicesComponent() {
    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Services</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <CardComponent
                            key={index}
                            title={service.title}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg  border-0 shadow-lg"
                            childrenClassName=''
                            titleClassName="dark:text-gray-400 "
                        >
                            <div className="mb-4">
                                {service.icon}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                        </CardComponent>
                    ))}
                </div>
            </div>
        </div>
    );
}
