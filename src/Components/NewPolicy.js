import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewPolicy() {
  //State Variables
  const [policyData, setPolicyData] = useState({
    policyNumber: "",
    policyPerson: "",
    phoneNumber: "",
    address: "",
    termDuration: null,
    effectiveDate: "",
    expirationDate: "",
    premium: null,
  });

  const navigate = useNavigate();

  //Method to handle CHange in the input fields
  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setPolicyData({
      ...policyData,
      [name]: value,
    });
  }

  //Method to handle Cancel Button click
  const handleCancelPolicy =(e) =>{
    navigate('/');
  }

  //Method to handle Create Policy button click
  const handleCreatePolicy = async (e) =>{
    e.preventDefault();

    const url = `http://localhost:8080/policy/create`;

    try {
        const result = await axios.post(url,policyData);
        console.log("Policy Created successfully:", result.data);
        setPolicyData(result.data);
        toast.success("Policy Created successfully", { autoClose: 2000 });
        navigate('/');
    } catch (error) {
        console.error(error);
    }
  }


  return (
    <div className="policy-box">
      <h2 className="heading">Policy Details</h2>

      <div className="policy-details">
        <div>
          <div className="input-element">
            <label htmlFor="policyNumber" className="input-label">
              Policy Number:
            </label>
            <input
              id="policyNumber"
              type="text"
              name="policyNumber"
              value={policyData.policyNumber || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-element">
            <label htmlFor="policyPerson" className="input-label">
              Policy Person:
            </label>
            <input
              id="policyPerson"
              type="text"
              name="policyPerson"
              value={policyData.policyPerson || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-element">
            <label htmlFor="phoneNumber" className="input-label">
              Phone Number:
            </label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={policyData.phoneNumber || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-element">
            <label htmlFor="address" className="input-label">
              Address:
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={policyData.address || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div className="input-element">
            <label htmlFor="termDuration" className="input-label">
              Term Duration:
            </label>
            <input
              id="termDuration"
              type="number"
              name="termDuration"
              value={policyData.termDuration || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-element">
            <label htmlFor="effectiveDate" className="input-label">
              Effective Date:
            </label>
            <input
              id="effectiveDate"
              type="text"
              name="effectiveDate"
              value={policyData.effectiveDate || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-element">
            <label htmlFor="expirationDate" className="input-label">
              Expiration Date:
            </label>
            <input
              id="expirationDate"
              type="text"
              name="expirationDate"
              value={policyData.expirationDate || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-element">
            <label htmlFor="premium" className="input-label">
              Premium:
            </label>
            <input
              id="premium"
              type="number"
              name="premium"
              value={policyData.premium || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="button-group2">  
      <button className="button"  onClick={handleCreatePolicy}>
        Create Policy
      </button>
      <button className="button"  onClick={handleCancelPolicy}>
        Cancel
      </button>
      </div>
    </div>
  );
}

export default NewPolicy;
