import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import CourseCard from "./CourseCard";

const Courses = () => {
    const [coursesData, setCoursesData] = useState([]);
    const [filter, setFilter] = useState("All");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8080/courses/allCourses");
                setCoursesData(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Error fetching courses. Please try again later.");
            }
        };

        fetchCourses();
    }, []);

    const filterCourses = () => {
        if (filter === "All") {
            return coursesData;
        } else {
            return coursesData.filter((course) =>
                course.type.toLowerCase().includes(filter.toLowerCase())
            );
        }
    };

    const filteredCourses = filterCourses();

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <div className="course__top d-flex flex-column justify-content-between align-items-center">
                            <div className="course__top__left w-50">
                                <h1>Find a career that works for you</h1>
                                <p>Discover a career path tailored to your strengths and interests.</p>
                            </div>
                            <div>
                                <nav className="filter-nav">
                                    <Button
                                        className={`mr-2 rounded-0 ${filter === "All" ? "bg-primary text-white" : "bg-secondary"}`}
                                        onClick={() => setFilter("All")}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        className={`mr-2 rounded-0 ${filter === "web development" ? "bg-primary text-white" : "bg-secondary"}`}
                                        onClick={() => setFilter("web development")}
                                    >
                                        Web Design
                                    </Button>
                                    <Button
                                        className={`mr-2 rounded-0 ${filter === "Computer-Science" ? "bg-primary text-white" : "bg-secondary"}`}
                                        onClick={() => setFilter("Computer-Science")}
                                    >
                                        Computer Science
                                    </Button>
                                    <Button
                                        className={`mr-2 rounded-0 ${filter === "UI/UX" ? "bg-primary text-white" : "bg-secondary"}`}
                                        onClick={() => setFilter("UI/UX")}
                                    >
                                        UI/UX
                                    </Button>
                                    <Button
                                        className={`mr-2 rounded-0 ${filter === "Science" ? "bg-primary text-white" : "bg-secondary"}`}
                                        onClick={() => setFilter("Science")}
                                    >
                                        Science
                                    </Button>
                                </nav>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {error ? (
                        <Col lg="12" className="text-center">
                            <p>{error}</p>
                        </Col>
                    ) : (
                        filteredCourses.map((course) => (
                            <Col key={course.id} lg="4" md="6" sm="6">
                                <CourseCard item={course} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Courses;
