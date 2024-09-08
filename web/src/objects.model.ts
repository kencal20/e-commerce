interface cardProps {
  title: string;
  children: React.ReactNode
  className?: string
  titleClassName:string
  childrenClassName:string
}
interface productsProps {
  name: string
  price: number;
  brand: string
  img: string
}

interface slidesProps {
  id: string;
  src: string;
  alt: string;
}

interface inputProps {
  name: string
  label: string
  value: string
  type: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
  className: string
}

interface userProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface statusProps {
  text: string,
  variant: 'danger' | 'success' | undefined
}

interface protectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
};
export interface componentProps {
  cardProps: cardProps;
  productsProps: productsProps;
  slidesProps: slidesProps;
  inputProps: inputProps
  userProps: userProps
  statusProps: statusProps;
  protectedRouteProps: protectedRouteProps;
}
