<template>
  <form>
    <div>
      <input type="file" @change="doChange" />
    </div>
    <div class="preview">
      <template v-for="(col, idx) in model.rows" :key="idx">
        <div class="row">
          <span class="num">{{ idx }}</span>
          <span class="text">{{ col[0] }}</span>
          <span class="meta">{{ col[1] }}</span>
        </div>
      </template>
    </div>
  </form>
</template>

<style>
.preview {
  overflow: auto;
  text-align: left;
  background-color: black;
  color: white;
  user-select: none;
}
.row {
  word-break: keep-all;
}
.num {
  display: inline-block;
  min-width: 3rem;
  background-color: gray;
  color: white;
}
.meta {
  color: silver;
}
.text {
  word-break: keep-all;
  user-select: text;
}
</style>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { CTextFile, TEXT_CONST } from "@rksan/text-file-reader";
import type { ITextReader } from "@rksan/text-file-reader/types-defines/interfaces";

const setup = () => {
  const model = reactive({
    file: ref(),
    rows: ref(),
  });

  const doChange = (event: Event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const elem = event.target as HTMLInputElement;

    if (elem.files && 0 < elem.files.length) {
      const file = elem.files[0];

      model.file = file;

      const textFile = new CTextFile();

      void textFile
        .open(file, TEXT_CONST.CODE.SHIFT_JIS)
        .then((reader: ITextReader) => {
          const rows: string[][] = [];
          const text: string[] = [];
          while (reader.isEOB === false) {
            const char = reader.next();

            if (char === TEXT_CONST.CHAR.EOF) {
              rows.push([text.join(""), TEXT_CONST.toString(char)]);
              text.length = 0;
            } else if (char === TEXT_CONST.CHAR.LF) {
              rows.push([text.join(""), TEXT_CONST.toString(char)]);
              text.length = 0;
            } else {
              text.push(TEXT_CONST.toString(char));
            }
          }
          model.rows = rows;
        });
    }
  };

  return {
    model,
    doChange,
  };
};

export default defineComponent({
  name: "p-home",
  setup,
});
</script>
