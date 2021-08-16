import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { saveProduct, listProducts, deleteProduct } from '../Redux/Actions/productActions';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { ExportReactCSV } from '../Components/TableExport/ExportReactCSV';

const ProductsScreen = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [image, setImage] = useState([])
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [calories, setCalories] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [description, setDescription] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [c_time, setC_time] = useState('')
    const [uploading, setUploading] = useState(false);
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const [categoryOption, setCategoryOption] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/tags/category`)
        .then((result)=>{
            let things = result.data.map(x=> Object.assign({value:x},{label:x}));
            setCategoryOption(things);
        });
        if (successSave) {
            setModalVisible(false)
        }
        dispatch(listProducts());
        return () => {
            // cleanup
        };
    }, [successSave,successDelete])

    const openMoadal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image? product.image: []);
        setCalories(product.calories);
        setType(product.type);
        setC_time(product.c_time);
        setDifficulty(product.difficulty);
        setCategory(product.category? product.category.map(x=>Object.assign({value:x,label:x})):product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setIngredient(product.ingredient);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id, name, price, image,
            type, difficulty, c_time,
            category: category? category.map(x=>x.value): category,
            countInStock, description, ingredient, calories
        }));
    }


    const deleteHandler = (product) => {
        dispatch(deleteProduct( product._id));
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        // bodyFormData.append('image', file);
        setUploading(true);
        axios
          .post('https://img.eservice-hk.net/api.php?version=2', bodyFormData, {
            // .post(`${process.env.REACT_APP_API_SERVER}/api/uploads/`, bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            // crossDomain: true,
          })
          .then((response) => {
            image.splice(image.length - 1, 1, response.data.url);
            setImage([...image]);
            // setImage(process.env.REACT_APP_API_SERVER + response.data);
            setUploading(false);
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
      };

    const getPreferences = () => new Promise(resolve => {
        resolve(categoryOption);
    });

    return (
        <div className="content-margined">
            <div className="product-header">
                <h1>Products</h1>
                <button className=" btn" onClick={()=>openMoadal({})}>Create Product</button>
                {errorDelete && <h4>{errorDelete}</h4>}
            </div>

            {modalVisible && 
                  <div className="">
                  <form onSubmit={submitHandler} className="CreateProduct_form-container">
                      <ul className="form-container">
                          <li>
                              <h2>Create Product</h2>
                          </li>
                          <li>
                              {loadingSave && <div>Loading...</div>}
                              {errorSave && <div>{errorSave}</div>}
                          </li>
                          <li>
                              <label htmlFor="name">
                                  Name
                          </label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </li>
                     
                          <li>
                              <label htmlFor="price">
                                  Price
                          </label>
                              <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                          </li>
                          <li>
                              <label htmlFor="image">
                                  Image
                          </label>
                              {image.map((x, index)=>(
                                  <input type="text" name="image" value={x} onChange={(e) => {image.splice(index, 1, e.target.value);setImage([...image]);}}></input>
                              ))}
                              <input type="file" onChange={uploadFileHandler}></input>
                              <button onClick={(e)=>{e.preventDefault();image.splice(image.length,0,'');setImage([...image]);}}>Add 1 Row</button>
                              <button onClick={(e)=>{e.preventDefault();image.splice(image.length-1,1);setImage([...image]);}}>Remove Last Row</button>
                              {uploading && <div>Uploading...</div>}
                          </li>
                        <li>
                              <label htmlFor="type">
                                  Type
                          </label>
                              <input type="text" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}></input>
                          </li>
                          </ul>
                          <ul className="form-container">
                          <li>
                              <label htmlFor="category">
                                  Category
                          </label>
                              {/* <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input> */}
                              <AsyncCreatableSelect
                                isMulti cacheOptions defaultOptions
                                name="category" id="category"
                                value={category}
                                loadOptions={getPreferences}
                                onChange={(e) => setCategory(e)} />
                          </li>
                          <li>
                              <label htmlFor="countInStock">
                                  CountInStock
                          </label>
                              <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                        </li>
                        <li>
                              <label htmlFor="description">
                                  Description
                          </label>
                              <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </li>
                        <li>
                              <label htmlFor="ingredient">
                                  Ingredient
                          </label>
                              <textarea name="ingredient" id="ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)}></textarea>
                        </li>
                        <li>
                              <label htmlFor="difficulty">
                              Difficulty
                          </label>
                              <input type="text" name="difficulty" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}/>
                          </li>
                          <li>
                              <label htmlFor="c_time">
                                  Cooking Time
                          </label>
                              <input type="text" name="c_time" id="c_time" value={c_time} onChange={(e) => setC_time(e.target.value)}/>
                        </li>
                        <li>
                              <label htmlFor="calories">
                                  Calories
                          </label>
                              <input type="text" name="calories" id="calories" value={calories} onChange={(e) => setCalories(e.target.value)}/>
                          </li>
  
                          <li>
                            <button type="submit" className="button primary">{ id ? "Update":"Create"}</button>
                        </li>
                        <li>
                              <button type="button" onClick={()=>{setModalVisible(false);console.log(image);}} className="button secondary">Back</button>
                          </li>
                      </ul>
  
                  </form>
              </div>

        }
          
        {products && <div className="col-md-4 center">
            <ExportReactCSV csvData={products} />
        </div>}

            <div className="product-list_div__Content">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {products ? products.map(product => (<tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category.map(x=>(<>{x}<br/></>))}</td>
                            <td>{product.type}</td>
                            <td><button className="button" onClick={()=>openMoadal(product)} >Edit</button>
                                <button className="button" onClick={() => deleteHandler(product)}>Delete</button></td>
                        </tr>
                        )):<tr/>}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default ProductsScreen;