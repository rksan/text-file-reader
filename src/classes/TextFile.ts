import { TEXT_CHAR_CODE, TEXT_CHAR_CONST } from "@/const";
import { CTextStringReader } from "./TextStringReader";

export class CTextFile {
  private _reader: FileReader | undefined;

  get isOpen() {
    return this._reader !== undefined;
  }

  close(): void {
    this._reader?.abort();
  }

  open(file: File, encoding?: string): Promise<CTextStringReader> {
    const reader = (this._reader = new FileReader());

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const result = reader.result;
        resolve(new CTextStringReader(bufferToString(result, encoding)));
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
}

const bufferToString = (
  result: string | ArrayBuffer | null,
  encoding?: string
) => {
  if (result === null) {
    return TEXT_CHAR_CONST.EOF;
  } else if (result instanceof ArrayBuffer) {
    return encodeString(result, encoding);
  } else {
    return result;
  }
};

const encodeString = (buffer: ArrayBuffer, encoding?: string) => {
  const decorder = new TextDecoder(encoding || TEXT_CHAR_CODE.UTF_8);
  return decorder.decode(buffer);
};
