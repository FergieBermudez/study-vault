import { useState } from 'react'
import './App.css'

function App() {
  const [sessions] = useState([
    {
      id: 1,
      course: 'Computer Networks',
      topic: 'Routing and Switching',
      date: '2026-09-28',
      duration: 60,
      status: 'Planned',
    },
    {
      id: 2,
      course: 'Engineering Design',
      topic: 'Project Documentation',
      date: '2026-09-29',
      duration: 45,
      status: 'In Progress',
    },
  ])

  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h1>StudyVault</h1>
          <p>Personal Study Session Tracker</p>
        </div>

        <button className="logout-button">Logout</button>
      </header>

      <main className="container">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">MY STUDY DASHBOARD</p>
            <h2>Stay organized. Study smarter.</h2>
            <p>
              Keep track of your courses, study topics, and progress in one
              place.
            </p>
          </div>

          <button className="primary-button">+ Add Study Session</button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Sessions</span>
            <strong>{sessions.length}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>
              {sessions.filter((session) => session.status === 'Completed').length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Planned</span>
            <strong>
              {sessions.filter((session) => session.status === 'Planned').length}
            </strong>
          </div>
        </section>

        <section className="sessions-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">STUDY SESSIONS</p>
              <h3>Your Sessions</h3>
            </div>
          </div>

          <div className="session-list">
            {sessions.map((session) => (
              <article className="session-card" key={session.id}>
                <div className="session-main">
                  <div className="course-icon">
                    {session.course.charAt(0)}
                  </div>

                  <div>
                    <h4>{session.course}</h4>
                    <p>{session.topic}</p>

                    <div className="session-details">
                      <span>📅 {session.date}</span>
                      <span>⏱ {session.duration} min</span>
                    </div>
                  </div>
                </div>

                <div className="session-actions">
                  <span
                    className={`status ${session.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {session.status}
                  </span>

                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
