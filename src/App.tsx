import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { TProductName } from "./types";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* ------- STATE -------  */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  /* ------- HANDLERS -------  */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openEditModal = () => setOpenEditModal(true);
  const closeEditModal = () => setOpenEditModal(false);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };
  const removeProductHandler = () => {
    console.log("Do YOU WANT TO DELETE PRODUCT ? ");
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    //console.log(errors);
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
    console.log("SEND DATA TO SERVER");
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedColors = Array.from(
      new Set([...productToEdit.colors, ...tempColors])
    );

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: updatedColors,
    };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditModal();
  };

  /* ------- RENDER -------  */
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      product={product}
      key={product.id}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (isOpenEditModal) {
          if (productToEdit.colors.includes(color)) {
            setProductToEdit((prev) => ({
              ...prev,
              colors: prev.colors.filter((c) => c !== color),
            }));
          } else if (tempColors.includes(color)) {
            setTempColor((prev) => prev.filter((c) => c !== color));
          } else {
            setTempColor((prev) => [...prev, color]);
          }
        } else {
          if (tempColors.includes(color)) {
            setTempColor((prev) => prev.filter((item) => item !== color));
          } else {
            setTempColor((prev) => [...prev, color]);
          }
        }
      }}
    />
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };
  return (
    <main className="container">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-2 md:gap-4  p-2 rounded-md ">
        {renderProductList}
      </div>

      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap space-x-1 ">
            {renderProductColor}
          </div>
          <div className="flex items-center flex-wrap  space-x-1 ">
            {tempColors.map((color) => (
              <span
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3 ">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-600"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT PRODUCT MODAL */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center flex-wrap space-x-1 ">
            {renderProductColor}
          </div>
          <div className="flex items-center flex-wrap  space-x-1 ">
            {Array.from(new Set([...tempColors, ...productToEdit.colors])).map(
              (color) => (
                <span
                  className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  style={{ backgroundColor: color }}
                  key={color}
                >
                  {color}
                </span>
              )
            )}
          </div>

          <div className="flex items-center space-x-3 ">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export default App;

// SM => MD => LG => XL => 2xl => 3xl;
