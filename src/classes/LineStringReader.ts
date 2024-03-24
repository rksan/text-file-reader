import { TEXT_CONST } from "..";
import { CTextStringReader } from "./TextStringReader";

export class CLineStringReader extends CTextStringReader {
  private _chars: string | null;
  private _charsIdx: number;

  constructor(buffer: string) {
    super(buffer);
    this._chars = null;
    this._charsIdx = 0;
  }

  //@override
  /**
   * Returns the character being read, ignoring [CR].
   * @returns 1 character.
   */
  peek() {
    let char = "";

    if (this._chars === null) {
      if (this.isEOB === true) {
        this._chars = TEXT_CONST.CHAR.EOF;
        this._charsIdx = 0;
      } else {
        // next char
        char = super.buffer.charAt(super.seek());

        //set current chars
        this._chars = char;
        this._charsIdx = 0;

        if (char === TEXT_CONST.CHAR.CR) {
          //skip [CR]
          char = super.buffer.charAt(super.seek());

          //set current chars
          this._chars = char;
          this._charsIdx = 0;
        } else if (char === TEXT_CONST.CHAR.LF) {
          // next char
          char = super.buffer.charAt(super.seek());

          if (char === TEXT_CONST.CHAR.CR) {
            // skip [CR]
          } else {
            // add current char
            this._chars = this._chars + char;
          }
        }
      }
    }

    char = this._chars.charAt(this._charsIdx);

    return char;
  }

  //@override
  /**
   * Returns the character being read, ignoring [CR], and changes the reading position to the next character.
   * @returns 1 character.
   */
  next() {
    const char = this.peek();

    if (this._chars !== null) {
      if (this._charsIdx + 1 < this._chars.length) {
        this._charsIdx++;
      } else {
        this._chars = null;
        this._charsIdx = 0;
      }
    }

    return char;
  }
}
