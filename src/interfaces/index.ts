export interface ITextFile {
  readonly isOpen: boolean;
  open(file: File, encoding?: string): Promise<ITextReader>;
  close(): void;
}

export interface ITextReader {
  get isEOB(): boolean;
  get position(): number;
  peek(): string;
  next(): string;
}
