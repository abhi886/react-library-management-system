import React, { useEffect, useState, useMemo } from "react";
import SearchBox from "components/common/searchBox";
import StudentsTable from "components/tables/studentsTable";
import { getStudents, deleteStudent } from "services/studentService";
import { getFaculties } from "services/facultyService";

import ListGroup from "components/common/listGroup";
import AddButton from "components/common/addButton";
import EditButton from "components/common/editButton";
import _ from "lodash";
import { paginate } from "utils/paginate";
import { toast } from "react-toastify";
import Pagination from "components/common/pagination";
const PAGESIZE = 7;
function Students({ user }) {
  const [student, SetStudent] = useState([]);
  const [faculty, SetFaculty] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const [searchQuery, SetSearchQuery] = useState("");
  const [selectedFaculty, SetSelectedFaculty] = useState({
    _id: "",
    name: "All Faculty",
  });
  const [sortColumn, SetSortColumn] = useState({
    path: "firstName",
    order: "desc",
  });

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

  const getFilteredItems = useMemo(() => {
    console.log(student);
    debugger;
    return student.filter((s) =>
      s.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [student, searchQuery]);

  const { totalCount, data } = useMemo(() => {
    if (!student) return { totalCount: 0, data: {} };
    let filtered = student;
    if (searchQuery) {
      filtered = getFilteredItems;
    } else if (selectedFaculty && selectedFaculty._id)
      filtered = student.filter((s) => s.faculty === selectedFaculty.name);
    console.log(filtered);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const finalData = paginate(sorted, currentPage, PAGESIZE);
    return { totalCount: filtered.length, data: finalData };
  }, [
    student,
    currentPage,
    getFilteredItems,
    searchQuery,
    selectedFaculty,
    sortColumn.order,
    sortColumn.path,
  ]);

  async function populateStudents() {
    try {
      const { data: student } = await getStudents();
      SetStudent(student);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
      return;
    }
  }

  async function populateFaculties() {
    try {
      const { data: fac } = await getFaculties();
      SetFaculty([{ _id: "", name: "All Faculty" }, ...fac]);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
      return;
    }
  }
  useEffect(() => {
    populateStudents();
    populateFaculties();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='d-flex flex-row mt-3'>
          <div className='me-3'>
            <AddButton
              linkTo='/faculties/new'
              name='Faculty'
              user={user}
            ></AddButton>
          </div>
          <div>
            <EditButton
              selectedItem={selectedFaculty}
              name='Faculty'
              linkTo='faculties'
              user={user}
            ></EditButton>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2 col-sm-8 col-12'>
            <ListGroup
              items={faculty}
              selectedItem={selectedFaculty}
              onItemSelect={handleFacultySelect}
              user={user}
            ></ListGroup>
          </div>
          <div className='col-md-9 col-sm-12 col-12'>
            <div className='row'>
              <div className='col-12 mt-3'>
                {user && (
                  <AddButton
                    linkTo='/students/new'
                    name=' Student'
                    user={user}
                  ></AddButton>
                )}
              </div>
              <div className='col-12'>
                <SearchBox
                  value={searchQuery}
                  onChange={handleSearch}
                ></SearchBox>
              </div>
            </div>
            <p>Showing {totalCount} movies in the database</p>
            <StudentsTable
              students={data}
              sortColumn={sortColumn}
              onDelete={handleDelete}
              onSort={handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={PAGESIZE}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
