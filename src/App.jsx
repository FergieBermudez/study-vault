import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const [message, setMessage] = useState('')

const [sessions, setSessions] = useState([])
const [showForm, setShowForm] = useState(false)

const [newSession, setNewSession] = useState({
  course: '',
  topic: '',
  study_date: '',
  duration: '',
  status: 'Planned',
  notes: '',
})
const fetchSessions = async (userId) => {
  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('study_date', { ascending: true })

  if (error) {
    console.error('Error loading study sessions:', error)
    return
  }

  setSessions(data || [])
}
const handleAddSession = async (e) => {
  e.preventDefault()

  if (
    !newSession.course ||
    !newSession.topic ||
    !newSession.study_date ||
    !newSession.duration
  ) {
    alert('Please fill in all required fields.')
    return
  }

  const { error } = await supabase
    .from('study_sessions')
    .insert([
      {
        user_id: user.id,
        course: newSession.course,
        topic: newSession.topic,
        study_date: newSession.study_date,
        duration: Number(newSession.duration),
        status: newSession.status,
        notes: newSession.notes,
      },
    ])

  if (error) {
    console.error('Error adding study session:', error)
    alert('Could not add study session.')
    return
  }

  setNewSession({
    course: '',
    topic: '',
    study_date: '',
    duration: '',
    status: 'Planned',
    notes: '',
  })

  setShowForm(false)
  fetchSessions(user.id)
}
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUser(session?.user ?? null)
      if (session?.user) {
  fetchSessions(session.user.id)
}
      setLoading(false)
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuth = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!email || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    if (authMode === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      if (data.session) {
        setMessage('Account created successfully!')
      } else {
        setMessage('Account created! Check your email to confirm your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage('')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setEmail('')
    setPassword('')
    setMessage('')
  }

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>StudyVault</h1>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <p className="eyebrow">WELCOME TO</p>
            <h1>StudyVault</h1>
            <p>Organize your study sessions and keep your progress in one place.</p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className={authMode === 'login' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => {
                setAuthMode('login')
                setMessage('')
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={authMode === 'signup' ? 'auth-tab active' : 'auth-tab'}
              onClick={() => {
                setAuthMode('signup')
                setMessage('')
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                minLength="6"
                required
              />
            </label>

            {message && <p className="auth-message">{message}</p>}

            <button type="submit" className="auth-submit">
              {authMode === 'login' ? 'Login to StudyVault' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            {authMode === 'login'
              ? "Don't have an account yet?"
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'signup' : 'login')
                setMessage('')
              }}
            >
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h1>StudyVault</h1>
          <p>Personal Study Session Tracker</p>
        </div>

        <div className="nav-user">
          <span>{user.email}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
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

        <button
  className="primary-button"
  onClick={() => setShowForm(true)}
>
  + Add Study Session
</button>
        </section>
{showForm && (
  <section className="session-form">
    <h3>Add Study Session</h3>

    <input
      type="text"
      placeholder="Course"
      value={newSession.course}
      onChange={(e) =>
        setNewSession({ ...newSession, course: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Topic"
      value={newSession.topic}
      onChange={(e) =>
        setNewSession({ ...newSession, topic: e.target.value })
      }
    />

    <input
      type="date"
      value={newSession.study_date}
      onChange={(e) =>
        setNewSession({ ...newSession, study_date: e.target.value })
      }
    />

    <input
      type="number"
      placeholder="Duration in minutes"
      value={newSession.duration}
      onChange={(e) =>
        setNewSession({ ...newSession, duration: e.target.value })
      }
    />

    <select
      value={newSession.status}
      onChange={(e) =>
        setNewSession({ ...newSession, status: e.target.value })
      }
    >
      <option value="Planned">Planned</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>

    <textarea
      placeholder="Notes (optional)"
      value={newSession.notes}
      onChange={(e) =>
        setNewSession({ ...newSession, notes: e.target.value })
      }
    />
<button
  type="button"
  className="primary-button"
  onClick={handleAddSession}
>
  Save Study Session
</button>
    <button type="button" onClick={() => setShowForm(false)}>
      Cancel
    </button>
  </section>
)}
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