/**
 * React Dmarc Sift. DAG's 'Count' node implementation
 */
'use strict';

// Entry point for DAG node
module.exports = function (got) {
  const inData = got.in;
  const messages = inData.data.map(({ key, value }) => {
    try {
      return { key, value: JSON.parse(value) };
    }
    catch (err) {
      console.error('email-sift-web: count.js: something went wrong with input:', e);
      return null;
    }
  }).filter(i => i);


  console.log('email-sift-web: count.js: running...');
  const totalWordCount = messages
    .map(({ value: { wordCount } }) => wordCount)
    .reduce((p, c) => p + c, 0);

  return [
    { name: 'counts', key: 'MESSAGES', value: messages.length },
    { name: 'counts', key: 'WORDS', value: totalWordCount },
  ];
};
