import type { KeyStringValue } from "../types"

// CHAR CODE
export const TEXT_CHAR_CODE:KeyStringValue = {
  UTF_8: "UTF-8",
  SHIFT_JIS: "Shift_JIS"
}

//CHAR CONST
export const TEXT_CHAR_CONST:KeyStringValue = {
  "EOF": 0X00.toString(), //'null'
  "SPACE": " ",
  "TAB": 0x09.toString(),
  "LF": 0x0A.toString(), //'\n'
  "CR": 0x0D.toString(), //"\r",
  "CRLF": 0x0A.toString() + 0x0D.toString(), //"\r\n"
}