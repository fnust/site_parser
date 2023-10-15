export function htmlText(html: string, i: number): string[] {
  const { htmlToText } = require('html-to-text');

  const text: string = htmlToText(html, {
    wordwrap: 130,
  });

  let cleanWords = cleaning(text);
  let res = sort(cleanWords);

  // const fs = require('fs');
  // fs.writeFileSync('html.html', html.toString());
  // fs.writeFileSync(`data_${i}.txt`, cleanWords.join('|'));
  // fs.writeFileSync(
  //   'res.txt',
  //   [capLet(res[0]), capLet(res[1]), capLet(res[2])].join(' | ')
  // );

  return [capLet(res[0]), capLet(res[1]), capLet(res[2])];
}

function cleaning(data: string): string[] {
  let words: string[] = data.replace(/[\n\r]+/g, ' ').split(/\s+/);
  let ans: string[] = [];

  for (let word of words) {
    if (word[0] != '[' && word[word.length - 1] != ']') {
      let cleanWord = word.replace(/[^a-zA-Zа-яА-Я]+/g, '');
      if (cleanWord.length > 4) {
        ans.push(cleanWord.toLowerCase());
      }
    }
  }

  return ans;
}

function capLet(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sort(data: string[]): string[] {
  let valuesMap = new Map();

  data.forEach((elem) => {
    valuesMap.set(elem, valuesMap.has(elem) ? valuesMap.get(elem) + 1 : 1);
  });

  let arr = [...valuesMap.entries()].sort((a, b) => b[1] - a[1]);

  return arr.map((value) => value[0]);
}

export function PDF(data: string[][]) {
  const fs = require('fs');
  let localType = 'src/fonts/TimesNewRoman.ttf';
  const PDFDocument = require('pdfkit-table');

  let doc = new PDFDocument({ margin: 30, size: 'A4' });

  const table = {
    title:
      'Три наиболее часто встречающихся слова длиннее 4 символов на различных сайтах:',
    headers: ['URL', '1', '2', '3'],
    rows: data,
    options: { padding: 1 },
  };

  doc.table(table, {
    prepareHeader: () => doc.font(localType),
    prepareRow: (row: any, i: any) => doc.font(localType).fontSize(12),
  });

  doc.pipe(fs.createWriteStream('document.pdf'));
  doc.end();

  return doc;
}
