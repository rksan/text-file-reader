import { TEXT_CONST } from "@/const";
import { ITextReader } from "@/interfaces";

export class CTextStringReader implements ITextReader {
  private _bufferArray: string[];
  private _currentChar: string | null;
  private _count: number;

  /**
   *
   * @param buffer All or part of text data.
   */
  constructor(buffer: string) {
    this._bufferArray = Array.from(buffer);
    this._currentChar = null;
    this._count = 0;
  }

  /**
   * end of buffer.
   */
  get isEOB(): boolean {
    return this._bufferArray.length === 0;
  }

  /**
   * The position of the character being read.( 0 < n)
   */
  get position(): number {
    return this._count + 1;
  }

  protected shift(): string {
    const char = this._bufferArray.shift();
    return char === undefined ? TEXT_CONST.CHAR.EOF : char;
  }

  /**
   * return the character being read.
   * @returns One character.
   */
  peek() {
    if (this._currentChar === null) {
      this._currentChar = this.shift();
    }

    return this._currentChar;
  }

  /**
   * Return the character being read, and change the reading position to the next character.
   * @returns One character.
   */
  next() {
    const char = this.peek();

    this._currentChar = null;
    this._count++;

    return char;
  }
}
