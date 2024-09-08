import { componentProps } from '../objects.model';

type Props = componentProps['cardProps'];

export default function CardComponent({ title, children, className, childrenClassName = '', titleClassName = '' }: Props) {
    return (
        <div>
            <div className={`${className} block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mt-10`}>
                <h5 className={`${titleClassName} mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}>
                    {title}
                </h5>
                <div className={`${childrenClassName} font-normal text-gray-700 dark:text-gray-400`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
