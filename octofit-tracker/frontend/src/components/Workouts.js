import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : `${window.location.protocol}//${window.location.hostname}:8000/api/workouts/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [apiUrl]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-5">Workouts</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">Add Workout</button>
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
                {workouts.length === 0 ? (
                  <tr><td colSpan="6" className="text-center">No workouts found.</td></tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{workout.name || '-'}</td>
                      <td>{workout.type || '-'}</td>
                      <td>{workout.date || '-'}</td>
                      <td>{workout.duration || '-'}</td>
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

      {/* Add Workout Modal */}
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkoutModalLabel">Add Workout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="workoutName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="workoutName" placeholder="Enter workout name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="workoutType" placeholder="Enter workout type" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDate" className="form-label">Date</label>
                  <input type="date" className="form-control" id="workoutDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDuration" className="form-label">Duration (minutes)</label>
                  <input type="number" className="form-control" id="workoutDuration" placeholder="Enter duration" />
                </div>
                <button type="submit" className="btn btn-primary">Add Workout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
