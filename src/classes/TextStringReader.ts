import { TEXT_CHAR_CONST } from "@/const";
import { ITextReader } from "@/interfaces";

export class CTextStringReader implements ITextReader {
  private _buffer: string;
  private _idx: number;

  constructor(buffer: string) {
    this._buffer = buffer;
    this._idx = 0;
  }

  get isEOB(): boolean {
    return this._buffer.length < this._idx + 1;
  }

  get potition(): number {
    return this._idx;
  }

  peek() {
    return this.isEOB ? TEXT_CHAR_CONST.EOF : this._buffer.charAt(this._idx);
  }

  next() {
    const char = this.peek();

    this._idx++;

    return char;
  }
}
