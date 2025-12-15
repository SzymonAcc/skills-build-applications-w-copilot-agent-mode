import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : `${window.location.protocol}//${window.location.hostname}:8000/api/teams/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-5">Teams</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeamModal">Add Team</button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="4" className="text-center">No teams found.</td></tr>
                ) : (
                  teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{team.name || '-'}</td>
                      <td>{team.members ? team.members.length : '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-secondary me-2">Edit</button>
                        <button className="btn btn-sm btn-outline-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Team Modal */}
      <div className="modal fade" id="addTeamModal" tabIndex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTeamModalLabel">Add Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Team Name</label>
                  <input type="text" className="form-control" id="teamName" placeholder="Enter team name" />
                </div>
                <button type="submit" className="btn btn-primary">Add Team</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
