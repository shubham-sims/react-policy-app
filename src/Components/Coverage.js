import React from 'react'

function Coverage( { coverages }) {
  return (
    <div>
        <table>
        <thead>
          <tr>
            <th>Coverage Id</th>
            <th>Coverage Name</th>
            <th>Coverage Limit</th>
          </tr>
        </thead>

        <tbody>
        {coverages.map((coverage) => (
              <tr key={coverage.coverageId}>
                <td>{coverage.coverageId}</td>
                <td>{coverage.coverageName}</td>
                <td>{coverage.coverageLimit}</td>
              </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
}

export default Coverage