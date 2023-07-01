export const urlRegex =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const phoneRegex =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

// eslint-disable-next-line no-useless-escape
export const userRegex = /^([^0-9_@.#&+$^=*%()\/|\\!-])/;

export const emailRegex =
  /^(?=(.{1,64}@.{1,255}))([-+%_a-zA-Z0-9]{1,64}(\.[-+%_a-zA-Z0-9][^.]{0,}){0,})@([a-zA-Z0-9_]{0,63}(\.[a-zA-Z0-9-]{0,}){0,}[^.](?!.web)(\.[a-zA-Z]{2,6}){1,4})$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,}$/;

export const numberRegex = /^[0-9]*$/;

export const youtubeRegex =
  /^(https?:\/\/)?(www.)?(youtube.com|youtu.?be)\/.+?$/;
