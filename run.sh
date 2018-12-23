tmux new-session -d -s labs
tmux send-keys "nolimit ./start.sh" C-m
tmux detach -s labs