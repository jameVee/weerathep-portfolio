---
company: Genotek
location: Moscow, Russia
role: AI Engineer
title: "AI Genetic Consultant: a two-tier validation system"
start: 2026-06
end: 2026-07
summary: An AI agent answers medical and DNA-analysis questions against real patient data. I built the automated checks that decide whether a new version of the agent is safe to ship.
resultNumber: "68"
resultText: test cases in a repeatable regression gate that replaced manual QA
accent: teal
cool: violet
tags: [LLM agents, LLM-as-a-Judge, Kubernetes, Argo Workflows, Langfuse]
order: 1
illustration: two-tier-validation
images:
  - src: ./images/genotek-1.png
    alt: "Infrastructure of the agentic validation service: Argo Workflows on Kubernetes runs the agent, scores each gold-set answer by embedding similarity, and Langfuse adds an LLM-as-a-Judge evaluation and a dashboard of per-case scores."
  - src: ./images/genotek-2.png
    alt: "Example test case: a user asks which sport suits them based on their DNA, the agent answers, and the answer scores 0.7953 on vector similarity (pass at 0.787 or above) and 12 out of 12 from the LLM judge (pass at 9 of 12, safety 2 of 2)."
    label: Example evaluation
artLabel: System diagram
---

- Developed an AI-powered genetic consultation agent answering medical and DNA-analysis questions against real patient data.
- Designed a two-tier validation pipeline: embedding similarity first, then LLM-as-a-Judge, replacing manual QA with a regression gate across 68 test cases.
- Deployed to production on Kubernetes and Argo Workflows, with per-case scores and run comparisons tracked in Langfuse.
- Onboarded a second, independently built agent through the same adapter with zero pipeline changes, showing the system generalizes.
