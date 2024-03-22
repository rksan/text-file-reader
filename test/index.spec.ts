import { describe, it } from "mocha";
import { assert } from "chai";

// test target
import { CTextStringReader, CTextFile } from "@/classes";
import { TEXT_CHAR_CONST, TEXT_CHAR_CODE } from "@/const";

describe("index.ts", () => {
  it("CTextStringReader", () => {
    const buffer = "123456";
    const reader = new CTextStringReader(buffer);

    for (let i = 0; i < buffer.length; i++) {
      assert.isOk(reader.isEOB === false);
      assert.isOk(reader.peek() === reader.next());
      assert.isOk(reader.potition === i + 1);
    }

    assert.isOk(reader.isEOB === true);
    assert.isOk(reader.peek() === TEXT_CHAR_CONST.EOF);
  });

  it("CTextFile", (done) => {
    const buffer = Array.from("123456");

    const blob = new File(buffer, "test.txt");
    const file = new CTextFile();

    void file.open(blob, TEXT_CHAR_CODE.UTF_8).then((reader) => {
      for (let i = 0; i < buffer.length; i++) {
        assert.isOk(reader.isEOB === false);
        assert.isOk(reader.peek() === reader.next());
        assert.isOk(reader.potition === i + 1);
      }

      assert.isOk(reader.isEOB === true);
      assert.isOk(reader.peek() === TEXT_CHAR_CONST.EOF);

      done();
    });
  });
});
