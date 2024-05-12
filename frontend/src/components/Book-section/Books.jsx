import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import CourseCard from "./BookCard";

const Books = () => {
    const [booksData, setData] = useState([]);
    const [filter, setFilter] = useState("All");
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:8080/books/all-books");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchItems();
    }, []);

    const filterCourses = () => {
        if (filter === "All") {
            return booksData;
        } else {
            return booksData.filter((course) => course.type.toLowerCase().includes(filter.toLowerCase()));
        }
    };

    const filteredCourses = filterCourses();

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5 py-14">
                        <div className=" d-flex flex-column justify-center items-center align-items-center">
                            <div className=" font-bold">
                                <h1>Find The Book You Need</h1>
                            </div>
                            <br /><br />
                            <div>
                                {/* Dropdown Filter */}
                                <Dropdown isOpen={filterOpen} toggle={() => setFilterOpen(!filterOpen)}>
                                    <DropdownToggle caret color="primary">
                                        Filter: {filter}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setFilter("All")}>All</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Mathematics")}>Mathematics</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Engineering")}>Engineering</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Graphics Design")}>Graphics Design</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Biology")}>Biology</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("History")}>History</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("English Literature")}>English Literature</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Music")}>Music</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Programming")}>Programming</DropdownItem>
                                        <DropdownItem onClick={() => setFilter("Textbooks")}>Textbooks</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </Col>
                    {filteredCourses.map((course) => (
                        <Col key={course.id} lg="3" md="4" sm="6">
                            <CourseCard item={course} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Books;
