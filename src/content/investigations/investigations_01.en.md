---
title: "A 'Suspicious' IP That Sent Production and R&D Data to a School Cloud Drive"
description: "During a routine review of DLP event logs, an unremarkable but suspicious IP address stood out — it pointed to a school's cloud drive holding user-uploaded files related to production and R&D. Yet the endpoint DLP only logged everything and blocked nothing."
pubDate: 2026-09-04
tags: ["Data Leak Prevention", "DLP", "Endpoint Security", "Incident Investigation", "Data Exfiltration"]
kind: "investigation"
investigationType: "data-leak"
lang: "en"
langLink: "/zh/investigations/investigations_01/"
featured: true
---


## Background: A Rigorous Browser-Control Policy with a Blind Spot Around "IP"

The client had already implemented rigorous data asset classification and fine-grained control over endpoint data-egress channels. Browser upload behavior was governed by data classification levels, with the intended policy as follows:

| Upload scenario                                                        | Intended policy                     | Current actual behavior       |
| ---------------------------------------------------------------------- | ----------------------------------- | ----------------------------- |
| Medium/High classification · non-allowlisted site (domain access)      | Block upload                        | Endpoint DLP blocks it        |
| Medium/High classification · allowlisted site (domain/IP access)       | Log upload                          | Logged, not blocked           |
| Low classification (domain access)                                     | Log event (blocking upload planned) | Logged, not blocked for now   |
| Site accessed via IP address (non-allowlisted IP) · any classification | Log event (blocking upload planned) | **Logged only; cannot block** |

The long-term plan is to "block all data uploads to non-allowlisted sites." But there is an unavoidable gap today: **DLP blocking only works for sites accessed by domain name**. Once a user connects directly to a site via IP address, DLP cannot tell what the site behind that IP actually is, nor whether it is needed for business. Its only fallback is to log the event first and review it manually.

## Investigation: A Routine Review Catches a Fish That Slipped the Net

One day, while handling routine tasks, I took a quick look through the DLP event logs. Following the usual review method: first rule out events confirmed to be low-risk, then **filter out as many browser events as possible that accessed sites via IP**, and finally ignore events triggered by a few familiar, legitimate business IPs (this requires looking at the specific URL and other context, not just the IP). During this "ruling out" process, a very unremarkable address caught my attention.

```text
DLP event logs
├─ 1. Rule out: events confirmed to be low-risk
├─ 2. Filter: browser file-upload events that accessed sites via IP
├─ 3. Ignore: events triggered by legitimate business IPs (requires URL and other context, not just the IP)
└─ 4. Hit: a suspicious IP address (requires experience plus URL, data content, etc.)
        └─ Access confirmed → a school's cloud drive
```

Following the thread:

1. Accessed the address and confirmed it was a school's cloud drive;
2. Cross-checked the client's intranet — **the address did not exist there**;
3. Whether accessed from the client's intranet or from the public internet, the IP resolved to the same school cloud drive;
4. By this point it was clear that a user had uploaded files to the school cloud drive. (Most endpoint DLP products can take screenshots; when that feature is enabled, there is a good chance the screenshot directly shows where the user uploaded the file.)
5. Filtered out all events going to that address and reviewed the uploaded evidence files one by one.

The files the user uploaded were obvious at a glance — **data related to production and R&D**. And, these file types did not appear in the data asset samples, so **their classification and sensitivity level were never recognized**. Had the review been less careful, this batch of uploads would likely have been missed.

## Escalation: From "a Stern Talking-To" to Security Team Involvement

Based on past practice, submitting the review would usually lead to a routine outcome: the client-side colleague contacts the employee's manager to verify, and if the data classification is not high, no further leak can be confirmed, and the individual shows no malicious intent to leak or steal data, the matter ends with the data deleted from the cloud drive, the employee reprimanded, and another round of security awareness training.

This time, however, it was different:

- The employee was a full-time staff member, and using a former school's cloud drive was highly suspicious in itself;
- The employee **worked on projects for both the client and the client's parent company**;
- The manager had a strong security mindset and immediately contacted the security team lead, explained the situation, and launched a detailed investigation;
- The severity of the incident suddenly exceeded expectations.

In the end, after multiple rounds of verification, it was confirmed that the data had not leaked further — it had remained on the cloud drive the whole time and had not reached any other endpoint; the files in question were deleted from the cloud drive under the manager's supervision.

## Root Cause: Why Can't DLP Stop "IP Access"?

The root cause is that **an IP address itself is not trustworthy**. To DLP, a site accessed by IP could be a genuine business need, or a user's self-built intranet environment. As long as an endpoint can reach a network outside the company, or someone can spin up a local network inside the corporate network, this risk is unavoidable. (Other possible bypass scenarios are not covered here.)

More troublesome is that **IP ranges cannot serve as a trust boundary**:

| Network environment             | Typical IP range |
| ------------------------------- | ---------------- |
| Corporate intranet              | 192.168.x.x      |
| Mobile hotspot / home broadband | 192.168.x.x      |
| Hotel or café WiFi              | 192.168.x.x      |

For example, the intranet-common `192.168.x.x` is **identical** to the ranges used by mobile hotspots, home broadband, and hotel or café WiFi. This means that any allowlisting logic based on "the IP is in an intranet range" treats all those external networks as "intranet." If the events are not logged, this risk is entirely invisible.

## Solutions

- **Log everything + manual review remains the most effective fallback today.** Retain as many events as the endpoint DLP load and server storage can bear, and pair that with a reasonable level of manual review. It cannot block in real time, but it preserves evidence and enables timely discovery.
- **An IP allowlist can mitigate but cannot eliminate the problem.** Strictly defining intranet IP ranges and formalizing the application process for public IP allowlisting can reduce the exposure surface, but it cannot solve the fundamental issue caused by the flexibility of IPs.
- **Screenshot capability cannot replace review, and cannot necessarily be handed to AI.** Most endpoint DLP products include screenshots; such scenarios often rely on screenshots for judgment, so this step is hard to automate with AI. Event logging + manual review remains the mainstay.
