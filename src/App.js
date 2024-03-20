import React from "react";
import Navbar from  "./components/Navbar";
import Cards from "./components/Cards"
import Filter from "./components/Filter"
import { apiUrl, filterData  } from "./data";

// usestate or sue effect hooks ka use krne ke liye use krte hai
import { useState,useEffect } from "react";


// for spiner we use this
import Spinner from "./components/Spinner";

// heart waala toster use krne ke liye use krte hai
import {toast} from "react-toastify";


const App = () => { 
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);// initaial we put ALL wala data

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();// api se jo data aaya hai usko convert kia jason file fromate me


      ///output -> 
      setCourses(output.data);
    }
    catch(error) {
        toast.error("Unable to fetch data form API");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter 
          filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">

        {
        (courses.length === 0 || Object.keys(courses).length === 0) ? 
        (<div>No Courses Found</div>) : 
        (loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>))
        }

          {/* {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          } */}
        </div>
      </div>


    </div>
  );
};

export default App;
