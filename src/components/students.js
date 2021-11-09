import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import StudentsTable from "./studentsTable";
import { getStudents, deleteStudent } from "../services/studentService";
import ListGroup from "./common/listGroup";
import AddButton from "./common/addButton";
import EditButton from "./common/editButton";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";

function Students({ user }) {
  const facultyList = [
    { _id: "", name: "All Faculty" },
    { _id: "60ec0f43ea6ef30513cea96f", name: "Plus2" },
    { _id: "60ec0f43ea6ef30513cea961", name: "BScCSIT" },
    { _id: "60ec0f43ea6ef30513cea962", name: "BSM" },
    { _id: "60ec0f43ea6ef30513cea963", name: "BSW" },
    { _id: "60ec0f43ea6ef30513cea964", name: "MScCSIT" },
    { _id: "60ec0f43ea6ef30513cea965", name: "MA" },
    { _id: "60ec0f43ea6ef30513cea966", name: "PhD" },
    { _id: "60ec0f43ea6ef30513cea967", name: "Bachelors" },
  ];
  const [pageSize] = useState(10);
  const [currentPage, SetCurrentPage] = useState(1);
  const [count, SetCount] = useState(0);
  const [student, SetStudent] = useState([]);
  const [searchQuery, SetSearchQuery] = useState("");
  const [selectedFaculty, SetSelectedFaculty] = useState({
    _id: "",
    name: "All Faculty",
  });
  const [sortColumn, SetSortColumn] = useState({
    path: "firstName",
    order: "desc",
  });
  const [itemsCount, SetItemsCount] = useState(0);

  const handleFacultySelect = (faculty) => {
    SetSelectedFaculty(faculty);
  };

  const handleSort = (sortColumn) => {
    SetSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    SetSearchQuery(query);
  };

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleDelete = async (stu) => {
    const originalStudent = student;
    const students = originalStudent.filter((m) => m._id !== stu._id);
    SetStudent(students);
    try {
      await deleteStudent(stu._id);
    } catch (ex) {
      toast.error("This movie has already been deleted");
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie cannot be found");
        SetStudent(originalStudent);
      }
    }
  };

  const getPageData = async () => {
    const { data: allStudents } = await getStudents();
    let filtered = allStudents;
    if (searchQuery)
      filtered = allStudents.filter((m) =>
        m.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedFaculty._id !== "")
      filtered = allStudents.filter((m) => m.faculty === selectedFaculty.name);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const students = paginate(sorted, currentPage, pageSize);
    SetStudent(students);
    SetItemsCount(filtered.length);
    SetCount(students.length);
  };

  async function populateStudents() {
    try {
      const { data: student } = await getStudents();
      SetStudent(student);
      SetCount(student.length);
      SetItemsCount(student.length);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
      return;
    }
  }
  useEffect(() => {
    populateStudents();
  }, []);

  useEffect(() => {
    getPageData();
  }, [searchQuery, sortColumn, selectedFaculty, pageSize, currentPage]);

  return (
    <>
      <div className='container'>
        <div className='row mt-4'>
          <div className=' col-md-2 col-sm-8'>
            <div className='row'>
              <div className='col-md-6'>
                <AddButton
                  linkTo='/faculty/new'
                  name='Faculty'
                  user={user}
                ></AddButton>
              </div>
              <div className='col-md-6'>
                <EditButton
                  selectedItem={selectedFaculty}
                  name='Faculty'
                  linkTo='students'
                  user={user}
                ></EditButton>
              </div>
            </div>
            <ListGroup
              items={facultyList}
              selectedItem={selectedFaculty}
              onItemSelect={handleFacultySelect}
              user={user}
            ></ListGroup>
          </div>
          <div className='col-md-10 col-sm-8'>
            <div className='row'>
              <div className='col-md-12'>
                {user && (
                  <AddButton
                    linkTo='/students/new'
                    name=' Student'
                    user={user}
                  ></AddButton>
                )}
              </div>
            </div>
            <p>Showing students {count} in the database</p>
            <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
            <StudentsTable
              students={student}
              sortColumn={sortColumn}
              // onLike={this.handleLike}
              onDelete={handleDelete}
              onSort={handleSort}
            />
            <Pagination
              itemsCount={itemsCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default Students;
