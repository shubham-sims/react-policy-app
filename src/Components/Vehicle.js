import React from "react";
import Driver from "./Driver";

function Vehicle({ vehicles }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>VIN</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th colSpan={3} className="sub-column">Assigned Driver</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Name</th>
            <th>License Number</th>
            <th>DriverId</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
              <tr key={vehicle.vin}>
                <td>{vehicle.vin}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.driver.driverName}</td>
                <td>{vehicle.driver.licenseNumber}</td>
                <td>{vehicle.driver.driverId}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicle;
