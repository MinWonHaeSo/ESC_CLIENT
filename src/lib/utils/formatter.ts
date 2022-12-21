const formatter = {
  getFullDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  },

  getIntlCurrencyKr(price: number) {
    return new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' }).format(price);
  },
};

export default formatter;
