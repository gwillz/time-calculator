#!/bin/bash
tmux new-session -d  'npm run dev'
tmux split-window -h 'npm run webpack -- -w'
tmux split-window -h 'npm run postcss -- -w'
tmux select-layout even-horizontal
tmux -2 attach-session -d
