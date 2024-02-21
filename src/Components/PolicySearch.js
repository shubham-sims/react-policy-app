import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Stylesheet.css";
import Policy from "./Policy";

function PolicySearch() {
  //State Variables
  const [searchData, setSearchData] = useState({ policyNumber: "" });
  const [policyData, setPolicyData] = useState({
    policyNumber: "",
    policyPerson: "",
    phoneNumber: "",
    address: "",
    termDuration: null,
    effectiveDate: "",
    expirationDate: "",
    premium: null,
    vehicles: [
      {
        vin: "",
        make: "",
        model: "",
        year: null,
        driver: {
          driverId:"",
          driverName: "",
          licenseNumber: "",
        }
      },],
    coverages:[
      {
        coverageId: "",
        coverageName:"",
        coverageLimit: null
      },
    ]
  });
  const [isFetched, setIsFetched] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [errors, setErrors] = useState("");
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();


  //Regex for validating Policy Number
  const policyNumberRegex = /^POL[0-9]{3}$/;

  //Method to handle change in search box
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
    setIsFetched(false);
    setErrors('');
  };

  //Method to handle Search button click
  const handleSearch = async (e) => {
    e.preventDefault();
    let newError = "";
    setErrors("");

    //validating Policy Number
    if (policyNumberRegex.test(searchData.policyNumber)) {
      
      const url = `http://localhost:8080/policy/get/${searchData.policyNumber}`;

      try {
        const result = await axios.get(url); //Fetching Data from DB through Backend
        setPolicyData(result.data); //Setting the received data in PolicyData to display
        setEditedData(result.data); //Initiating the EditedData to show in edit mode inputs
        setIsFetched(true); //Setting flag for showing the policy data
        console.log(result.data);
      } catch (error) {
        const errorInfo = error.response.data;
        const errorMessage = errorInfo.errorMessage;
        const errorCode = errorInfo.errorCode;
        newError = errorMessage;
        console.error(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
      }
    } else {
      newError = "Enter Valid Policy Number";
    }
    setErrors(newError);
  };

  //Method to handle New Policy button click
  const handleNewPolicy = (e) =>{
    navigate('/create-policy');
  }

  return (
    <>
      {!showMore &&
        <div className="content-box">
        <h2 className="heading">Search Policy</h2>
        <form onSubmit={handleSearch} className="login-form">
          <label htmlFor="policyNumber" className="input-label"></label>
          <input
            type="text"
            name="policyNumber"
            value={searchData.policyNumber}
            placeholder="Policy Number"
            onChange={handleInputChange}
          />
          {errors && <span className="error-message">{errors}</span>}

          <button type="submit" className="button" >
            Search
          </button>
          
        </form>
        {!isFetched ?<> <span><hr/></span>
          <button className="button" onClick={handleNewPolicy}>Create New Policy</button> </>: null}
      </div>
      }
      <div>
        {/* Calling Policy Component and passing props to it */}
        <Policy
          isFetched={isFetched}
          setIsFetched={setIsFetched}
          policyData={policyData}
          setPolicyData={setPolicyData}
          editedData={editedData}
          setEditedData={setEditedData}
          showMore={showMore}
          setShowMore={setShowMore}
        />
      </div>
    </>
  );
}

export default PolicySearch;
//-------------------------OR--------------------------
