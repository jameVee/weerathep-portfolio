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
accent: gold
cool: indigo
tags: [LLM agents, LLM-as-a-Judge, Kubernetes, Argo Workflows, Langfuse]
order: 1
illustration: two-tier-validation
artLabel: System diagram
---

- Developed an AI-powered genetic consultation agent answering medical and DNA-analysis questions against real patient data.
- Designed a two-tier validation pipeline: embedding similarity first, then LLM-as-a-Judge, replacing manual QA with a regression gate across 68 test cases.
- Deployed to production on Kubernetes and Argo Workflows, with per-case scores and run comparisons tracked in Langfuse.
- Onboarded a second, independently built agent through the same adapter with zero pipeline changes, showing the system generalizes.
