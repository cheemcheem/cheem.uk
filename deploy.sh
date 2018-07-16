#!/usr/bin/env zsh
set -e
# The above line uses zsh because I do, you might need to change this (google 'shebang line')

# Compiles files, transfers to remote, kills old server, and runs new server.
# if $1 is present then will not restart remote server (i.e. for /public changes only)

# Hints:
# 1) You may want to run this in tmux or modify this script
# 2) This runs "killall node" which may be an issue
# 3) Check you have all global variables ready

# Global Vars Required
# $CSADDR should be $USER@<url> ie user@address to connect to via ssh
# $CSLOC should be $CSADDR/cs/home/$USER ie user@address:/path to find home directory
# (or any you have permissions for)

local_dir="built" # Where to find TS compiled files and
remote_dir="LabChecker" # Where to send files remotely

# Compile TS and copy other files into built folder like package*.json, public/*, and views/*
# todo add "local_dir" param to npm commands
npm install --only-dev && npm run compile && npm run copy


# Use rsync to transfer files
#"--exclude=*.ts --exclude=*.js.map"
rsync -r "--exclude=*tsconfig.json" "$PWD/$local_dir" "$CSLOC/$remote_dir"
rsync "$PWD/package.json" "$CSLOC/$remote_dir"
rsync "$PWD/package-lock.json" "$CSLOC/$remote_dir"

if [ -n "$1" ]; then
    exit 0
fi


# Kill old server and start server (change port in bin/www.ts to own port!)
ssh "$CSADDR" \
"killall node ;
cd $remote_dir &&
pwd &&
tree -I node_modules &&
npm install &&
npm run up > log.txt 2>&1"