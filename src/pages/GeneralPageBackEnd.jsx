import React from 'react'
import { useLocation } from 'react-router-dom';
import '../assets/Styles/Pages/GeneralPageBackEnd.scss'

const GeneralPageBackEnd = () => {

  const location = useLocation();
  const pageData = location.state?.pageData;

  if (!pageData) {
    return (
      <div className="general-backend">
        <div className="container">
          <h1>Page Not Found</h1>
          <p>No page data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="general-backend">
      <div className="containerer">
        <div className="page-header">
          <h1>{pageData.title}</h1>
        </div>
        <div className="page-meta">
          <p><strong>Created:</strong> {new Date(pageData.createdAt).toLocaleDateString()}</p>
          <p><strong>Updated:</strong> {new Date(pageData.updatedAt).toLocaleDateString()}</p>
        </div>
        <div className="page-content">
          <p>{pageData.desc}</p>
        </div>
      </div>

    </div>
  )
}

export default GeneralPageBackEnd
