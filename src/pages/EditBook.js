import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const EditBook=(props)=>{

    const dispatch = useDispatch();
    const {categoriesState, booksState}=useSelector((state)=>state);
    console.log(categoriesState);
    const navigate = useNavigate();
    const params = useParams();
    console.log("params",params);

    const [bookname,setBookname]=useState("");
    const [author,setAuthor]=useState("");
    const [isbn,setIsbn]=useState("");
    const [category,setCategory]=useState("");
    //const [categories,setCategories]=useState(null);
    const [showModal,setShowModal]=useState(false);

    useEffect(()=>{
        const searchBook = booksState.books.find((item)=> item.id == params.bookId);

        if(searchBook === undefined){
            navigate("/");
            return;
        };

        setBookname(searchBook.name);
        setAuthor(searchBook.author);
        setIsbn(searchBook.isbn);
        setCategory(searchBook.categoryId);
        // axios.get(`http://localhost:3004/books/${params.bookId}`)
        // .then(res=>{
        //     console.log(res);
        //     setBookname(res.data.name);
        //     setAuthor(res.data.author);
        //     setIsbn(res.data.isbn);
        //     setCategory(res.data.categoryId);
            // axios.get("http://localhost:3004/category")
            // .then(res=>{
            //     setCategories(res.data)
            // }).catch(err=>console.log(err))
        // }).catch(err=> console.log(err));
    },[])

    if(categoriesState.success !== true || booksState.success !==true){
        return <Loading />
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        setShowModal(true)

    }
    const editBook=()=>{
        if(bookname==="" || category==="" || author===""){
            alert("Book name , Author and Category can't be empty !")
            return
        };
        const updatedBook={
            id: params.bookId,
            name:bookname,
            author:author,
            isbn:isbn,
            categoryId:category,
        };

        axios.put(`http://localhost:3004/books/${params.bookId}`,updatedBook)
        .then(res=>{
            console.log("put",res);
            dispatch({type: "EDİT_BOOK",payload: updatedBook});
            setShowModal(false);
            navigate("/")
        }).catch(err=>console.log(err))
    }

    return(
        <div>
            <Header />
            <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Book Name"
                        value={bookname}
                        onChange={(event=>setBookname(event.target.value))}
                        />
                    </div>
                    <div className="col">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Author"
                        value={author}
                        onChange={(event=>setAuthor(event.target.value))}
                        />
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(event=>setIsbn(event.target.value))} 
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" 
                        onChange={(event)=> setCategory(event.target.value)} 
                        value={category}>
                            <option value={""} selected>Choose a category</option>
                                {categoriesState.categories.map((cat)=>{
                                    return(
                                        <option key={cat.id} value={cat.id} >{cat.name}</option>
                                    )
                                })}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50">Submit</button>
                </div>
            </form>
        </div>
        {
            showModal === true && (
                <Modal 
                title="Update Book"
                comment="Confirm for Submit"
                onCancel={()=>setShowModal(false)}
                onConfirm={()=>editBook()} />
            )
        }
        </div>
    )
}

export default EditBook