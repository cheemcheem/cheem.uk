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
# todo add "local_dir" p aram to npm commands
should_deploy=true
should_compile=true
should_copy=true
should_push=true
if [[ $1 == --help ]] || [[ $1 == -h ]] ; then
    echo "Usage: ./deploy.sh [options]"
    echo "--no-compile  Do not recompile TS -> JS."
    echo "--no-copy     Do not copy new Views or Public."
    echo "--no-push     Do not push updated local files."
    echo "--no-deploy	Do not restart remote instance."
    exit 0
fi

while test $# -gt 0
do
    case "$1" in
        --no-compile) should_compile=false
            ;;
        --no-copy) should_copy=false
            ;;
        --no-push) should_push=false
            ;;
        --no-deploy) should_deploy=false
            ;;
    esac
    shift
done

# Main Section
echo "[INFO] Deploy Script 2.0"
if [ "$should_compile" = true ]; then
    echo "[INFO] [1/5] Compiling TS."
    tsc && npx webpack --silent
else 
    echo "[INFO] [1/5] [Skipping] Compiling TS."
fi

if [ "$should_copy" = true ]; then
    echo "[INFO] [2/5] Copying PUG."
    cp -r views/ built/views/

    echo "[INFO] [3/5] Copying public/."
    cp -r public/stylesheets/ built/public/stylesheets/ && cp public/*.* built/public/
else
    echo "[INFO] [2/5] [Skipping] Copying PUG."
    echo "[INFO] [3/5] [Skipping] Copying public/."
fi


if [ "$should_push" = true ]; then
    # Use rsync to transfer files
    #"--exclude=*.ts --exclude=*.js.map"
    echo "[INFO] [4/5] Pushing to remote."
    rsync -r "--exclude=*tsconfig.json" "$PWD/$local_dir" "$CSLOC/$remote_dir"
    rsync "$PWD/package.json" "$CSLOC/$remote_dir"
    rsync "$PWD/package-lock.json" "$CSLOC/$remote_dir"
else
    echo "[INFO] [4/5] [Skipping] Pushing to remote."
fi


if [ "$should_deploy" = true ]; then
    echo "[INFO] [5/5] Restarting remote instance."
    # Kill old server and start server (change port in bin/www.ts to own port!)
    ssh "$CSADDR 
    killall node ;
    cd $remote_dir &&
    pwd &&
    tree -I node_modules &&
    (nolimit npm run up &)" -q -p test 2> /dev/null 
else
    echo "[INFO] [5/5] [Skipping] Restarting remote instance."
fi

echo "[INFO] Finished."