export type Primitive = string | number | Date | object;
export type KeyValue = { [key: string]: Primitive };
export type KeyStringValue = { [key: string]: string };

export type TextConst = {
  CODE: KeyStringValue;
  CHAR: KeyStringValue;
  toString(char: string): string;
};
