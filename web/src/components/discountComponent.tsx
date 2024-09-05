import img from '../img/download.jpeg'

type Props = {}

export default function DiscountComponent({ }: Props) {
    return (
        <div className="relative h-96 w-full flex overflow-hidden">
            <img src={img} className="w-full object-cover" />
            <div className="absolute inset-0 flex  left-1/2 top-20 text-white text-4xl font-bold">
                SPECIAL DISCOUNT - UP TO 10% OFF!
            </div>
        </div>
    )
}
