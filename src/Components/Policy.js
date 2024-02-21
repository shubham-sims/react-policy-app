import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Vehicle from "./Vehicle";
import Coverage from "./Coverage";

function Policy({
  isFetched,
  setIsFetched,
  policyData,
  setPolicyData,
  editedData,
  setEditedData,
  showMore,
  setShowMore,
}) {
  //State Variables
  const [isEditable, setIsEditable] = useState(false);
  
  //Method to handle Update Button Click
  const handlePolicyUpdate = () => {
    setIsEditable(!isEditable);
    setShowMore(true);
  };

  //Method to handle Close Button Click
  const handlePolicyClose = () => {
    setIsFetched(!isFetched);
    setShowMore(false);
  };

  //Method to handle changes is input fields while in edit mode
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Method to handle Show More Button Click
  const handleShowMore = () => {
    setShowMore(!showMore);
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
      toast.error(errorMessage, { autoClose: 2000 });
      console.error(`Error Code: ${errorCode}, Error Message: ${errorMessage}`);
    }
  };
  //Conditionally rendering the whole Policy Component based on isFetched flag
  //This component will return jsx only if the data is fetched otherwise it'll return null
  if (isFetched) {
    return (
      <div className="policy-box">
        <div className="button-group">
          {/* Conditionally rendering the buttons */}
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
          <div className="policy-sub">
            {/* Conditionally rendering the data as read-only or input fields based on isEditable flag value */}
            <div>
              <p>
                Policy Number:{" "}
                <input
                  type="text"
                  name="policyNumber"
                  value={editedData.policyNumber || ""}
                  onChange={handleFieldChange}
                  readOnly={true}
                  className={"non-editable"}
                />
              </p>
              <p>
                Policy Person:{" "}
                <input
                  type="text"
                  name="policyPerson"
                  value={editedData.policyPerson || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
              <p>
                Phone Number:{" "}
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedData.phoneNumber || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
              <p>
                Address:{" "}
                <input
                  type="text"
                  name="address"
                  value={editedData.address || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
            </div>
            <div>
              <p>
                Term Duration:{" "}
                <input
                  type="number"
                  name="termDuration"
                  value={editedData.termDuration || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
              <p>
                Effective Date:{" "}
                <input
                  type="text"
                  name="effectiveDate"
                  value={editedData.effectiveDate || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
              <p>
                Expiration Date:{" "}
                <input
                  type="text"
                  name="expirationDate"
                  value={editedData.expirationDate || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
              <p>
                Total Premium:{" "}
                <input
                  type="number"
                  name="premium"
                  value={editedData.premium || ""}
                  onChange={handleFieldChange}
                  readOnly={!isEditable}
                  className={isEditable ? "editable" : "non-editable"}
                />
              </p>
            </div>
          </div>
          {!isEditable && 
          <button className="button" id="show-more" onClick={handleShowMore}>
            Show {showMore? 'Less' : 'More'}
          </button>}

          {showMore && (
            <div>
              {policyData.vehicles.length > 0 && (
                <div className="vehicle-details">
                  <div className="tab">
                    <p>Insured Vehicles</p>
                  </div>
                  <Vehicle vehicles={policyData.vehicles} />
                </div>
              )}

              <div className="coverage-details">
                <div className="tab">
                  <p>Coverages</p>
                </div>
                <Coverage coverages={policyData.coverages} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Policy;
