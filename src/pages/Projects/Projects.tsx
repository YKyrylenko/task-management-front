import { Card, Container } from "@mui/material";
import { Link } from "react-router-dom";
import useProjectsService from "../../services/projects/projects.service";
import { useEffect } from "react";

const Projects = () => {
  const { projects, getProjects } = useProjectsService();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <Container
      sx={{
        display: "flex",
        my: 10,
      }}
    >
      {projects.map((project) => (
        <Link to={`/project/${project.uuid}`} key={project.uuid}>
          <Card key={project.uuid}> {project.name}</Card>
        </Link>
      ))}
    </Container>
  );
};

export default Projects;
