import type { ITextReader, ITextFile } from "@/interfaces";
import { TEXT_CONST } from "@/const";
import { CLineStringReader } from "./LineStringReader";

export class CTextFile implements ITextFile {
  private _reader: FileReader | undefined;

  open(file: File, encoding?: string): Promise<ITextReader> {
    const reader = (this._reader = new FileReader());

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const result = reader.result;
        resolve(new CLineStringReader(bufferToString(result, encoding)));
      };

      reader.onabort = () => {
        reject(reader.error);
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  get isOpen() {
    return this._reader !== undefined;
  }

  close(): void {
    this._reader?.abort();
  }
}

const bufferToString = (
  result: string | ArrayBuffer | null,
  encoding?: string
) => {
  if (result === null) {
    return TEXT_CONST.CHAR.EOF;
  } else if (result instanceof ArrayBuffer) {
    return encodeString(result, encoding);
  } else {
    return result;
  }
};

const encodeString = (buffer: ArrayBuffer, encoding?: string) => {
  const decorder = new TextDecoder(encoding || TEXT_CONST.CODE.UTF_8);
  return decorder.decode(buffer);
};
