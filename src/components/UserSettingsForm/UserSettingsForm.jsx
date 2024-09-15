import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "../UserSettingsForm/UserSettingsForm.module.css";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";
import { MdRadioButtonChecked } from "react-icons/md";
import { IoMdRadioButtonOff } from "react-icons/io";

const schema = yup.object({
  gender: yup.string().oneOf(["male", "female"]),
  name: yup.string().min(2, "Too Short!").max(40, "Too Long!"),
  email: yup.string().email("Must be a valid email"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number"),
  activeTime: yup
    .number()
    .typeError("Activity must be a number")
    .positive("Activity must be a positive number"),
  dailyNorm: yup
    .number()
    .typeError("Daily norma must be a number")
    .positive("Daily norma must be a positive number"),
});

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const selectedOption = watch("gender");

  const onSubmit = (data) => console.log(data);

  return (
    <div className={css.settingsFormModal}>
      <button type="button" className={css.closeBtn}>
        <svg className={css.closeBtnIcon}>
          <use href="../../../src/assets/images/icons/icons.svg#icon-x"></use>
        </svg>
      </button>

      <h2 className={css.settingsHeader}>Settings</h2>
      <img src="" alt="User`s avatar" className={css.avatar} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          {...register("photo")}
          className={css.avatarInput}
          id="userAvatar"
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
          <div>
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
              <BsExclamationLg
                style={{ color: "#9be1a0", width: "18px", height: "18px" }}
              />
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
              <p className={css.waterNorma}>1.5 L</p>
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
