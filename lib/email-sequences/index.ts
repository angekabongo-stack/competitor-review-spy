export { BUYERS_SEQUENCE } from './buyers';
export { LEADS_SEQUENCE } from './leads';
export type { SequenceEmail } from './shared';

export type ListType = 'buyers' | 'leads';

export function getSequence(listType: ListType) {
  if (listType === 'buyers') {
    return require('./buyers').BUYERS_SEQUENCE;
  }
  return require('./leads').LEADS_SEQUENCE;
}
