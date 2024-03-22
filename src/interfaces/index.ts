export interface ITextReader{
  get isEOB(): boolean;
  get potition(): number;
  peek(): string;
  next(): string;
}