todo-evolution/
├── README.md
├── CONSTITUTION.md
├── CLAUDE.md

├── specs/
│   ├── overview.md
│   ├── architecture.md
│   ├── phases.md
│   ├── features/
│   │   ├── phase1/
│   │   │   ├── add-task.md
│   │   │   ├── delete-task.md
│   │   │   ├── update-task.md
│   │   │   ├── list-tasks.md
│   │   │   ├── mark-complete.md
│   │   ├── phase2/
│   │   │   ├── api-crud.md
│   │   │   ├── db-schema.md
│   │   │   ├── auth.md
│   │   ├── phase3/
│   │   │   ├── mcp-tools.md
│   │   │   ├── ai-agent.md
│   │   │   ├── chatbot-ui.md
│   │   ├── phase4/
│   │   │   ├── k8s-local.md
│   │   │   ├── dapr-components.md
│   │   │   ├── kafka-events.md
│   │   ├── phase5/
│   │   │   ├── doks-deployment.md
│   │   │   ├── cicd-pipeline.md
│   │   │   ├── cloud-monitoring.md
│   │   └── bonus/
│   │       ├── voice-commands.md
│   │       ├── urdu-localization.md
│   │       └── subagent-skills.md
│   ├── templates/
│   │   ├── spec-template.md
│   │   ├── plan-template.md
│   │   ├── tasks-template.md
│   │   ├── mcp-tool-template.md
│   │   ├── k8s-template.md
│   │   └── dapr-template.md

├── phase1-console/
│   ├── CLAUDE.md
│   ├── src/
│   │   ├── main.py
│   │   ├── tasks.py
│   │   └── storage.py
│   ├── tests/
│   │   ├── test_add_task.py
│   │   ├── test_delete_task.py
│   │   ├── test_update_task.py
│   │   ├── test_list_tasks.py
│   │   └── test_mark_complete.py

├── phase2-web/
│   ├── frontend/
│   │   ├── CLAUDE.md
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── tasks/
│   │   │       ├── page.tsx
│   │   │       └── components/
│   │   │           └── TaskCard.tsx
│   │   └── lib/
│   │       └── api.ts
│   ├── backend/
│   │   ├── CLAUDE.md
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── tasks.py
│   │   │   ├── auth.py
│   │   │   └── users.py
│   │   ├── db/
│   │   │   ├── session.py
│   │   │   └── models.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   └── tests/
│   │       └── test_api.py

├── phase3-ai/
│   ├── CLAUDE.md
│   ├── mcp-server/
│   │   ├── server.py
│   │   ├── tools/
│   │   │   ├── add_task.py
│   │   │   ├── list_tasks.py
│   │   │   ├── update_task.py
│   │   │   ├── delete_task.py
│   │   │   └── complete_task.py
│   ├── agent/
│   │   ├── agent.py
│   │   └── config.py
│   ├── chatbot-ui/
│   │   ├── ChatKit.jsx
│   │   └── styles.css

├── phase4-k8s/
│   ├── CLAUDE.md
│   ├── k8s/
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   ├── dapr/
│   │   │   ├── pubsub.yaml
│   │   │   ├── statestore.yaml
│   │   │   ├── bindings-cron.yaml
│   │   │   └── secrets.yaml
│   │   ├── kafka/
│   │   │   ├── redpanda.yaml
│   │   │   └── topics.yaml

├── phase5-cloud/
│   ├── CLAUDE.md
│   ├── doks/
│   │   ├── production-deployment.yaml
│   │   ├── hpa.yaml
│   │   ├── ingress.yaml
│   │   └── secrets.yaml
│   ├── cicd/
│   │   └── github-actions.yaml
│   └── monitoring/
│       ├── grafana.yaml
│       └── prometheus.yaml

└── .gitignore
