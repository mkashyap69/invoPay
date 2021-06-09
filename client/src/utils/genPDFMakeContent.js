import images from '../images/logo5.png';

var dd = {
  content: [
    { text: 'Invoice', style: 'header' },
    // {
    //   image: { images },
    //   fit: [100, 100],
    //   pageBreak: 'after',
    // },
    {
      text: 'Client      Manish',
      style: 'sub-header',
    },
    {
      text: 'Email      mk@gmail.com',
      style: 'sub-header',
    },
    {
      text: 'Phone No.      +91 9432344284',
      style: 'sub-header',
    },
    {
      style: 'tableExample',
      table: {
        widths: ['*', '*', '*'],
        body: [
          [
            { fillColor: '#9eb7c6', text: 'Item' },
            { fillColor: '#9eb7c6', text: 'Rate' },
            '',
          ],
          ['Bread', '20', ''],
          ['Mayo', '90', ''],
          ['Rice', '60', ''],
          ['', 'Total', { fillColor: '#ed816c', text: '170' }],
        ],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i, node) {
          return i === 0 || i === node.table.widths.length ? 2 : 1;
        },
        hLineColor: function (i, node) {
          return 'black';
        },
        vLineColor: function (i, node) {
          return 'black';
        },
        hLineStyle: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return null;
          }
          return { dash: { length: 10, space: 4 } };
        },
        vLineStyle: function (i, node) {
          if (i === 0 || i === node.table.widths.length) {
            return null;
          }
          return { dash: { length: 4 } };
        },
      },
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black',
    },
  },
};

const generatePDFContent = () => {
  return dd;
};

export default generatePDFContent;
