import { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav, Spinner } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const [webProjects, setWebProjects] = useState([]);
  const [labProjects, setLabProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const [webResponse, labResponse] = await Promise.all([
        fetch("https://hellbat.pythonanywhere.com/web_project/"),
        fetch("https://hellbat.pythonanywhere.com/lab_project/")
      ]);

      if (!webResponse.ok || !labResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const [webData, labData] = await Promise.all([
        webResponse.json(),
        labResponse.json()
      ]);

      setWebProjects(webData);
      setLabProjects(labData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                  <h2>Projects</h2>
                  <Tab.Container id="projects-tabs" defaultActiveKey="web">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="web">Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="lab">Labs</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    {loading ? (
                      <div className="text-center">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <>
                        <Tab.Pane eventKey="web">
                          <Row>
                            {webProjects.map((project, index) => (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            ))}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="lab">
                          <Row>
                            {labProjects.map((project, index) => (
                              <ProjectCard
                                key={index}
                                {...project}
                              />
                            ))}
                          </Row>
                        </Tab.Pane>
                      </>
                    )}
                  </Tab.Content>
                </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background" />
    </section>
  );
};
