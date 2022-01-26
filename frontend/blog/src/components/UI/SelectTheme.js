import React, { useEffect, useState } from "react";

const SelectTheme = (props) => {
  const [renderedTheme, setRenderedTheme] = useState();
  const themeValidator = { required: true };
  console.log(props);
  useEffect(() => {
    (async () => {
      const datas = await fetch("http://localhost:8080/theme", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const theme = (await datas.json()).map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ));

      setRenderedTheme(theme);
    })();
  }, [props.name]);

  return (
    <select
      name="theme"
      id="theme"
      {...props.register("theme", themeValidator)}
    >
      <option></option>
      {renderedTheme}
    </select>
  );
};

export default SelectTheme;
