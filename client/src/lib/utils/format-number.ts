export function formatNumber(number: number){
  return new Intl.NumberFormat("fa-IR").format(number)
}