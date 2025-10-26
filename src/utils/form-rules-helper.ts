import { differenceInYears, isBefore, isValid } from "date-fns";
import { type ZodType, z } from "zod";
import { FORM_ERROR_MESSAGE } from "@/utils/constants";

// Helper to preprocess optional strings
const preprocessOptionalString = (value: any) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  return value;
};

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// File schema for browser environments
export const FILE_SCHEMA = isBrowser
  ? z.instanceof(File).optional()
  : z.any().optional();

export const FORM_RULES_HELPER = {
  // String validation
  REQUIRED_STR(errMsg = FORM_ERROR_MESSAGE.REQUIRED, maxLength?: number) {
    const baseSchema = z
      .string({ message: errMsg })
      .min(1, { message: errMsg });
    if (maxLength)
      return baseSchema.max(
        maxLength,
        FORM_ERROR_MESSAGE.MAX_LENGTH(maxLength)
      );
    return baseSchema;
  },

  OPTIONAL_STR(errMsg = FORM_ERROR_MESSAGE.REQUIRED) {
    return z.preprocess(
      preprocessOptionalString,
      z.string({ message: errMsg }).optional()
    );
  },

  STRING_MIN_LENGTH(
    minLength = 10,
    errMsg = FORM_ERROR_MESSAGE.MIN_LENGTH(minLength)
  ): ZodType<string> {
    return z.string({ message: errMsg }).min(minLength, errMsg);
  },

  STRING_MAX_LENGTH(
    maxLength = 200,
    errMsg = FORM_ERROR_MESSAGE.MAX_LENGTH(maxLength)
  ): ZodType<string> {
    return z.string({ message: errMsg }).max(maxLength, errMsg);
  },

  STRING_RANGE(
    { min = 0, max = 1000 },
    errMsg = FORM_ERROR_MESSAGE.RANGE_LENGHT(min, max)
  ): ZodType<string> {
    return z.string({ message: errMsg }).refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= min && num <= max;
      },
      {
        message: errMsg,
      }
    );
  },

  STRING_RANGE_OPTIONAL(
    { min = 5, max = 10 },
    errMsg = FORM_ERROR_MESSAGE.RANGE_LENGHT(min, max)
  ): ZodType<any> {
    return z.preprocess(
      preprocessOptionalString,
      z
        .string()
        .optional()
        .refine((val) => !val || (val.length >= min && val.length <= max), {
          message: errMsg,
        })
    );
  },

  OPTIONAL_STRING_MIN_MAX_LENGTH(
    { min = 0, max = 1000 },
    errMsg = FORM_ERROR_MESSAGE.RANGE_LENGHT(min, max)
  ): ZodType<any> {
    return z.preprocess(
      preprocessOptionalString,
      z
        .string()
        .min(min, { message: errMsg })
        .max(max, { message: errMsg })
        .optional()
    );
  },

  OPTIONAL_STR_MIN_LENGTH(
    minLength = 1,
    errMsg = FORM_ERROR_MESSAGE.MIN_LENGTH(minLength)
  ): ZodType<any> {
    return z.preprocess(
      preprocessOptionalString,
      z.string({ message: errMsg }).min(minLength, errMsg).optional()
    );
  },

  OPTIONAL_STR_MAX_LENGTH(
    maxLength = 200,
    errMsg = FORM_ERROR_MESSAGE.MAX_LENGTH(maxLength)
  ): ZodType<any> {
    return z.preprocess(
      preprocessOptionalString,
      z.string({ message: errMsg }).max(maxLength, errMsg).optional()
    );
  },

  // Number validation
  REQUIRED_NUM(errMsg = FORM_ERROR_MESSAGE.REQUIRED): ZodType<number> {
    return z.number({ message: errMsg });
  },

  REQUIRED_NUM_MIN(
    min = 0,
    errMsg = FORM_ERROR_MESSAGE.MIN_VALUE(min)
  ): ZodType<number> {
    return z.number({ message: errMsg }).min(min, { message: errMsg });
  },

  REQUIRED_NUM_MIN_MAX(
    min = 0,
    max = 100,
    errMsg = FORM_ERROR_MESSAGE.MAX_VALUE(max)
  ): ZodType<number> {
    return z
      .number({ message: errMsg })
      .min(min, { message: errMsg })
      .max(max, { message: errMsg });
  },

  OPTIONAL_NUM_MIN_MAX(
    min = 0,
    max = 100,
    errMsg = FORM_ERROR_MESSAGE.MAX_VALUE(max)
  ) {
    return z
      .number({ message: errMsg })
      .int({ message: "Số hợp đồng phải là số nguyên" })
      .min(min, { message: errMsg })
      .max(max, { message: errMsg })
      .optional()
      .nullable();
  },

  OPTIONAL_NUM_FLOAT_MIN_MAX(
    min = 0,
    max = 100,
    errMsg = FORM_ERROR_MESSAGE.MAX_VALUE(max)
  ) {
    return z
      .number({ message: errMsg })
      .min(min, { message: errMsg })
      .max(max, { message: errMsg })
      .optional()
      .nullable();
  },

  OPTIONAL_NUMBER(
    errMsg = FORM_ERROR_MESSAGE.REQUIRED
  ): ZodType<number | null | undefined> {
    return z.number({ message: errMsg }).optional().nullable();
  },

  // Email validation
  REQUIRED_EMAIL(errMsg = FORM_ERROR_MESSAGE.EMAIL_INVALID) {
    return z
      .string({ message: errMsg })
      .min(1, { message: FORM_ERROR_MESSAGE.REQUIRED })
      .email(errMsg);
  },

  OPTIONAL_EMAIL(errMsg = FORM_ERROR_MESSAGE.EMAIL_INVALID): ZodType<any> {
    return z.preprocess(
      preprocessOptionalString,
      z.string({ message: errMsg }).email(errMsg).optional()
    );
  },

  // Boolean validation
  REQUIRED_BOL(): ZodType<any> {
    return z.union([
      z.boolean(),
      z.literal("true").transform(() => true),
      z.literal("false").transform(() => false),
      z.literal(1).transform(() => true),
      z.literal(0).transform(() => false),
    ]);
  },

  OPTIONAL_BOL(): ZodType<any> {
    return z
      .union([
        z.boolean(),
        z.literal("true").transform(() => true),
        z.literal("false").transform(() => false),
        z.literal(1).transform(() => true),
        z.literal(0).transform(() => false),
      ])
      .optional();
  },

  REQUIRED_BOOL_TRUE(errMsg = FORM_ERROR_MESSAGE.REQUIRED): ZodType<boolean> {
    return z.any().superRefine((val, ctx) => {
      if (val === true || val === "true" || val === 1) return;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errMsg,
      });
    });
  },

  // Array validation
  REQUIRED_ARR_STR(errMsg = FORM_ERROR_MESSAGE.REQUIRED) {
    return z
      .array(z.string())
      .min(1, errMsg)
      .nullish()
      .transform((val) => val || [])
      .refine((val) => val.length > 0, {
        message: errMsg,
      });
  },

  REQUIRED_ARR_NUM(errMsg = FORM_ERROR_MESSAGE.REQUIRED) {
    return z
      .array(z.number())
      .min(1, errMsg)
      .nullish()
      .transform((val) => val || [])
      .refine((val) => val.length > 0, {
        message: errMsg,
      });
  },

  OPTIONAL_ARR_STR() {
    return z.array(z.string()).optional();
  },

  OPTIONAL_ARR_NUM() {
    return z.array(z.number()).optional();
  },

  // Regex validation
  MATCH_REGEX(
    regex: RegExp,
    errMsg = FORM_ERROR_MESSAGE.REGEX_INVALID
  ): ZodType<string> {
    return z.string({ message: errMsg }).regex(regex, errMsg);
  },

  MATCH_OPTIONAL_REGEX(
    regex: RegExp,
    errMsg = FORM_ERROR_MESSAGE.REGEX_INVALID
  ): ZodType<string | undefined | unknown> {
    return z
      .string()
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val || val === "") return true;
          return regex.test(val);
        },
        { message: errMsg }
      );
  },

  // Date validation with date-fns
  REQUIRED_DATE(errMsg = FORM_ERROR_MESSAGE.DATE_INVALID): ZodType<Date> {
    return z.coerce
      .date({
        message: errMsg,
      })
      .refine((value) => value, {
        message: FORM_ERROR_MESSAGE.REQUIRED,
      })
      .refine((value) => isValid(value), {
        message: errMsg,
      });
  },

  OPTIONAL_DATE(
    errMsg = FORM_ERROR_MESSAGE.DATE_INVALID
  ): ZodType<Date | null | undefined> {
    return z.coerce
      .date({
        message: errMsg,
      })
      .refine((value) => !value || isValid(value), {
        message: errMsg,
      })
      .optional()
      .nullable();
  },

  DATE_ENSURE_MIN_AGE(
    minAge = 18,
    errMsg = `Bạn phải đủ ${minAge} tuổi trở lên`
  ): ZodType<Date> {
    return z.coerce
      .date({
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine((value) => value, {
        message: FORM_ERROR_MESSAGE.REQUIRED,
      })
      .refine((value) => isValid(value), {
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine((date) => differenceInYears(new Date(), date) >= minAge, {
        message: errMsg,
      });
  },

  DATE_RANGE_MIN_MAX_AGE(
    minAge = 18,
    maxAge = 65,
    errMsg = `Tuổi phải từ ${minAge} đến ${maxAge}`
  ): ZodType<Date> {
    return z.coerce
      .date({
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine((value) => value, {
        message: FORM_ERROR_MESSAGE.REQUIRED,
      })
      .refine((value) => isValid(value), {
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine(
        (date) => {
          const age = differenceInYears(new Date(), date);
          return age >= minAge && age <= maxAge;
        },
        {
          message: errMsg,
        }
      );
  },

  REQUIRED_DATE_LESSTHAN_NOW(
    errMsg = "Ngày phải nhỏ hơn ngày hôm nay"
  ): ZodType<Date> {
    return z.coerce
      .date({
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine((value) => value, {
        message: FORM_ERROR_MESSAGE.REQUIRED,
      })
      .refine((value) => isValid(value), {
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine((date) => isBefore(date, new Date()), {
        message: errMsg,
      });
  },

  REQUIRED_DATE_RANGE(errMsg = FORM_ERROR_MESSAGE.DATE_RANGE_INVALID) {
    return z
      .tuple([
        z.coerce.date({ message: errMsg }),
        z.coerce.date({ message: errMsg }),
      ])
      .refine(([start, end]) => isValid(start) && isValid(end), {
        message: FORM_ERROR_MESSAGE.DATE_INVALID,
      })
      .refine(([start, end]) => isBefore(start, end), {
        message: errMsg,
      });
  },

  // Special validation for letters only
  REQUIRED_LETTERS_ONLY(errMsg = "Vui lòng không nhập số"): ZodType<string> {
    const noNumbersRegex = /^[^0-9]*$/;
    return z
      .string({ message: errMsg })
      .min(1, { message: FORM_ERROR_MESSAGE.REQUIRED })
      .regex(noNumbersRegex, { message: errMsg });
  },

  OPTIONAL_LETTERS_ONLY(
    errMsg = "Vui lòng chỉ nhập chữ cái, không được nhập số"
  ): ZodType<any> {
    const lettersOnlyRegex = /^[a-zA-ZÀ-ỹ\s]*$/;
    return z.preprocess(
      preprocessOptionalString,
      z
        .string({ message: errMsg })
        .regex(lettersOnlyRegex, { message: errMsg })
        .optional()
    );
  },

  // File validation
  REQUIRED_IMG(errMsg = FORM_ERROR_MESSAGE.REQUIRED) {
    return z
      .array(
        z.object({
          uid: z.string(),
          name: z.string(),
          status: z.enum(["uploading", "done", "error", "removed"]),
          url: z.string().optional(),
          mediaId: z.string().optional(),
          originFileObj: FILE_SCHEMA,
        })
      )
      .min(1, errMsg)
      .nullish()
      .transform((val) => val || [])
      .refine((val) => val.length > 0, {
        message: errMsg,
      });
  },

  OPTIONAL_IMG(errMsg = FORM_ERROR_MESSAGE.REQUIRED) {
    return z
      .array(
        z.object({
          uid: z.string(),
          name: z.string({
            message: errMsg,
          }),
          status: z.enum(["uploading", "done", "error", "removed"]),
          url: z.string().optional(),
          mediaId: z.string().optional(),
          originFileObj: FILE_SCHEMA,
        })
      )
      .optional();
  },

  OPTIONAL_FILES(errMsg = FORM_ERROR_MESSAGE.REQUIRED) {
    return z
      .array(
        z.object({
          uid: z.string(),
          name: z.string({
            message: errMsg,
          }),
          status: z.enum(["uploading", "done", "error", "removed"]),
          url: z.string().optional(),
          mediaId: z.string().optional(),
          originFileObj: FILE_SCHEMA,
        })
      )
      .optional();
  },
};
