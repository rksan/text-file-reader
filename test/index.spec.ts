import { describe, it } from "mocha";
import { assert } from "chai";

// test target
import type { ITextReader } from "@/interfaces";
import { CTextStringReader, CTextFile, CLineStringReader } from "@/classes";
import { TEXT_CONST } from "@/const";

describe("index.ts", () => {
  it("CTextStringReader", () => {
    const buffer = "123456";
    const reader: ITextReader = new CTextStringReader(buffer);

    for (let i = 0; i < buffer.length; i++) {
      assert.isOk(reader.position === i + 1, "position fail");
      assert.isOk(reader.isEOB === false, "isEOB =!== false");
      assert.isOk(reader.peek() === reader.next(), "peek() !== next()");
    }

    assert.isOk(reader.isEOB === true, "isEOB !== true");
    assert.isOk(reader.peek() === TEXT_CONST.CHAR.EOF, "[EOF] is notfound.");
  });

  describe("CLineStringReader", () => {
    it("[CRLF]", () => {
      const buffer = ["123456", "7890"].join(TEXT_CONST.CHAR.CRLF);
      const reader: ITextReader = new CLineStringReader(buffer);

      for (let i = 0; i < buffer.length; i++) {
        if (reader.isEOB === true) break;
        const char = reader.peek();
        console.log("char =" + TEXT_CONST.toString(char));
        assert.isOk(reader.peek() !== TEXT_CONST.CHAR.CR, "[CR] is founded.");
        assert.isOk(reader.peek() === reader.next(), "peek() !== next()");
      }

      assert.isOk(reader.isEOB === true, "isEOB !== true");
      assert.isOk(
        reader.peek() === TEXT_CONST.CHAR.EOF,
        "[EOF] is notfound. char=" + reader.peek()
      );
    });
  });

  it.skip("CTextFile", (done) => {
    const buffer = Array.from("123456");

    const blob = new File(buffer, "test.txt");
    const file = new CTextFile();

    void file.open(blob, TEXT_CONST.CODE.UTF_8).then((reader) => {
      for (let i = 0; i < buffer.length; i++) {
        assert.isOk(reader.position === i + 1);
        assert.isOk(reader.isEOB === false);
        assert.isOk(reader.peek() === reader.next());
      }

      assert.isOk(reader.isEOB === true);
      assert.isOk(reader.peek() === TEXT_CONST.CHAR.EOF);

      done();
    });
  });
});
