import React, {useState, useEffect} from 'react';
import axios from 'axios'

// code for API 
function FetchData() {
    const [data, setData] =useState([])

    // useEffect to fetch from backend
    useEffect(() => {
        fetch("/data")  // api call
        .then(res => res.json())   // put response into json
        .then(data => setData(data))
        .catch(err => console.log(err)) // check if backend data fetched successfully
    }, [])

  return (
    // to display on webpage
    <div>
      {/* {data && <BarChart data={data} />} */}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default FetchData;
