const formatter = {
  getFullDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${this.zeroPad(month)}-${this.zeroPad(day)}`;
  },
  getIntlCurrencyKr(price: number) {
    return new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' }).format(price);
  },
  zeroPad(day: number) {
    return day < 10 ? '0' + day : day;
  },
};

export default formatter;
