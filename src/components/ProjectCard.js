import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, img, projectUrl }) => {
  return (
    <Col size={12} sm={6} md={4} >
      <div className="proj-imgbx">
        <img src={`https://hellbat.pythonanywhere.com/${img}`} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          
          <a href={projectUrl} target="_blank">Click here</a>
        </div>
      </div>
    </Col>
  )
} 
