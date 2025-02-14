import {
  Form,
  useActionData,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import EmployeeComponent from "~/components/EmployeeComponent/EmployeeComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";
import { convertToBase64 } from "~/functions/file";
import "./route.css";
import SearchBarComponent from "~/components/SearchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "~/components/ButtonComponent/ButtonComponent";
import { getFilterByQuery, getOrderByQuery } from "~/functions/sql";
import PaginationRightIcon from "~/assets/icons/pagination_right.png";
import PaginationLeftIcon from "~/assets/icons/pagination_left.png";

export async function loader() {
  const db = await getDB();
  const arr = await db.all("SELECT * FROM employees;");
  const employees = arr.map((employee) => {
    return { ...employee, image: convertToBase64(employee.face_image) };
  });
  return { employees };
}

export const action: ActionFunction = async ({ request }) => {
  const db = await getDB();
  const formData = await request.formData();
  let query = "";
  let employees;
  if (formData.has("clicked_order_by")) {
    query = getOrderByQuery(
      String(formData.get("order_by")),
      String(formData.get("order")),
      String(formData.get("search_bar"))
    );
    console.log(query);
    const arr = await db.all(query);
    employees = arr.map((employee) => {
      return { ...employee, image: convertToBase64(employee.face_image) };
    });
  } else {
    query = getFilterByQuery(
      String(formData.get("filter_by")),
      String(formData.get("filter")),
      String(formData.get("search_bar"))
    );
    const arr = await db.all(query);
    employees = arr.map((employee) => {
      return { ...employee, image: convertToBase64(employee.face_image) };
    });
  }
  return { employees };
};

export default function EmployeesPage() {
  const itemsPerPage = 8;
  const [current_page, setCurrentPage] = useState(1);

  const [option_filter_by, setOptionFilterBy] = useState<any>("full_name");
  const [options_filter, setOptionsFilter] = useState<any>([]);

  const { employees } = useLoaderData();
  const data = useActionData();
  const [search_bar_text, setSearchBarText] = useState("");
  const [
    filtered_times_and_employees_with_images,
    setFilteredTimesheetsAndEmployeesWithImages,
  ] = useState([]);
  const [paginated_items, setPaginatedItems] = useState<any>();
  useEffect(() => {
    switch (option_filter_by) {
      case "full_name":
        setOptionsFilter([
          {
            content: "> 30",
            value: "> 30",
          },
          {
            content: "> 20",
            value: "> 20",
          },
          {
            content: "> 10",
            value: "> 10",
          },
          {
            content: "< 10",
            value: "< 10",
          },
        ]);
        break;
      case "salary":
        setOptionsFilter([
          {
            content: "More than 5000$",
            value: "> 5000",
          },
          {
            content: "More than 4000$",
            value: "> 4000",
          },
          {
            content: "More than 3000$",
            value: "> 3000",
          },
          {
            content: "More than 2000$",
            value: "> 2000",
          },
          {
            content: "More than 1000$",
            value: "> 1000",
          },
          {
            content: "Less than 1000$",
            value: "<= 1000",
          },
        ]);
        break;
      default:
        setOptionsFilter([
          {
            content: "email@domain1.com",
            value: "@domain1.com",
          },
          {
            content: "email@domain2.com",
            value: "@domain2.com",
          },
          {
            content: "email@domain3.com",
            value: "@domain3.com",
          },
        ]);
        break;
    }
  }, [option_filter_by]);

  useEffect(() => {
    if (data) setFilteredTimesheetsAndEmployeesWithImages(data.employees);
  }, [data]);

  useEffect(() => {
    if (search_bar_text == "") {
      setFilteredTimesheetsAndEmployeesWithImages(employees);
    } else {
      const arr = employees.filter(
        (timesheetAndEmployee: any) =>
          timesheetAndEmployee.full_name
            .toLowerCase()
            .includes(search_bar_text.toLowerCase()) ||
          String(timesheetAndEmployee.salary).includes(search_bar_text) ||
          String(timesheetAndEmployee.phone_number).includes(search_bar_text) ||
          timesheetAndEmployee.job_level
            .toLowerCase()
            .includes(search_bar_text.toLowerCase()) ||
          timesheetAndEmployee.department
            .toLowerCase()
            .includes(search_bar_text.toLowerCase()) ||
          timesheetAndEmployee.job_title
            .toLowerCase()
            .includes(search_bar_text.toLowerCase())
      );
      setFilteredTimesheetsAndEmployeesWithImages(arr);
    }
  }, [search_bar_text]);

  useEffect(() => {
    if (filtered_times_and_employees_with_images.length !== 0) {
      setPaginatedItems(getPaginatedItems(current_page));
    }
  }, [filtered_times_and_employees_with_images]);

  const getPaginatedItems = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered_times_and_employees_with_images.slice(startIndex, endIndex);
  };

  function goToPreviousPage() {
    if (current_page > 1) {
      setCurrentPage(current_page - 1);
      setPaginatedItems(getPaginatedItems(current_page - 1));
    }
  }
  const goToNextPage = () => {
    const totalPages = Math.ceil(
      filtered_times_and_employees_with_images.length / itemsPerPage
    );

    if (current_page < totalPages) {
      setCurrentPage(current_page + 1);
      setPaginatedItems(getPaginatedItems(current_page + 1));
    }
  };

  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees/new", title: "New Employee" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <div>
        <Form method="post">
          <SearchBarComponent
            placeholder="Just type..."
            search_bar_text={search_bar_text}
            setSearchBarText={setSearchBarText}
          />
          <section>
            <div className="order-section flex j-c-c a-i-c mt-20">
              <label htmlFor="order_by">Order By:</label>
              <select name="order_by" id="order_by">
                <option value="full_name">Full name</option>
                <option value="salary">Salary</option>
                <option value="department">Department</option>
              </select>
              <label htmlFor="order">Order:</label>
              <select name="order" id="order">
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
              <ButtonComponent
                title="Apply Order search"
                name="clicked_order_by"
              />
            </div>
          </section>
          <section>
            <div className="order-section flex j-c-c a-i-c mt-20">
              <label htmlFor="filter_by">Filter By:</label>
              <select
                name="filter_by"
                id="filter_by"
                value={option_filter_by}
                onChange={(e) => {
                  setOptionFilterBy(e.target.value);
                }}
              >
                <option value="full_name">Full name</option>
                <option value="salary">Salary</option>
                <option value="email">Email</option>
              </select>
              <label htmlFor="filter">Filter:</label>
              <select name="filter" id="filter">
                {options_filter.map((option: any) => (
                  <option value={option.value} key={option.value}>
                    {option.content}
                  </option>
                ))}
              </select>
              <ButtonComponent
                title="Apply filter search"
                name="click_apply_filter"
              />
            </div>
          </section>
        </Form>
        <article className="employees-container flex w-100">
          {filtered_times_and_employees_with_images.map((employee: any) => (
            <EmployeeComponent employee={employee} key={employee.id} />
          ))}
        </article>
      </div>
      <article className="pagination-container flex j-c-c mt-20">
        <section className="flex j-c-s-b">
          <div className="flex j-c-c a-i-c">
            <img
              src={PaginationLeftIcon}
              alt="Go left"
              onClick={() => {
                goToPreviousPage();
              }}
            />
          </div>
          <div className="flex j-c-c a-i-c">
            <img
              src={PaginationRightIcon}
              alt="Go Right"
              onClick={() => {
                goToNextPage();
              }}
            />
          </div>
        </section>
      </article>
    </div>
  );
}
