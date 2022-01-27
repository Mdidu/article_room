import React, { useEffect, useState } from "react";
import themeService from "../../services/theme";

const SelectTheme = (props) => {
  const [renderedTheme, setRenderedTheme] = useState();
  const themeValidator = { required: true };

  useEffect(() => {
    (async () => {
      const datas = await themeService.findAll();
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
