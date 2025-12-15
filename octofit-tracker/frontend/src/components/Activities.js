import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : `${window.location.protocol}//${window.location.hostname}:8000/api/activities/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-5">Activities</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addActivityModal">Add Activity</button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="6" className="text-center">No activities found.</td></tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{activity.name || '-'}</td>
                      <td>{activity.type || '-'}</td>
                      <td>{activity.date || '-'}</td>
                      <td>{activity.duration || '-'}</td>
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

      {/* Add Activity Modal */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="activityName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="activityName" placeholder="Enter activity name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="activityType" placeholder="Enter activity type" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDate" className="form-label">Date</label>
                  <input type="date" className="form-control" id="activityDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDuration" className="form-label">Duration (minutes)</label>
                  <input type="number" className="form-control" id="activityDuration" placeholder="Enter duration" />
                </div>
                <button type="submit" className="btn btn-primary">Add Activity</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
