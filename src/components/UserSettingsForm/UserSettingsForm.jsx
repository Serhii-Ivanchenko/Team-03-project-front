import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "../UserSettingsForm/UserSettingsForm.module.css";
import { selectUser } from "../../redux/user/selectors";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";
import { MdRadioButtonChecked } from "react-icons/md";
import { IoMdRadioButtonOff } from "react-icons/io";
import { useState } from "react";
import { updateUserAvatar, updateUserData } from "../../redux/user/operations";
import { userSettingsFormschema } from "../../validationSchemas/userSettingsFormSchema";

export default function UserSettingsForm({ onClose }) {
  const dispatch = useDispatch();

  const { name, email, gender, photo, weight, activeTime, dailyNorm } =
    useSelector(selectUser);

  const [avatar, setAvatar] = useState(photo);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSettingsFormschema),
    mode: "onChange",
    defaultValues: {
      gender: gender ?? "woman",
      name: name ?? "",
      email: email ?? "",
      weight: weight ?? 0,
      activeTime: activeTime ?? 0,
      dailyNorm: dailyNorm ?? 0,
    },
  });

  const selectedOption = watch("gender");
  const selectedWeightByUser = watch("weight");
  const selectedActiveTimeByUser = watch("activeTime");

  const womanNorma = (
    Number(selectedWeightByUser) * 0.03 +
    Number(selectedActiveTimeByUser) * 0.4
  ).toFixed(1);

  const manNorma = (
    Number(selectedWeightByUser) * 0.04 +
    Number(selectedActiveTimeByUser) * 0.6
  ).toFixed(1);

  const handleChange = (e) => {
    const newAvatar = e.target.files[0];
    setAvatar(URL.createObjectURL(newAvatar));

    dispatch(updateUserAvatar(newAvatar))
      .unwrap()
      .then(() => {
        toast.success("Avatar updated!");
      })
      .catch((err) => {
        console.log(err);
        setAvatar(photo);
        toast.error("Avatar wasn`t updated,please try again");
      });
  };

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      weight: data.weight,
      activeTime: data.activeTime,
      dailyNorm: data.dailyNorm,
    };

    dispatch(updateUserData(userData))
      .unwrap()
      .then(() => {
        toast.success("Settings saved successfully!");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Settings weren`t saved,please try again");
      });
  };

  return (
    <div className={css.settingsFormModal}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <svg className={css.closeBtnIcon}>
          <use href="../../../src/assets/images/icons/icons.svg#icon-x"></use>
        </svg>
      </button>
      <h2 className={css.settingsHeader}>Settings</h2>
      <img src={avatar} alt="User`s avatar" className={css.avatar} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name={"photo"}
          type="file"
          {...register("photo")}
          className={css.avatarInput}
          id="userAvatar"
          onChange={handleChange}
        />
        <label htmlFor="userAvatar" className={css.uploadPhotoBtn}>
          <FiUpload color="#2f2f2f" />
          Upload a photo
        </label>
        <div className={css.genderFormWrapper}>
          <p className={css.settingsFormLabel}>Your gender identity</p>
          <div className={css.genderWrapper}>
            <label className={css.radioBtnLabel}>
              <input
                className={css.genderInput}
                type="radio"
                {...register("gender")}
                value="woman"
                checked={selectedOption === "woman"}
              />
              {selectedOption === "woman" ? (
                <MdRadioButtonChecked
                  style={{ color: "#9be1a0", width: "20px", height: "20px" }}
                />
              ) : (
                <IoMdRadioButtonOff
                  style={{ color: "#9be1a0", width: "20px", height: "20px" }}
                />
              )}
              Woman
            </label>
            <label className={css.radioBtnLabel}>
              <input
                className={css.genderInput}
                type="radio"
                {...register("gender")}
                value="man"
                checked={selectedOption === "man"}
              />
              {selectedOption === "man" ? (
                <MdRadioButtonChecked
                  style={{ color: "#9be1a0", width: "20px", height: "20px" }}
                />
              ) : (
                <IoMdRadioButtonOff
                  style={{ color: "#9be1a0", width: "20px", height: "20px" }}
                />
              )}
              Man
            </label>
          </div>
        </div>
        <div className={css.container}>
          <div className={css.wrapper}>
            <div className={css.inputSectionWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.settingsFormLabel} htmlFor="name">
                  Your name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  id="name"
                  className={errors.name ? `${css.inputError}` : `${css.input}`}
                />
                <p className={css.errorMessage}>{errors.name?.message}</p>
              </div>
              <div className={css.inputWrapper}>
                <label className={css.settingsFormLabel} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className={
                    errors.email ? `${css.inputError}` : `${css.input}`
                  }
                />
                <p className={css.errorMessage}>{errors.email?.message}</p>
              </div>
            </div>
            <p className={css.settingsFormLabel}>My daily norma</p>
            <div className={css.normaSectionWrapper}>
              <div className={css.normaWrapper}>
                <p className={css.label}>For woman:</p>
                <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div className={css.normaWrapper}>
                <p className={css.label}>For man:</p>
                <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
            <p className={css.formulaDescr}>
              <span className={css.accent}>*</span> V is the volume of the water
              norm in liters per day, M is your body weight, T is the time of
              active sports, or another type of activity commensurate in terms
              of loads (in the absence of these, you must set 0)
            </p>
            <div className={css.activeTime}>
              <BsExclamationLg className={css.bsExclamationLg} />
              <p className={css.label}>Active time in hours</p>
            </div>
          </div>
          <div>
            <div className={css.inputSectionWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor="weight">
                  Your weight in kilograms:
                </label>
                <input
                  type="text"
                  id="weight"
                  className={
                    errors.weight ? `${css.inputError}` : `${css.input}`
                  }
                  {...register("weight")}
                />
                <p className={css.errorMessage}>{errors.weight?.message}</p>
              </div>
              <div className={css.inputWrapper}>
                <label className={css.label} htmlFor="activity">
                  The time of active participation in sports:
                </label>
                <input
                  type="text"
                  id="activity"
                  className={
                    errors.activeTime ? `${css.inputError}` : `${css.input}`
                  }
                  {...register("activeTime")}
                />
                <p className={css.errorMessage}>{errors.activeTime?.message}</p>
              </div>
            </div>
            <div className={css.recommendedNorma}>
              <p className={css.label}>
                The required amount of water in liters per day:
              </p>
              <p className={css.waterNorma}>
                {selectedOption === "woman" ? womanNorma : manNorma} L
              </p>
            </div>
            <div className={css.userNormaWrapper}>
              <label className={css.settingsFormLabel} htmlFor="userNorma">
                Write down how much water you will drink:
              </label>
              <input
                type="text"
                id="userNorma"
                className={
                  errors.dailyNorm ? `${css.inputError}` : `${css.input}`
                }
                {...register("dailyNorm")}
              />
              <p className={css.errorMessage}>{errors.dailyNorm?.message}</p>
            </div>
          </div>
        </div>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
      </form>
    </div>
  );
}
