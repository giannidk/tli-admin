export function makeGross(net, vat){
  const gross = parseFloat(net, 10) + (parseFloat(net, 10) / 100 * parseFloat(vat, 10));
  return gross;
}
