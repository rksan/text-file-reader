import { TEXT_CONST } from "@/const";
import { ITextReader } from "@/interfaces";

export class CTextStringReader implements ITextReader {
  private _buffer: string;
  private _idx: number;

  /**
   *
   * @param buffer All or part of text data.
   */
  constructor(buffer: string) {
    this._buffer = buffer;
    this._idx = 0;
  }

  /**
   * end of buffer.
   */
  get isEOB(): boolean {
    return this._buffer.length < this.position;
  }

  /**
   * The position of the character being read.
   */
  get position(): number {
    return this._idx + 1;
  }

  protected get buffer(): string {
    return this._buffer;
  }

  protected get idx(): number {
    return this._idx;
  }

  protected seek(): number {
    return this._idx++;
  }

  /**
   * return the character being read.
   * @returns One character.
   */
  peek() {
    return this.isEOB === true
      ? TEXT_CONST.CHAR.EOF
      : this._buffer.charAt(this._idx);
  }

  /**
   * Return the character being read, and change the reading position to the next character.
   * @returns One character.
   */
  next() {
    const char = this.peek();

    this.seek();

    return char;
  }
}
