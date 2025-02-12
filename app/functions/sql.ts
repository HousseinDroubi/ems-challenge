const getUpdateStatementQueryAndParams = async ({
  id,
  full_name,
  email,
  phone_number,
  date_of_birth,
  place_of_birth,
  job_title,
  department,
  salary,
  start_date,
  end_date,
  job_level,
  face_image,
  id_image,
  cv_image,
  cover_letter_image,
}: any) => {
  let image_buffer, id_buffer, cv_buffer, cover_letter_buffer;

  if (face_image) {
    image_buffer = Buffer.from(await (face_image as File).arrayBuffer());
  }

  if (id_image) {
    id_buffer = Buffer.from(await (id_image as File).arrayBuffer());
  }

  if (cv_image) {
    cv_buffer = Buffer.from(await (cv_image as File).arrayBuffer());
  }

  if (cover_letter_image) {
    cover_letter_buffer = Buffer.from(
      await (cover_letter_image as File).arrayBuffer()
    );
  }

  const arr = [
    full_name,
    email,
    phone_number,
    date_of_birth,
    place_of_birth,
    job_title,
    department,
    salary,
    start_date,
    end_date,
    job_level,
    id,
  ];

  if (image_buffer) arr.push(image_buffer);

  if (id_buffer) arr.push(id_buffer);

  if (cv_buffer) arr.push(cv_buffer);

  if (cover_letter_buffer) arr.push(cover_letter_buffer);

  const sql = {
    statement: `
        UPDATE employees

        SET full_name = ?, email = ?,
        phone_number = ?, date_of_birth = ?,
        place_of_birth = ?, job_title = ?,
        department = ?, salary = ?,
        start_date = ?, end_date = ?,
        job_level = ? ${image_buffer ? `, face_image = ?` : ""}${
      id_buffer ? `, id_image = ?` : ""
    }${cv_buffer ? `, cv_image = ?` : ""}${
      cover_letter_buffer ? `, cover_letter_image = ?` : ""
    }

        WHERE id = ?
    `,
    params: arr,
  };
  return sql;
};

export { getUpdateStatementQueryAndParams };
