import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ListBook = (props)=>{

    const dispatch = useDispatch();
    const { categoriesState, booksState } = useSelector((state) => state);
    console.log("bookstate",booksState);
    console.log("categoriestate",categoriesState);

    //const [books,setBooks]=useState(null);
   // const [cat,setCat]=useState(null);
    const [didUpdate,setDidUpdate]=useState(false);
    const[showModal,setShowModal]=useState(false);
    const [toDeleteBook,setToDeleteBook]=useState(null);
    const [ toDeleteBookname,setToDeleteBookname] =useState("");


    useEffect(()=>{
        // axios.get("http://localhost:3004/books")
        // .then(resBook=>{
        //     console.log(resBook);
        //     setBooks(resBook.data)
        //     // axios.get("http://localhost:3004/category")
        //     // .then(resCat=>{
        //     //     console.log(resCat);
        //     //     setCat(resCat.data)
        //     // }).catch(errCat=>{console.log(errCat);})
        // }).catch(errBook=>{console.log(errBook);})
    },[didUpdate]);

const deleteBook =(id)=>{
    axios.delete(`http://localhost:3004/books/${id}`)
    .then(res=>{
        dispatch({type: "DELETE_BOOK",payload: id})
        console.log("delete res",res);
        setDidUpdate(!didUpdate);
        setShowModal(false); 
    }

    ).catch(err=>{console.log(err);}
    )
}

if (booksState.success !== true || categoriesState.success !== true){
    return(
        <Loading/>
    )
}

    return(
        <div className=" container my-5">
            <div className="d-flex justify-content-end my-2">
                <Link to="/add-book" className="btn btn-primary" >Add Book</Link>
            </div>   
            <table className="table table-striped shadow-lg">
                <thead>
                    <tr>
                    <th scope="col">Book</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th className="text-center" scope="col">ISBN</th>
                    <th className="text-center" scope="col">Process</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        booksState.books.map((book)=>{
                            const category= categoriesState.categories.find((cat) => cat.id == book.categoryId);
                            return(
                                <tr key={book.id}>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{category.name}</td>
                                    <td className="text-center">{book.isbn==="" ? "-" : book.isbn}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button 
                                            type="button" 
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={()=>{
                                                //deleteBook(book.id)
                                                setShowModal(true)
                                                setToDeleteBook(book.id)
                                                setToDeleteBookname(book.name)
                                            }}
                                            >Delete</button>
                                            <Link
                                            to={`edit-book/${book.id}`}
                                            className="btn btn-sm btn-outline-secondary">Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                
                </tbody>
            </table>
            {
                showModal === true &&(
                    <Modal 
                    comment={"Are you sure want to delete ?"} 
                    title={toDeleteBookname} 
                    onConfirm={()=>deleteBook(toDeleteBook)} 
                    onCancel={()=> setShowModal(false)} />
                )
            }
            
        </div>
    )
}

export default ListBook