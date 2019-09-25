import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import remarkToHtml from "remark-html";
import remarkParse from "remark-parse";
import unified from "unified";

const FIXTURES_DIR = join(__dirname, "fixtures");

interface ISpecs {
  [key: string]: string;
}

const specs = readdirSync(FIXTURES_DIR).reduce((tests: ISpecs, filename) => {
  const testId = filename.split(".")[0];
  tests[testId] = readFileSync(join(FIXTURES_DIR, filename), "utf-8");
  return tests;
}, {});

const configs = [
  {
    commonmark: false,
    footnotes: true,
    gfm: true
  },
  {
    commonmark: false,
    footnotes: true,
    gfm: false
  },
  {
    commonmark: true,
    footnotes: true,
    gfm: false
  },
  {
    commonmark: true,
    footnotes: true,
    gfm: true
  }
];

configs.forEach(config => {
  describe(JSON.stringify(config), () => {
    const testIds = Object.keys(specs);
    testIds.forEach(testId => {
      test(testId, () => {
        const { contents } = unified()
          .use(remarkParse, config)
          .use(require(".."))
          .use(remarkToHtml)
          .processSync(specs[testId]);

        expect(contents).toMatchSnapshot();
      });
    });
  });
});
