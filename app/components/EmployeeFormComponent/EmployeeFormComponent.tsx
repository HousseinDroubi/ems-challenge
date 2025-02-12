import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import DropFileComponent from "../DropFileComponent/DropFileComponent";

import ProfileIconImage from "../../assets/icons/profile_image.png";

export default function EmployeeFormComponent({ update, employee_data }: any) {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [place_of_birth, setPlaceOfBirth] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [job_level, setJobLevel] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [image_to_show, setImageToShow] = useState<string | ArrayBuffer | null>(
    null
  );
  const [CV, setCV] = useState<null | File>(null);
  const [ID, setID] = useState<null | File>(null);
  const [cover_letter, setCoverLetter] = useState<null | File>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToShow(reader.result); // Set the image as a data URL
      };
      reader.readAsDataURL(image);
    }
  }, [image]);
  return (
    <Form method="post" encType="multipart/form-data">
      <section className="flex ">
        <section>
          <h1 className="form-title">
            {update ? "Update Employee" : "Create New Employee"}
          </h1>
          <InputTextComponent
            text={full_name}
            name="full_name"
            type="text"
            title="Enter Full Name"
            hint="e.g. John Doe"
            onTextChange={(newText: string) => setFullName(newText)}
          />
          <InputTextComponent
            text={email}
            type="email"
            name="email"
            title="Enter Email"
            hint="e.g. john@example.com"
            onTextChange={(newText: string) => setEmail(newText)}
          />
          <InputTextComponent
            text={phone_number}
            type="tel"
            name="phone_number"
            title="Enter Phone Number"
            hint="e.g. 01-123-456"
            onTextChange={(newText: string) => setPhoneNumber(newText)}
          />
          <InputTextComponent
            text={date_of_birth}
            type="date"
            name="date_of_birth"
            title="Enter Date of Birth"
            onTextChange={(newText: string) => setDateOfBirth(newText)}
          />
          <InputTextComponent
            text={place_of_birth}
            type="text"
            name="place_of_birth"
            title="Enter Place of Birth"
            hint="e.g. Beqaa"
            onTextChange={(newText: string) => setPlaceOfBirth(newText)}
          />
          <InputTextComponent
            text={job_title}
            type="text"
            name="job_title"
            title="Enter Job Title"
            hint="e.g. Software Developer"
            onTextChange={(newText: string) => setJobTitle(newText)}
          />
          <InputTextComponent
            text={department}
            type="text"
            name="department"
            title="Enter Department"
            hint="e.g. IT"
            onTextChange={(newText: string) => setDepartment(newText)}
          />
          <InputTextComponent
            text={salary}
            type="text"
            name="salary"
            title="Enter Salary"
            hint="e.g. 700"
            onTextChange={(newText: string) => setSalary(newText)}
          />
          <InputTextComponent
            text={start_date}
            type="date"
            name="start_date"
            title="Enter Start Date"
            onTextChange={(newText: string) => setStartDate(newText)}
          />
          <InputTextComponent
            text={end_date}
            type="date"
            name="end_date"
            title="Enter End Date"
            onTextChange={(newText: string) => setEndDate(newText)}
          />
          <InputTextComponent
            text={job_level}
            type="text"
            title="Enter Job Level"
            name="job_level"
            hint="e.g Junior"
            onTextChange={(newText: string) => setJobLevel(newText)}
          />
        </section>
        <section className="form-files w-100">
          <div className="flex form-image-container">
            <div className="flex j-c-c a-i-c">
              <img
                className={!image ? "" : "w-100 h-100"}
                src={!image ? ProfileIconImage : (image_to_show as string)}
                alt=""
                width={!image ? 100 : undefined}
                height={!image ? 100 : undefined}
              />
            </div>
            <DropFileComponent
              file_name="image"
              setFile={setImage}
              file={image}
            />
          </div>
          <div className="mt-20 form-id-container">
            <DropFileComponent file_name="ID" setFile={setID} file={ID} />
          </div>
          <div className="mt-20 form-cv-container">
            <DropFileComponent file_name="CV" setFile={setCV} file={CV} />
          </div>
          <div className="mt-20 form-cover-letter-container">
            <DropFileComponent
              file_name="Cover letter"
              setFile={setCoverLetter}
              file={cover_letter}
            />
          </div>
        </section>
      </section>
      <div className="flex j-c-c">
        <ButtonComponent title="Create Employee" />
      </div>
    </Form>
  );
}
