"use server";

import { z } from "zod";

const FormSchema = z.object({
  workInMinutes: z.coerce
    .number()
    .int()
    .min(1, { message: "Enter a number between 1 and 59." })
    .max(59, { message: "Enter a number between 1 and 59." }),
  shortBreakInMinutes: z.coerce
    .number()
    .int()
    .min(1, { message: "Enter a number between 1 and 59." })
    .max(59, { message: "Enter a number between 1 and 59." }),
  longBreakInMinutes: z.coerce
    .number()
    .int()
    .min(1, { message: "Enter a number between 1 and 59." })
    .max(59, { message: "Enter a number between 1 and 59." }),
});

const UpdateTimerSettings = FormSchema;

export type TimerState = {
  errors?: {
    workInMinutes?: string[];
    shortBreakInMinutes?: string[];
    longBreakInMinutes?: string[];
  };
  message?: string | null;
};

export function updateTimerSettings(prevState: TimerState, formData: FormData) {
  const validateFields = UpdateTimerSettings.safeParse({
    workInMinutes: formData.get("workInMinutes"),
    shortBreakInMinutes: formData.get("shortBreakInMinutes"),
    longBreakInMinutes: formData.get("longBreakInMinutes"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Invalid input. Please enter numbers between 1 and 59.",
    };
  }

  const { workInMinutes, shortBreakInMinutes, longBreakInMinutes } =
    validateFields.data;

  return {
    newSettings: {
      work: { duration: workInMinutes * 60, label: "Work" },
      shortBreak: { duration: shortBreakInMinutes * 60, label: "Short Break" },
      longBreak: { duration: longBreakInMinutes * 60, label: "Long Break" },
    },
    message: "Timer settings updated successfully.",
  };
}
