export const DATE_FORMAT = "DD-MM-YYYY";
export const DATE_TIME_FORMAT = "dd-MM-yyyy HH:mm:ss";
export const TIME_FORMAT = "HH:mm:ss";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SEARCH_DEBOUNCE_MS = 800;

export const FORM_ERROR_MESSAGE = {
  DEFAULT_ERROR: "Không hợp lệ",
  REQUIRED: "Trường bắt buộc",
  EMAIL_INVALID: "Địa chỉ email không hợp lệ",
  DATE_INVALID: "Ngày không hợp lệ",
  DATE_RANGE_INVALID: "Ngày không hợp lệ",
  REGEX_INVALID: "Định dạng không hợp lệ",
  MIN_LENGTH: (minLength: number) =>
    `Trường này yêu cầu (tối thiểu ${minLength} ký tự).`,
  MAX_LENGTH: (maxLength: number) =>
    `Trường này yêu cầu (tối đa ${maxLength} ký tự).`,
  RANGE_LENGHT: (minLength: number, maxLength: number) =>
    `Tối thiểu ${minLength} ký tự, tối đa ${maxLength} ký tự.`,
  MIN_VALUE: (minVal: number) => `Giá trị tối thiểu ${minVal}.`,
  MAX_VALUE: (maxVal: number) => `Giá trị tối đa ${maxVal}.`,
  RANGE_VALUE: (minVal: number, maxVal: number) =>
    `Giá trị tối thiểu ${minVal}, tối đa ${maxVal}.`,
};
