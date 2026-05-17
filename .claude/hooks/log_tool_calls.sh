#!/bin/bash
# Reads JSON from stdin (provided by Claude Code)
INPUT=$(cat)

TOOL=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name','unknown'))")
EVENT=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('hook_event_name','unknown'))")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

LOG_DIR="$(dirname "$0")/logs"
LOG_FILE="$LOG_DIR/claude-tool-calls.log"

if [ "$EVENT" = "PostToolUse" ]; then
  echo "[$TIMESTAMP]  Techgym demo: ✅ SUCCESS  | $TOOL" >> "$LOG_FILE"
else
  echo "[$TIMESTAMP] Techgym demo: 🔧 CALLED   | $TOOL" >> "$LOG_FILE"
fi

exit 0