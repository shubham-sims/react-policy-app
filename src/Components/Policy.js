import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Policy({isFetched, setIsFetched, policyData, setPolicyData, editedData, setEditedData}) {
  //State Variables
  const [isEditable, setIsEditable] = useState(false);
  const [flag, setFlag] = useState(true);

  //Method to handle Update Button Click
  const handlePolicyUpdate = () => {
    setIsEditable(!isEditable);
    setFlag(!flag);
  };

  //Method to handle Close Button Click
  const handlePolicyClose= () =>{
    setIsFetched(!isFetched);
  }

  //Method to handle changes is input fields while in edit mode
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Method to handle Save CHanges button click
  const handleSaveChanges = async () => {
    const url = `http://localhost:8080/policy/update`;

    try {
      const result = await axios.put(url, editedData); //Sending data update request with the new data
      console.log("Policy details updated successfully:", result.data);
      setIsEditable(false); // Exiting edit mode after successfully saving changes
      setPolicyData(result.data); // Updating policyData with newly updated data
      toast.success("Policy Details Updated", { autoClose: 2000 });
    } catch (error) {
        const errorInfo = error.response.data;
        const errorMessage = errorInfo.errorMessage;
        const errorCode = errorInfo.errorCode;
        //newError = errorMessage;
        console.error(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
    }
  };
  //Conditionally rendering the whole Policy Component based on isFetched flag
  //This component will return jsx only if the data is fetched otherwise it'll return null
  if (isFetched) {
    return (
      <div className="policy-box">
        <div className="button-group">{/* Conditionally rendering the buttons */}
          {isEditable && (
            <div>
              <button
                onClick={handleSaveChanges}
                className="button update-button"
              >
                Save Changes
              </button>
              <button
                onClick={handlePolicyUpdate}
                className="button update-button"
              >
                Cancel Edit
              </button>
            </div>
          )}
          {!isEditable && (
            <div>
              <button
                onClick={handlePolicyUpdate}
                className="button update-button"
              >
                Update Policy
              </button>
              <button
                onClick={handlePolicyClose}
                className="button update-button"
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="policy-details">
        <div className="policy-sub">{/* Conditionally rendering the data as read-only or input fields based on isEditable flag value */}
          <div>   
            <p>
              <u>Policy Number</u>:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="policyNumber"
                  value={editedData.policyNumber || ""}
                  onChange={handleFieldChange}
                  readOnly={!flag}
                />
              ) : (
                policyData.policyNumber
              )}
            </p>
            <p>
              <u>Policy Person</u>:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="policyPerson"
                  value={editedData.policyPerson || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                policyData.policyPerson
              )}
            </p>
            <p>
              <u>Phone Number</u>:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedData.phoneNumber || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                policyData.phoneNumber
              )}
            </p>
            <p>
              <u>Address</u>:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="address"
                  value={editedData.address || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                policyData.address
              )}
            </p>
          </div>
          <div>
            <p>
              <u>Term Duration</u>:{" "}
              {isEditable ? (
                <input
                  type="number"
                  name="termDuration"
                  value={editedData.termDuration || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                `${policyData.termDuration} Months`
              )}
            </p>
            <p>
              <u>Effective Date</u>:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="effectiveDate"
                  value={editedData.effectiveDate || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                policyData.effectiveDate
              )}
            </p>
            <p>
              <u>Expiration Date</u>:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="expirationDate"
                  value={editedData.expirationDate || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                policyData.expirationDate
              )}
            </p>
            <p>
              <u>Total Premium</u>:{" "}
              {isEditable ? (
                <input
                  type="number"
                  name="premium"
                  value={editedData.premium || ""}
                  onChange={handleFieldChange}
                />
              ) : (
                `$${policyData.premium}`
              )}
            </p>
          </div>
        </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Policy;
