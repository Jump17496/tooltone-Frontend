// import NavbarComponent from "./components/NavbarComponent";
// import AnnonceComponent from "./components/AnnonceComponent";
// import axios from "axios"
// import React, {useState , useEffect} from "react"
// import {Link} from "react-router-dom"
// import Swal from "sweetalert2"
// import { getUser } from "./services/authorize";
// // import Register from "./components/pages/auth/Register";


// function App() {
//   const [blogs,setBlogs] = useState([])

//   const fetchData=()=>{
//     axios
//     .get(`${process.env.REACT_APP_API}/blogs`)
//     .then(response=>{
//       setBlogs(response.data)
//     })
//     .catch(err=>alert(err));
//   }
//   useEffect(()=>{
//     fetchData()
//   },[])


//   const confirmDelete=(slug)=>{
//     Swal.fire({
//       title:"คุณต้องการลบบทความหรือไม่ ?",
//       icon:"warning",
//       showCancelButton:true
//     }).then((result)=>{
//       //กดปุ่มตกลง ok
//       if(result.isConfirmed){
//         deleteBlog(slug)
//       }
//     })
//   }

//   const deleteBlog=(slug)=>{
//     //ส่ง request ไปที่ api เพื่อลบข้อมูล
//     axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`)
//     .then(response=>{
//         Swal.fire("Deleted!",response.data.message,"success")
//         fetchData()
//     }).catch(err=>console.log(err))
//   }

//   return (
//     <div className="container p-5">
//       <NavbarComponent/>
//       <AnnonceComponent/>
//       {blogs.map((blog,index)=>(
//         <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
//             <div className="col pt-3 pb-2">
//               <Link to={`/blog/${blog.slug}`}>
//                 <h2>{blog.title}</h2>
//               </Link>
//               <p className="pt-3">{blog.content.substring(0,250)}</p>
//               <p className="text-muted">ผู้เขียน: {blog.author} , เผยแพร่ :{new Date(blog.createdAt).toLocaleString()}</p>    
//               {getUser() && (
//                 <div>
//                   <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
//                   <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
//                 </div>
//               )}
//             </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
