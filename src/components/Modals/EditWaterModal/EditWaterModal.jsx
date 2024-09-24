import React, { useState, useEffect } from "react";
import css from "./EditWaterModal.module.css";
import iconSprite from "../../../assets/images/icons/icons.svg";
import toast from "react-hot-toast";

import { useForm, Controller, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editWaterItem } from "../../../redux/water/operations";

const EditWaterModal = ({ onClose, itemId, initialValue, initialTime }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(initialValue);
  const [time, setTime] = useState(initialTime);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      waterAmount: amount,
      recordTime: time,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const recordTime = useWatch({ control, name: "recordTime" });
  const waterAmount = useWatch({ control, name: "waterAmount" });

  useEffect(() => {
    localStorage.setItem("editWaterAmount", amount);
    setValue("waterAmount", amount);
  }, [amount, setValue]);

  useEffect(() => {
    if (recordTime) {
      localStorage.setItem("editRecordTime", recordTime);
    }
  }, [recordTime]);

  useEffect(() => {
    if (waterAmount) {
      localStorage.setItem("editWaterAmount", waterAmount);
    }
  }, [waterAmount]);

  const incrementAmount = () => {
    setAmount((prevAmount) => prevAmount + 50);
  };

  const decrementAmount = () => {
    setAmount((prevAmount) => (prevAmount > 0 ? prevAmount - 50 : 0));
  };

  const formatTimeInput = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const hours = cleaned.slice(0, 2);
    const minutes = cleaned.slice(2, 4);
    return `${hours}${minutes ? `:${minutes}` : ""}`;
  };

  const handleTimeInputChange = (e) => {
    const formattedTime = formatTimeInput(e.target.value);
    setValue("recordTime", formattedTime);
  };

  const onSubmit = (data) => {
    const updatedWaterItem = {
      waterItemId: itemId,
      time: data.recordTime || "00:00",
      value: parseInt(data.waterAmount, 10),
    };

    dispatch(editWaterItem(updatedWaterItem))
      .unwrap()
      .then(() => {
        toast.success("Data updated successfully!");

        localStorage.removeItem("editWaterAmount");
        localStorage.removeItem("editRecordTime");

        onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className={css.editModalContainer}>
      <div className={css.editModalTextContainer}>
        <h2 className={css.editModalTitle}>Edit the entered amount of water</h2>
        <h3 className={css.editModalSubTitle}>Correct entered data:</h3>
      </div>

      <div className={css.editModalCounterContainer}>
        <p className={css.editModalCounterTitle}>Amount of water:</p>
        <div className={css.editModalCounter}>
          <button
            className={css.editModalCounterButtonMinus}
            onClick={decrementAmount}
          >
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-minus-in-circle`}></use>
            </svg>
          </button>
          <p className={css.editModalCounterText}>{amount} ml</p>
          <button
            className={css.editModalCounterButtonPlus}
            onClick={incrementAmount}
          >
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-plus-in-circle`}></use>
            </svg>
          </button>
        </div>
        <p className={css.editModalCounterTitle}>Recording time:</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              className={css.formInput}
              placeholder="7:00"
              {...register("recordTime", {
                required: "Recording time is required",
                pattern: {
                  value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                  message: "Please enter time in format HH:MM",
                },
              })}
              type="text"
              onChange={handleTimeInputChange}
            />
          </label>

          {errors.recordTime && (
            <p className={css.errorMessage}>{errors.recordTime.message}</p>
          )}

          <h3 className={css.editModalTitleWaterUsed}>
            Enter the value of the water used:
          </h3>

          <Controller
            name="waterAmount"
            control={control}
            rules={{
              required: "Water amount is required",
              validate: {
                validNumber: (value) =>
                  !isNaN(value) || "Please enter a valid number",
                nonZero: (value) =>
                  parseInt(value, 10) > 0 ||
                  "Water amount must be greater than 0",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                className={`${css.formInput} ${
                  errors.waterAmount ? css.errorInput : ""
                }`}
                type="text"
                placeholder="250"
                onChange={(e) => {
                  field.onChange(e);
                  setAmount(e.target.value ? parseInt(e.target.value, 10) : 0);
                }}
              />
            )}
          />

          {errors.waterAmount && (
            <p className={css.errorMessage}>{errors.waterAmount.message}</p>
          )}

          <button type="submit" className={css.submitBtn}>
            Save
          </button>
        </form>

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
