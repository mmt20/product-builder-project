import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
  const { title, description, imageURL } = product;
  return (
    <div className="border rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={"product name"}
        className="rounded-md mb-2"
      />
      <h3>{title}</h3>
      <p>{txtSlicer(description, 100)}</p>
      <div className="flex items-center my-4 space-x-2 ">
        <span className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-500 rounded-full cursor-pointer" />
      </div>
      <div className="flex items-center justify-between">
        <span>$500.000</span>
        <Image
          imageURL="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt={"product name"}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 " width="w-full">
          EDIT
        </Button>
        <Button className="bg-red-700 ">DELETE</Button>
        <Button className="bg-slate-900 ">LOADING</Button>
        <Button className="bg-green-700 ">SUCCESS</Button>
        <Button className="bg-gray-300 ">CANCEL</Button>
      </div>
    </div>
  );
};

export default ProductCard;
