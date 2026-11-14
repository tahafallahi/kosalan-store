export function formatPhoneNumber(number: number){
  return new Intl.NumberFormat("fa-IR", {useGrouping: false}).format(number)
}