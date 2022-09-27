import { React, useEffect } from "react";
import Home from "./pages/Home";
import AddBook from "./pages/addBook";
import EditBook from "./pages/EditBook";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios"



function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    //categories
    dispatch({type:"FETCH_CATEGORİES_START"});
    axios
      .get("http://localhost:3004/category")
      .then(res=>{
        dispatch({type:"FETCH_CATEGORİES_SUCCESS",payload:res.data})
      }).catch(err=>{
        dispatch({type: "FETCH_CATEGORİES_FAIL",payload:"Error occurred while extracting categories"})
      })
    //books
    dispatch({type:"FETCH_BOOKS_START"});
    axios
      .get("http://localhost:3004/books")
      .then(res=>{
        dispatch({type: "FETCH_BOOKS_SUCCESS",payload: res.data })
      }).catch(err=>{
        dispatch({type: "FETCH_BOOKS_FAIL",payload:"Error occurred while extracting books"})
      })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
