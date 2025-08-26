import parse from "html-react-parser";

export const safeTextHtml = (input) => {
  if (!input) return '';

  let text = '';

  if (Array.isArray(input)) {
    text = input
      .map(item => {
        if (typeof item === 'string') return item;
        if (item?.label) return item.label;
        if (item?.text) return item.text;
        return '';
      })
      .join('\n');
  } else if (typeof input === 'string') {
    text = input;
  } else if (typeof input === 'object' && input?.label) {
    text = input.label;
  } else {
    text = String(input);
  }

  const html = text.replace(/\n/g, '<br />');
  return parse(html);
};
