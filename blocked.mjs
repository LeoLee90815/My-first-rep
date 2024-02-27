import {
  VALIDATORS
} from "./chunks/chunk-Z2IP2BVE.mjs";

// src/helpers/get-blocked-message.ts
var periodStrings = {
  "ALL_TIME": "",
  "THIS_MONTH": "this month",
  "THIS_WEEK": "this week",
  "TODAY": "today"
};
var get_blocked_message_default = ({ rule, count, period }) => {
  const periodString = period ? periodStrings[period] : "";
  return count ? `<span id="rule">${rule}</span> was blocked <span id="count">${count}x</span>${periodString ? ` <span id="period">${periodString}</span>` : ""}.` : `<span id="rule">${rule}</span> was blocked.`;
};

// src/blocked.ts
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rule = params.get("rule");
  if (!rule) {
    return;
  }
  const count = params.get("count");
  const period = params.get("period");
  const message = get_blocked_message_default({
    rule,
    count: count || void 0,
    period: VALIDATORS.counterPeriod(period) ? period : void 0
  });
  document.getElementById("message").innerHTML = message;
});
