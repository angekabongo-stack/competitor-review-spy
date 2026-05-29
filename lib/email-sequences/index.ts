export { BUYERS_SEQUENCE } from './buyers';
export { LEADS_SEQUENCE } from './leads';
export { FACEBOOK_LEADS_SEQUENCE } from './facebook-leads';
export type { SequenceEmail } from './shared';

export type ListType = 'buyers' | 'leads' | 'facebook_leads';

export function getSequence(listType: ListType) {
  if (listType === 'buyers') return require('./buyers').BUYERS_SEQUENCE;
  if (listType === 'facebook_leads') return require('./facebook-leads').FACEBOOK_LEADS_SEQUENCE;
  return require('./leads').LEADS_SEQUENCE;
}
