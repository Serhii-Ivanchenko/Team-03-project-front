import css from "./EditWaterModal.module.css";
import iconSprite from "../../../assets/images/icons/icons.svg";
import { useForm } from "react-hook-form";

const EditWaterModal = ({onClose}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className={css.editModalContainer}>
      <div className={css.editModalTextContainer}>
        <h2 className={css.editModalTitle}>Edit the entered amount of water</h2>
        <h3 className={css.editModalSubTitle}>Correct entered data:</h3>
      </div>

      <div className={css.editModalCounterContainer}>
        <p className={css.editModalCounterTitle}>Amount of water:</p>
        <div className={css.editModalCounter}>
          <button className={css.editModalCounterButtonMinus}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-minus-in-circle`}></use>
            </svg>
          </button>
          <p className={css.editModalCounterText}>250ml</p>
          <button className={css.editModalCounterButtonPlus}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-plus-in-circle`}></use>
            </svg>
          </button>
        </div>
        <p className={css.editModalCounterTitle}>Recording time:</p>
        <form>
          <label>
            <input className={css.formInput} placeholder="7:00" />
          </label>
          {/* type="time" Поставити в інпут для можливості обирати час */}
          <h3 className={css.editModalTitleWaterUsed}>
            Enter the value of the water used:
          </h3>
          <label>
            <input className={css.formInput} type="text" placeholder="250" />
          </label>
        </form>
        <button onClick={onClose} type="submit" className={css.submitBtn}>
          Save
        </button>

        <button onClick={onClose} className={css.closeBtn}>
          <svg className={css.iconClose}>
            <use href={`${iconSprite}#icon-x`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditWaterModal;
