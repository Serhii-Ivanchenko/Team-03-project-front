import React, { useState, useEffect } from "react";
import css from "./AddWaterModal.module.css";
import iconSprite from "../../../assets/images/icons/icons.svg";
import toast from "react-hot-toast";

import { useForm, Controller, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addWaterItem } from "../../../redux/water/operations";
import { selectDate } from "../../../redux/water/selectors.js";

const AddWaterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectDate);

  // Використовуємо локальне сховище для кількості води
  const [count, setCount] = useState(() => {
    return localStorage.getItem("waterCount")
      ? parseInt(localStorage.getItem("waterCount"), 10)
      : 50;
  });

  // Функція для отримання поточного часу
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      waterUsed: localStorage.getItem("waterUsed") || count, // Використовуємо localStorage
      recordingTime: getCurrentTime(), // Встановлюємо поточний час
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const recordingTime = useWatch({ control, name: "recordingTime" });
  const waterUsed = useWatch({ control, name: "waterUsed" });

  // Оновлюємо значення лічильника та зберігаємо в localStorage
  useEffect(() => {
    localStorage.setItem("waterCount", count);
    setValue("waterUsed", count);
  }, [count, setValue]);

  // Зберігаємо використану кількість води в localStorage
  useEffect(() => {
    if (waterUsed) {
      localStorage.setItem("waterUsed", waterUsed);
    }
  }, [waterUsed]);

  const increment = () => {
    setCount((prevCount) => prevCount + 50);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 50 : 0));
  };

  const formatTime = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const hours = cleaned.slice(0, 2);
    const minutes = cleaned.slice(2, 4);
    return `${hours}${minutes ? `:${minutes}` : ""}`;
  };

  const handleTimeChange = (e) => {
    const formattedTime = formatTime(e.target.value);
    setValue("recordingTime", formattedTime);
  };

const handleAddWaterItem = (newWaterItem) => {
    dispatch(addWaterItem({ newWaterItem, selectedDate: selectedDate }))
      .unwrap()
      .then(() => {
        toast.success("Add data successfully!");
        onClose();
        reset();
        localStorage.removeItem("waterCount");
        localStorage.removeItem("waterUsed");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const onSubmit = (data) => {
    const newWaterItem = {
      // date: new Date().toISOString().split("T")[0],
      time: data.recordingTime || "00:00",
      value: parseInt(data.waterUsed, 10),
    };
    handleAddWaterItem(newWaterItem);
    // dispatch(addWaterItem(newWaterItem))
    //   .unwrap()
    //   .then(() => {
    //     toast.success("Add data successfully!");
    //     onClose();
    //     reset();
    //     localStorage.removeItem("waterCount");
    //     localStorage.removeItem("waterUsed");
    //   })
    //   .catch((err) => {
    //     toast.error("Something went wrong");
    //   });
  };

  return (
    <div className={css.addModalContainer}>
      <div className={css.addModalTextContainer}>
        <h2 className={css.addModalTitle}>Add water</h2>
        <h3 className={css.addModalSubTitle}>Choose a value:</h3>
      </div>

      <div className={css.addModalCounterContainer}>
        <p className={css.addModalCounterTitle}>Amount of water:</p>
        <div className={css.addModalCounter}>
          <button
            className={css.addModalCounterButtonMinus}
            onClick={decrement}
          >
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-minus-in-circle`}></use>
            </svg>
          </button>
          <p className={css.addModalCounterText}>{count} ml</p>
          <button className={css.addModalCounterButtonPlus} onClick={increment}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-plus-in-circle`}></use>
            </svg>
          </button>
        </div>
        <p className={css.addModalCounterTitle}>Recording time:</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              className={css.formInput}
              placeholder="7:00"
              {...register("recordingTime", {
                required: "Recording time is required",
                pattern: {
                  value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                  message: "Please enter time in format HH:MM",
                },
              })}
              type="text"
              onChange={handleTimeChange}
            />
          </label>

          {errors.recordingTime && (
            <p className={css.errorMessage}>{errors.recordingTime.message}</p>
          )}

          <h3 className={css.addModalTitleWaterUsed}>
            Enter the value of the water used:
          </h3>

          <Controller
            name="waterUsed"
            control={control}
            rules={{
              required: "Water usage is required",
              validate: (value) =>
                !isNaN(value) || "Please enter a valid number",
            }}
            render={({ field }) => (
              <input
                {...field}
                className={css.formInput}
                type="text"
                placeholder="250"
                onChange={(e) => {
                  field.onChange(e);
                  setCount(e.target.value ? parseInt(e.target.value, 10) : 0);
                }}
              />
            )}
          />

          {errors.waterUsed && (
            <p className={css.errorMessage}>{errors.waterUsed.message}</p>
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

export default AddWaterModal;
