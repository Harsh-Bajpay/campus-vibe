// API Configuration
const API_URL = window.location.origin;
let authToken = localStorage.getItem('authToken');
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  setupAuthTabs();
  if (authToken) {
    showApp();
    loadUserProfile();
    loadFeed();
  }
});

// Auth Tab Switching
function setupAuthTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const targetTab = tab.dataset.tab;
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
      document.getElementById(`${targetTab}-form`).classList.add('active');
    });
  });
}

// Authentication Functions
async function register() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const major = document.getElementById('reg-major').value;
  const year = parseInt(document.getElementById('reg-year').value) || null;
  const interestsStr = document.getElementById('reg-interests').value;
  const coursesStr = document.getElementById('reg-courses').value;

  const interests = interestsStr ? interestsStr.split(',').map(i => i.trim()).filter(i => i) : [];
  const courses = coursesStr ? coursesStr.split('\n').map(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      return {
        code: parts[0],
        name: parts.slice(1).join(' ')
      };
    }
    return null;
  }).filter(c => c) : [];

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, major, year, interests, courses })
    });

    const data = await response.json();
    
    if (response.ok) {
      authToken = data.token;
      localStorage.setItem('authToken', authToken);
      showMessage('Account created successfully!');
      showApp();
      loadUserProfile();
      loadFeed();
    } else {
      showMessage(data.error || 'Registration failed', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  }
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      authToken = data.token;
      localStorage.setItem('authToken', authToken);
      showMessage('Login successful!');
      showApp();
      loadUserProfile();
      loadFeed();
    } else {
      showMessage(data.error || 'Login failed', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  }
}

function logout() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('authToken');
  document.getElementById('auth-section').classList.remove('hidden');
  document.getElementById('app-section').classList.add('hidden');
  showMessage('Logged out successfully');
}

function showApp() {
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('app-section').classList.remove('hidden');
}

// View Navigation
function showView(viewName) {
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  document.getElementById(`${viewName}-view`).classList.add('active');
  
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');

  // Load content for the view
  switch(viewName) {
    case 'feed':
      loadFeed();
      break;
    case 'events':
      loadEvents();
      break;
    case 'groups':
      loadGroups();
      break;
    case 'matches':
      loadMatches();
      loadSuggestions();
      break;
    case 'profile':
      loadProfile();
      break;
  }
}

// API Helper
async function apiCall(endpoint, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers }
  });

  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  return response;
}

// Feed Functions
async function loadFeed() {
  const feedContent = document.getElementById('feed-content');
  feedContent.innerHTML = '<div class="loading">Loading your personalized feed...</div>';

  try {
    const response = await apiCall('/api/feed/');
    const data = await response.json();

    if (data.feed && data.feed.length > 0) {
      feedContent.innerHTML = data.feed.map(item => renderFeedItem(item)).join('');
    } else {
      feedContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <p>Your feed is empty. Join some groups or events to see personalized content!</p>
        </div>
      `;
    }
  } catch (error) {
    feedContent.innerHTML = '<div class="empty-state">Error loading feed</div>';
  }
}

function renderFeedItem(item) {
  if (item.feed_type === 'event') {
    return `
      <div class="card">
        <div class="card-title">📅 ${item.title}</div>
        <div class="card-meta">
          <span>👤 ${item.creator_name}</span>
          <span>📍 ${item.location || 'TBA'}</span>
          <span>👥 ${item.participant_count} interested</span>
          ${item.category ? `<span class="badge badge-primary">${item.category}</span>` : ''}
        </div>
        <div class="card-description">${item.description || ''}</div>
        <div class="card-meta">
          <span>📆 ${new Date(item.event_date).toLocaleString()}</span>
        </div>
        <div class="card-actions">
          ${!item.user_status ? 
            `<button class="btn btn-primary" onclick="joinEvent('${item.id}')">Mark Interest</button>` :
            `<span class="badge badge-success">✓ ${item.user_status}</span>`
          }
        </div>
      </div>
    `;
  } else if (item.feed_type === 'group') {
    return `
      <div class="card">
        <div class="card-title">👥 ${item.name}</div>
        <div class="card-meta">
          <span>👤 ${item.creator_name}</span>
          <span>👥 ${item.member_count} members</span>
          ${item.course_code ? `<span class="badge badge-info">${item.course_code}</span>` : ''}
        </div>
        <div class="card-description">${item.description || ''}</div>
        <div class="card-actions">
          ${!item.user_role ? 
            `<button class="btn btn-primary" onclick="joinGroup('${item.id}')">Join Group</button>` :
            `<span class="badge badge-success">✓ ${item.user_role}</span>`
          }
        </div>
      </div>
    `;
  } else if (item.feed_type === 'resource') {
    return `
      <div class="card">
        <div class="card-title">📚 ${item.title}</div>
        <div class="card-meta">
          <span>👤 ${item.uploader_name}</span>
          ${item.course_code ? `<span class="badge badge-info">${item.course_code}</span>` : ''}
          ${item.type ? `<span class="badge badge-primary">${item.type}</span>` : ''}
        </div>
        <div class="card-description">${item.description || ''}</div>
        ${item.url ? `<div class="card-actions"><a href="${item.url}" target="_blank" class="btn btn-outline">View Resource</a></div>` : ''}
      </div>
    `;
  }
}

// Events Functions
async function loadEvents() {
  const eventsContent = document.getElementById('events-content');
  eventsContent.innerHTML = '<div class="loading">Loading events...</div>';

  try {
    const response = await apiCall('/api/events?upcoming=true');
    const data = await response.json();

    if (data.events && data.events.length > 0) {
      eventsContent.innerHTML = data.events.map(event => `
        <div class="card">
          <div class="card-title">${event.title}</div>
          <div class="card-meta">
            <span>👤 ${event.creator_name}</span>
            <span>📍 ${event.location || 'TBA'}</span>
            <span>👥 ${event.participant_count} interested</span>
            ${event.category ? `<span class="badge badge-primary">${event.category}</span>` : ''}
          </div>
          <div class="card-description">${event.description || ''}</div>
          <div class="card-meta">
            <span>📆 ${new Date(event.event_date).toLocaleString()}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary" onclick="joinEvent('${event.id}')">Mark Interest</button>
          </div>
        </div>
      `).join('');
    } else {
      eventsContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📅</div>
          <p>No upcoming events. Be the first to create one!</p>
        </div>
      `;
    }
  } catch (error) {
    eventsContent.innerHTML = '<div class="empty-state">Error loading events</div>';
  }
}

async function joinEvent(eventId) {
  try {
    const response = await apiCall(`/api/events/${eventId}/join`, {
      method: 'POST',
      body: JSON.stringify({ status: 'interested' })
    });

    if (response.ok) {
      showMessage('Successfully marked interest in event!');
      loadEvents();
      loadFeed();
    }
  } catch (error) {
    showMessage('Error joining event', 'error');
  }
}

function showCreateEvent() {
  document.getElementById('create-event-modal').classList.add('show');
}

async function createEvent() {
  const title = document.getElementById('event-title').value;
  const description = document.getElementById('event-description').value;
  const event_date = document.getElementById('event-date').value;
  const location = document.getElementById('event-location').value;
  const category = document.getElementById('event-category').value;
  const max_participants = parseInt(document.getElementById('event-max').value) || null;

  try {
    const response = await apiCall('/api/events/', {
      method: 'POST',
      body: JSON.stringify({ title, description, event_date, location, category, max_participants })
    });

    if (response.ok) {
      closeModal('create-event-modal');
      showMessage('Event created successfully!');
      loadEvents();
      loadFeed();
      
      // Clear form
      document.getElementById('event-title').value = '';
      document.getElementById('event-description').value = '';
      document.getElementById('event-date').value = '';
      document.getElementById('event-location').value = '';
      document.getElementById('event-category').value = '';
      document.getElementById('event-max').value = '';
    }
  } catch (error) {
    showMessage('Error creating event', 'error');
  }
}

// Groups Functions
async function loadGroups() {
  const groupsContent = document.getElementById('groups-content');
  groupsContent.innerHTML = '<div class="loading">Loading study groups...</div>';

  try {
    const response = await apiCall('/api/groups/');
    const data = await response.json();

    if (data.groups && data.groups.length > 0) {
      groupsContent.innerHTML = data.groups.map(group => `
        <div class="card">
          <div class="card-title">${group.name}</div>
          <div class="card-meta">
            <span>👤 ${group.creator_name}</span>
            <span>👥 ${group.member_count} members</span>
            ${group.course_code ? `<span class="badge badge-info">${group.course_code}</span>` : ''}
          </div>
          <div class="card-description">${group.description || ''}</div>
          <div class="card-actions">
            <button class="btn btn-primary" onclick="joinGroup('${group.id}')">Join Group</button>
          </div>
        </div>
      `).join('');
    } else {
      groupsContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">👥</div>
          <p>No study groups yet. Create one to start collaborating!</p>
        </div>
      `;
    }
  } catch (error) {
    groupsContent.innerHTML = '<div class="empty-state">Error loading groups</div>';
  }
}

async function joinGroup(groupId) {
  try {
    const response = await apiCall(`/api/groups/${groupId}/join`, {
      method: 'POST'
    });

    if (response.ok) {
      showMessage('Successfully joined group!');
      loadGroups();
      loadFeed();
    } else {
      const data = await response.json();
      showMessage(data.error || 'Error joining group', 'error');
    }
  } catch (error) {
    showMessage('Error joining group', 'error');
  }
}

function showCreateGroup() {
  document.getElementById('create-group-modal').classList.add('show');
}

async function createGroup() {
  const name = document.getElementById('group-name').value;
  const description = document.getElementById('group-description').value;
  const course_code = document.getElementById('group-course').value;
  const max_members = parseInt(document.getElementById('group-max').value) || null;

  try {
    const response = await apiCall('/api/groups/', {
      method: 'POST',
      body: JSON.stringify({ name, description, course_code, max_members })
    });

    if (response.ok) {
      closeModal('create-group-modal');
      showMessage('Group created successfully!');
      loadGroups();
      loadFeed();
      
      // Clear form
      document.getElementById('group-name').value = '';
      document.getElementById('group-description').value = '';
      document.getElementById('group-course').value = '';
      document.getElementById('group-max').value = '';
    }
  } catch (error) {
    showMessage('Error creating group', 'error');
  }
}

// Matching Functions
async function loadMatches() {
  const matchesContent = document.getElementById('matches-content');
  matchesContent.innerHTML = '<div class="loading">Finding matching peers...</div>';

  try {
    const response = await apiCall('/api/matching/peers');
    const data = await response.json();

    if (data.matches && data.matches.length > 0) {
      matchesContent.innerHTML = data.matches.map(match => `
        <div class="match-card">
          <div class="match-info">
            <h3>${match.name}</h3>
            <div class="card-meta">
              ${match.major ? `<span>🎓 ${match.major}</span>` : ''}
              ${match.year ? `<span>📅 Year ${match.year}</span>` : ''}
            </div>
            <p style="margin-top: 0.5rem; color: var(--text-light);">${match.match_reason}</p>
            ${match.matched_courses.length > 0 ? `
              <div class="tags" style="margin-top: 0.5rem;">
                ${match.matched_courses.map(c => `<span class="tag">${c}</span>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="match-score">${Math.round(match.match_score * 100)}%</div>
        </div>
      `).join('');
    } else {
      matchesContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <p>No matches found. Add more courses and interests to your profile to find study partners!</p>
        </div>
      `;
    }
  } catch (error) {
    matchesContent.innerHTML = '<div class="empty-state">Error loading matches</div>';
  }
}

async function loadSuggestions() {
  const suggestionsContent = document.getElementById('suggestions-content');
  suggestionsContent.innerHTML = '<div class="loading">Loading suggestions...</div>';

  try {
    const response = await apiCall('/api/matching/suggestions');
    const data = await response.json();

    if (data.suggestions && data.suggestions.length > 0) {
      suggestionsContent.innerHTML = data.suggestions.map(suggestion => {
        if (suggestion.type === 'group') {
          return `
            <div class="card">
              <div class="card-title">👥 ${suggestion.target.name}</div>
              <div class="card-meta">
                <span>💡 ${suggestion.reason}</span>
                ${suggestion.target.course_code ? `<span class="badge badge-info">${suggestion.target.course_code}</span>` : ''}
              </div>
              <div class="card-description">${suggestion.target.description || ''}</div>
              <div class="card-actions">
                <button class="btn btn-primary" onclick="joinGroup('${suggestion.target.id}')">Join Group</button>
              </div>
            </div>
          `;
        } else if (suggestion.type === 'event') {
          return `
            <div class="card">
              <div class="card-title">📅 ${suggestion.target.title}</div>
              <div class="card-meta">
                <span>💡 ${suggestion.reason}</span>
                ${suggestion.target.category ? `<span class="badge badge-primary">${suggestion.target.category}</span>` : ''}
              </div>
              <div class="card-description">${suggestion.target.description || ''}</div>
              <div class="card-actions">
                <button class="btn btn-primary" onclick="joinEvent('${suggestion.target.id}')">Mark Interest</button>
              </div>
            </div>
          `;
        }
      }).join('');
    } else {
      suggestionsContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">💡</div>
          <p>No suggestions yet. We'll recommend groups and events based on your profile!</p>
        </div>
      `;
    }
  } catch (error) {
    suggestionsContent.innerHTML = '<div class="empty-state">Error loading suggestions</div>';
  }
}

// Profile Functions
async function loadUserProfile() {
  try {
    const response = await apiCall('/api/users/me');
    currentUser = await response.json();
  } catch (error) {
    console.error('Error loading user profile');
  }
}

async function loadProfile() {
  const profileContent = document.getElementById('profile-content');
  
  if (!currentUser) {
    await loadUserProfile();
  }

  if (currentUser) {
    profileContent.innerHTML = `
      <div class="profile-field">
        <label>Name</label>
        <div class="value">${currentUser.name}</div>
      </div>
      <div class="profile-field">
        <label>Email</label>
        <div class="value">${currentUser.email}</div>
      </div>
      ${currentUser.major ? `
        <div class="profile-field">
          <label>Major</label>
          <div class="value">${currentUser.major}</div>
        </div>
      ` : ''}
      ${currentUser.year ? `
        <div class="profile-field">
          <label>Year</label>
          <div class="value">Year ${currentUser.year}</div>
        </div>
      ` : ''}
      ${currentUser.bio ? `
        <div class="profile-field">
          <label>Bio</label>
          <div class="value">${currentUser.bio}</div>
        </div>
      ` : ''}
      ${currentUser.courses && currentUser.courses.length > 0 ? `
        <div class="profile-field">
          <label>Courses</label>
          <div class="tags">
            ${currentUser.courses.map(c => `<span class="tag">${c.course_code}: ${c.course_name}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${currentUser.interests && currentUser.interests.length > 0 ? `
        <div class="profile-field">
          <label>Interests</label>
          <div class="tags">
            ${currentUser.interests.map(i => `<span class="tag">${i}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }
}

// Modal Functions
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}

function showMessage(message, type = 'success') {
  const modal = document.getElementById('message-modal');
  const messageText = document.getElementById('message-text');
  messageText.textContent = message;
  modal.classList.add('show');
  
  setTimeout(() => {
    modal.classList.remove('show');
  }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
}
