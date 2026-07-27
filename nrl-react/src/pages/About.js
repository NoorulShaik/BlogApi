import React from 'react'
import Base from '../components/Base'

function About() {
  return (
    <Base>
        <section class="about-hero">
    <h3>Welcome to Blog Sphere</h3>
    <p class="lead-text">
      <strong>Blog Sphere</strong> is a modern, high-performance blogging platform designed to make sharing ideas, stories, and insights seamless and engaging. Built with a robust Spring Boot RESTful API backend and a responsive user interface, Blog Sphere provides a secure, reliable space for writers and readers to connect.
    </p>
  </section>

  <section class="features-section">
    <h4>What We Offer</h4>
    <div class="features-grid">
      <div class="feature-card">
        <h4>Content Management</h4>
        <p>Effortlessly create, edit, and manage articles across diverse categories with full rich-text control.</p>
      </div>
      <div class="feature-card">
        <h4>Interactive Community</h4>
        <p>Engage with authors and readers through dynamic, real-time comments and community discussions.</p>
      </div>
      <div class="feature-card">
        <h4>Secure Access</h4>
        <p>Built with modern user authentication and authorization standards to ensure a safe, privacy-focused environment.</p>
      </div>
    </div>
  </section>

  <section class="team-section">
    <h4>Meet Our Team</h4>
    <p>Developed with passion by <strong>Noorul</strong>, <strong>Dhana</strong>, and <strong>Guru</strong> at <strong>MITS, Angallu</strong>.</p>
  </section>
    </Base>
  )
}

export default About