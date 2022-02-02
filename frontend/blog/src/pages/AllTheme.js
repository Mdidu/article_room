import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import Modal from "../components/UI/Modal";
import { useForm } from "react-hook-form";
import themeService from "../services/theme";
import styles from "./AllTheme.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FormField from "../components/UI/FormField";

const AllTheme = () => {
  const [renderedTheme, setRenderedTheme] = useState();
  const [error, setError] = useState();
  const [theme, setTheme] = useState();
  const [id, setId] = useState();
  const [cartIsShown, setCartIsShown] = useState(false);
  const [reset, setReset] = useState(false);

  const navigate = useNavigate();
  const themeValidator = { required: true, minLength: 3 };

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: theme,
  });

  useEffect(() => {
    setValue("name", theme);
  }, [theme, setValue]);

  useEffect(() => {
    (async () => {
      const datas = await themeService.findAllTheme();
      const theme = (await datas.json()).map((t) => (
        <div key={t.id} value={t.id}>
          {t.name}
          <span>
            <Button onClick={() => onUpdate(t.id, t.name)}>
              <FontAwesomeIcon icon={faEdit} />
              <span className={styles.all_theme_button_txt}>Update</span>
            </Button>
            <Button onClick={() => onDelete(t.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
              <span className={styles.all_theme_button_txt}>Delete</span>
            </Button>

            {error && <ErrorMessage type="global" message={error.msg} />}
          </span>
        </div>
      ));

      setRenderedTheme(theme);
    })();
  }, [error, reset]);

  // Display modal
  const showModalHandler = () => {
    setCartIsShown(true);
  };

  // Hide Modal
  const hideModalHandler = () => {
    setCartIsShown(false);
  };

  // Submit updated name of selected theme
  const onSubmit = async (data) => {
    const datas = await themeService.updateTheme(id, data);

    const { msg } = await datas.json();

    if (!datas.ok) setError(msg);

    hideModalHandler();
    setReset(!reset);
  };

  // Display modal and update the states Theme && Id
  const onUpdate = (id, name) => {
    showModalHandler();
    setTheme(name);
    setId(id);
  };

  const onDelete = async (id) => {
    const datas = await themeService.deleteTheme(id);

    const { msg } = await datas.json();

    if (!datas.ok) setError(msg);

    navigate("/");
  };

  return (
    <div className={styles.all_theme_pages}>
      <h1>List of themes</h1>

      <div className={styles.all_theme_render}>{renderedTheme}</div>
      {cartIsShown && (
        <Modal
          show={showModalHandler}
          onHide={hideModalHandler}
          onClose={hideModalHandler}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.all_theme_form}
          >
            <FormField
              labelText="Name : "
              type="text"
              name="name"
              validator={themeValidator}
              defaultValue={theme}
              register={register}
              error={errors.name}
              errorType={errors.name && errors.name.type}
            />

            <Button type="submit" disabled={!isValid}>
              <FontAwesomeIcon icon={faEdit} color="#FABB51" />
              <span className={styles.all_theme_button_txt}>Update</span>
            </Button>

            {error && <ErrorMessage type="global" message={error.msg} />}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AllTheme;
