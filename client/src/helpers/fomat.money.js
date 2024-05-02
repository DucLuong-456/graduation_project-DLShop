export default function format_money(money) {
  return parseInt(money).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
