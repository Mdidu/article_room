import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";
import { useForm } from "react-hook-form";
import themeService from "../services/theme";

const AllTheme = () => {
  const [renderedTheme, setRenderedTheme] = useState();
  const [error, setError] = useState();
  const [theme, setTheme] = useState();
  const [id, setId] = useState();
  const [cartIsShown, setCartIsShown] = useState(false);

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
            <Button onClick={() => onUpdate(t.id, t.name)}>Modifier</Button>
            <Button onClick={() => onDelete(t.id)}>Supprimer</Button>

            {error && <ErrorMessage type="global" message={error.msg} />}
          </span>
        </div>
      ));

      setRenderedTheme(theme);
    })();
  }, [error]);

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

    window.location.reload();
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
    <div>
      <h1>Liste des thèmes</h1>
      {renderedTheme}
      {cartIsShown && (
        <Modal
          show={showModalHandler}
          onHide={hideModalHandler}
          onClose={hideModalHandler}
        >
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Name : </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={theme}
                  {...register("name", themeValidator)}
                />
                {errors.name && <ErrorMessage type={errors.name.type} />}
              </div>

              <Button type="submit" disabled={!isValid}>
                Valider
              </Button>

              {error && <ErrorMessage type="global" message={error.msg} />}
            </form>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default AllTheme;
