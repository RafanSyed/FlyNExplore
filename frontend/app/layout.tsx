'use client';

import './globals.css';
import { ReactNode, useState } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body>
        <div className="layout">
          {/* Header */}
          <header className="header">
            <button className="menu-button" onClick={toggleSidebar}>
              ☰
            </button>
            <div>
              <h1 className="title">FlyNExplore</h1>
            </div>
          </header>

          {/* Sidebar */}
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={closeSidebar}>
              ×
            </button>
            <nav className="sidebar-nav">
              <ul className="sidebar-nav-list">
                <li className="sidebar-nav-item"><a href="/">Home</a></li>
                <li className="sidebar-nav-item"><a href="/Flights">Flights</a></li>
                <li className="sidebar-nav-item"><a href="/Hotels">Hotels</a></li>
                <li className="sidebar-nav-item"><a href="/Activities">Activities</a></li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <main className="main">{children}</main>

          {/* Footer */}
          <footer>
            <p>© 2024 FlyNExplore by Rafan Syed</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
