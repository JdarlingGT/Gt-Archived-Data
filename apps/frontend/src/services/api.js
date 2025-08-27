const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Users
  async getUsers() {
    return this.request('/users');
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Events
  async getEvents() {
    return this.request('/events');
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async getOrders() {
    return this.request('/orders');
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(id, orderData) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id) {
    return this.request(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Licenses
  async getLicenses() {
    return this.request('/licenses');
  }

  async getLicense(id) {
    return this.request(`/licenses/${id}`);
  }

  async createLicense(licenseData) {
    return this.request('/licenses', {
      method: 'POST',
      body: JSON.stringify(licenseData),
    });
  }

  async updateLicense(id, licenseData) {
    return this.request(`/licenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(licenseData),
    });
  }

  async deleteLicense(id) {
    return this.request(`/licenses/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  // Audit Logs
  async getAuditLogs() {
    return this.request('/audit-logs');
  }

  async createAuditLog(logData) {
    return this.request('/audit-logs', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  }
}

export default new ApiService();