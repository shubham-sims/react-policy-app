import React from 'react'

function Driver({driver}) {
  return (
    <div>
        <table>
        <thead>
          <tr>
            <th>driverId</th>
            <th>driverName</th>
            <th>licenseNumber</th>
          </tr>
        </thead>

        <tbody>
          {
            <tr key={driver.driverId}>
              <td>{driver.driverId}</td>
              <td>{driver.driverName}</td>
              <td>{driver.licenseNumber}</td>
            </tr>
          }
        </tbody>
        </table>
    </div>
  )
}

export default Driver