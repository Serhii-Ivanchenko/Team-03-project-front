import React, { useState, useEffect } from "react";
import css from "./AddWaterModal.module.css";
import iconSprite from "../../../assets/images/icons/icons.svg";
import toast from "react-hot-toast";

import { useForm, Controller, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addWaterItem } from "../../../redux/water/operations";
import { useTranslation } from "react-i18next";
import { selectDate } from "../../../redux/water/selectors.js";

const AddWaterModal = ({ onClose }) => {
  const { t } = useTranslation();
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
        toast.success(t("add_water_modal.add_successfully"));
        onClose();
        reset();
        localStorage.removeItem("waterCount");
        localStorage.removeItem("waterUsed");
      })
      .catch(() => {
        toast.error(t("add_water_modal.something_wrong"));
      });
  };

  const onSubmit = (data) => {
    const newWaterItem = {
      time: data.recordingTime || "00:00",
      value: parseInt(data.waterUsed, 10),
    };
    handleAddWaterItem(newWaterItem);
  };

  return (
    <div className={css.addModalContainer}>
      <div className={css.addModalTextContainer}>
        <h2 className={css.addModalTitle}>{t("add_water_modal.add_water")}</h2>
        <h3 className={css.addModalSubTitle}>{t("add_water_modal.choose_value")}</h3>
      </div>

      <div className={css.addModalCounterContainer}>
        <p className={css.addModalCounterTitle}>{t("add_water_modal.amount_water")}</p>
        <div className={css.addModalCounter}>
          <button
            className={css.addModalCounterButtonMinus}
            onClick={decrement}
          >
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-minus-in-circle`}></use>
            </svg>
          </button>
          <p className={css.addModalCounterText}>{count}{t("add_water_modal.ml")}</p>
          <button className={css.addModalCounterButtonPlus} onClick={increment}>
            <svg className={css.icon}>
              <use href={`${iconSprite}#icon-plus-in-circle`}></use>
            </svg>
          </button>
        </div>
        <p className={css.addModalCounterTitle}>{t("add_water_modal.recording_time")}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              className={css.formInput}
              placeholder="7:00"
              {...register("recordingTime", {
                required: t("add_water_modal.time_required"),
                pattern: {
                  value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                  message: t("add_water_modal.time_format"),
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
          {t("add_water_modal.enter_water")}
          </h3>

          <Controller
            name="waterUsed"
            control={control}
            rules={{
              required: t("add_water_modal.water_required"),
              validate: {
                validNumber: (value) =>
                  !isNaN(value) || t("add_water_modal.valid_number"),
                nonZero: (value) =>
                  parseInt(value, 10) > 0 ||
                t("add_water_modal.water_must"),
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                className={`${css.formInput} ${
                  errors.waterUsed ? css.errorInput : ""
                }`}
                type="number"
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
          {t("add_water_modal.save")}
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
