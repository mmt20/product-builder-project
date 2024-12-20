import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
  const { title, description, imageURL, price, category } = product;
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={"product image"}
        className="rounded-md mb-4 w-full  h-56 object-cover"
      />
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description)}
      </p>
      <div className="flex items-center my-4 space-x-2 ">
        <span className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-500 rounded-full cursor-pointer" />
      </div>
      <div className="flex items-center justify-between">
        <span>${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 hover:bg-indigo-800 ">EDIT</Button>
        <Button className="bg-red-700  hover:bg-red-800">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
