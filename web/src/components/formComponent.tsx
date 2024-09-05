type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    className: string;
}


export default function FormComponent({ onSubmit, children, className }: Props) {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    )
}