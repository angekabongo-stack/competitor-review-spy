export interface SequenceEmail {
  day: number;
  subject: string;
  html: string;
}

const BASE_URL = 'https://competitor-review-spy.com';
const REPLY_URL = 'https://reviewreplyai.ca';
const YEAR = new Date().getFullYear();

const FOOTER = `
  <div style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(245,242,235,0.1)">
    <p style="color:rgba(245,242,235,0.3);font-size:11px;margin:0">
      © ${YEAR} Competitor Review Spy ·
      <a href="${REPLY_URL}" style="color:#FF3232;text-decoration:none">ReviewReplyAI</a><br>
      Unsubscribe anytime — reply "unsubscribe" to this email.
    </p>
  </div>`;

export function wrap(content: string): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#080808;color:#F5F2EB">
    ${content}
    ${FOOTER}
  </div>`;
}

export function h1(text: string): string {
  return `<h1 style="color:#FF3232;font-size:26px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;line-height:1.2">${text}</h1>`;
}

export function h2(text: string): string {
  return `<h2 style="color:#F5F2EB;font-size:18px;font-weight:700;margin:24px 0 10px">${text}</h2>`;
}

export function p(text: string): string {
  return `<p style="color:rgba(245,242,235,0.75);line-height:1.75;margin:0 0 16px">${text}</p>`;
}

export function stat(number: string, label: string): string {
  return `<div style="background:rgba(255,50,50,0.08);border:1px solid rgba(255,50,50,0.2);border-radius:8px;padding:16px 20px;margin:16px 0">
    <span style="color:#FF3232;font-size:32px;font-weight:800">${number}</span>
    <span style="color:rgba(245,242,235,0.6);font-size:14px;display:block;margin-top:4px">${label}</span>
  </div>`;
}

export function cta(text: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:#FF3232;color:white;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:8px 0">${text}</a>`;
}

export function quote(text: string, attribution?: string): string {
  return `<blockquote style="border-left:3px solid #FF3232;margin:20px 0;padding:12px 20px;background:rgba(245,242,235,0.04);border-radius:0 6px 6px 0">
    <p style="color:#F5F2EB;font-style:italic;margin:0 0 ${attribution ? '8px' : '0'}">"${text}"</p>
    ${attribution ? `<cite style="color:rgba(245,242,235,0.4);font-size:12px;font-style:normal">— ${attribution}</cite>` : ''}
  </blockquote>`;
}

export function twoCol(left: { label: string; value: string; color: string }, right: { label: string; value: string; color: string }): string {
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0">
    <div style="background:#111;border:1px solid rgba(245,242,235,0.1);border-radius:8px;padding:14px">
      <p style="color:rgba(245,242,235,0.4);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px">${left.label}</p>
      <p style="color:${left.color};font-weight:700;font-size:15px;margin:0">${left.value}</p>
    </div>
    <div style="background:#111;border:1px solid rgba(245,242,235,0.1);border-radius:8px;padding:14px">
      <p style="color:rgba(245,242,235,0.4);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px">${right.label}</p>
      <p style="color:${right.color};font-weight:700;font-size:15px;margin:0">${right.value}</p>
    </div>
  </div>`;
}

export { BASE_URL, REPLY_URL };
