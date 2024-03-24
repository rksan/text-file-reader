import type { TextConst } from "../types";

export const TEXT_CONST: TextConst = {
  CODE: {
    UTF_8: "UTF-8",
    SHIFT_JIS: "Shift_JIS",
  },
  CHAR: {
    EOF: "\x00", //'null'
    SPACE: " ",
    TAB: "\t",
    LF: "\n", //'\n'
    CR: "\r", //"\r",
    CRLF: "\r\n", //"\r\n"
  },
  toString(char: string): string {
    if (char === TEXT_CONST.CHAR.EOF) {
      return "[EOF]";
    } else if (char === TEXT_CONST.CHAR.SPACE) {
      return "[SPACE]";
    } else if (char === TEXT_CONST.CHAR.TAB) {
      return "[TAB]";
    } else if (char === TEXT_CONST.CHAR.LF) {
      return "[LF]";
    } else if (char === TEXT_CONST.CHAR.CR) {
      return "[CR]";
    } else if (char === TEXT_CONST.CHAR.CRLF) {
      return "[CRLF]";
    } else {
      return char;
    }
  },
};
