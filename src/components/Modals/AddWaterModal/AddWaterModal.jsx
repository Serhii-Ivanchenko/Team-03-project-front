import css from "./AddWaterModal.module.css";
import iconSprite from "../../../assets/images/icons/icons.svg";
import { useForm } from "react-hook-form";

const AddWaterModal = (onClose) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className={css.addModalContainer}>
      <div className={css.addModalTextContainer}>
        <h2 className={css.addModalTitle}>Add water</h2>
        <h3 className={css.addModalSubTitle}>Choose a value:</h3>
      </div>

      <div className={css.addModalCounterContainer}>
        <p className={css.addModalCounterTitle}>Amount of water:</p>
        <div className={css.addModalCounter}>
          <button className={css.addModalCounterButtonMinus}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-minus-in-circle`}></use>
            </svg>
          </button>
          <p className={css.addModalCounterText}>250ml</p>
          <button className={css.addModalCounterButtonPlus}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-plus-in-circle`}></use>
            </svg>
          </button>
        </div>
        <p className={css.addModalCounterTitle}>Recording time:</p>
        <form>
          <label>
            <input className={css.formInput} placeholder="7:00" />
          </label>
          <h3 className={css.addModalTitleWaterUsed}>
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

export default AddWaterModal;
