#!/usr/bin/env zsh
# Exit on error
set -e
# The above line uses zsh because I do, you might need to change this (google 'shebang line')

# Compiles files, transfers to remote, kills old server, and runs new server.
# if $1 is present then will not restart remote server (i.e. for /public changes only)

# Hints:
# 1) You may want to run this in tmux or modify this script
# 2) This runs "killall node" which may be an issue
# 3) Check you have all global variables ready

# Global Vars Required
# $remote_address should be $USER@<url> ie user@address to connect to via ssh
# $remote_directory_address should be $remote_address:/cs/home/$USER ie user@address:/path to find home directory
# (or any you have permissions for)
remote_user="root"
remote_address="$remote_user@cheem.co.uk"
remote_directory_address="$remote_address:/$remote_user"

# Directories
local_dir="built"                   # Where to find TS compiled files and
remote_dir="LabChecker"             # Where to send files remotely


# Formatting options
b="\033[1m"     # bold
r="\033[31m"    # red
y="\033[33m"    # yellow
d="\033[39m"    # default colour
u="\033[4m"     # underline
n="\033[0m"     # reset all to normal

# Where to store log from outputs.
log_file="run.log"

function print_error_message() {
    echo -e "${r}${b}[ERROR]${n} Previous step returned non zero exit code! See ${PWD}/${log_file} for details."
    exit 1
}

function print_fatal_message() {
    echo -e "${r}${b}[ERROR]${n} Something terrible has gone wrong and this script could not start!"
    echo -e "See ${PWD}/${log_file} for details."
    exit 1
}

# Compile TS and copy other files into built folder like package*.json, public/*, and views/*
# todo add "local_dir" p aram to npm commands
should_clean=true
should_compile=true
should_copy=true
should_push=true
should_deploy=true
should_classic_deploy=false
should_install_remote=false

if [[ $1 == --help ]] || [[ $1 == -h ]] ; then
    echo "Usage: ./deploy.sh [options]"
    echo "--no-clean        Do not delete old built files."
    echo "--no-compile      Do not recompile TS -> JS."
    echo "--no-copy         Do not copy new Views or Public."
    echo "--no-push         Do not push updated local files."
    echo "--no-deploy       Do not restart remote instance (if not provided will killall node and let systemd restart it)."
    echo "--install-remote  Run npm install before deploy."
    echo "--classic-deploy  Restart remote instance through script rather than systemd."
    exit 0
fi


function get_options() {
    while test $# -gt 0
    do
        case "$1" in
            --no-cleam) should_clean=false
                ;;
            --no-compile) should_compile=false
                ;;
            --no-copy) should_copy=false
                ;;
            --no-push) should_push=false
                ;;
            --no-deploy) should_deploy=false
                ;;
            --install-remote) should_install_remote=true
                ;;
            --classic-deploy) should_classic_deploy=true
                ;;
        esac
        shift
    done
}

function new_log_entry() {
    echo "$(date +"%T") ---------------------------------------" >> ${log_file} 2>&1
    echo -e "${b}[INFO]${n} ${u}Deploy Script ${b}3.0${n}"
}

function clean() {
    if [[ "$should_compile" = true ]]; then
       echo -e "${b}[INFO]${n} ${u}[1/6]${n} Cleaning old build files."
       rm -rf built/
    else
       echo -e "${b}[${y}INFO${d}]${n} ${u}[1/6]${n} ${b}[${y}SKIPPING${d}]${n} Cleaning old build files."
    fi
}

function compile() {
    if [[ "$should_compile" = true ]]; then
        echo "${b}[INFO]${n} ${u}[2/6]${n} Building new project."
        (tsc  >> ${log_file} 2>&1)
#        (npx webpack >> ${log_file} 2>&1)
    else
        echo "${b}[${y}INFO${d}]${n} ${u}[2/6]${n} ${b}[${y}SKIPPING${d}]${n} Building new project."
    fi
}

function copy() {
    if [[ "$should_copy" = true ]]; then
        echo "${b}[INFO]${n} ${u}[3/6]${n} Copying frontend files."
        (mkdir -p built/views/) >> ${log_file} 2>&1
        (mkdir -p built/public/stylesheets/) >> ${log_file} 2>&1
        (cp -r views/ built/views/) >> ${log_file} 2>&1
        (cp -r public/stylesheets/ built/public/stylesheets/) >> ${log_file} 2>&1
        (cp public/*.* built/public/) >> ${log_file} 2>&1
    else
        echo "${b}[${y}INFO${d}]${n} ${u}[3/6]${n} ${b}[${y}SKIPPING${d}]${n} Copying frontend files."
    fi
}

function push() {
    if [[ "$should_push" = true ]]; then
        # Use rsync to transfer files
        #"--exclude=*.ts --exclude=*.js.map"
        echo "${b}[INFO]${n} ${u}[4/6]${n} Pushing built files to remote."
        rsync -r "--exclude=*tsconfig.json" "$PWD/$local_dir" "$remote_directory_address/$remote_dir" >> ${log_file} 2>&1
        rsync "$PWD/package.json" "$remote_directory_address/$remote_dir" >> ${log_file} 2>&1
        rsync "$PWD/package-lock.json" "$remote_directory_address/$remote_dir" >> ${log_file} 2>&1
        rsync "$PWD/start.sh" "$remote_directory_address/$remote_dir" >> ${log_file} 2>&1
    else
        echo "${b}[${y}INFO${d}]${n} ${u}[4/6]${n} ${b}[${y}SKIPPING${d}]${n} Pushing built files to remote."
    fi
}

function install() {
    if [[ "$should_install_remote" = true ]]; then
        echo "${b}[INFO]${n} ${u}[5/6]${n} Running npm install on remote."
        # Kill old server and start server (change port in bin/www.ts to own port!)
        ssh ${remote_address} "cd $remote_dir ; npm install" >> ${log_file} 2>&1
    else
        echo "${b}[${y}INFO${d}]${n} ${u}[5/6]${n} ${b}[${y}SKIPPING${d}]${n} Running npm install on remote."
    fi
}

function deploy() {
    if [[ "$should_deploy" = true ]]; then
        # Kill old server and start server (change port in bin/www.ts to own port!)
        if [[ "$should_classic_deploy" = true ]]; then
            echo "${b}[INFO]${n} ${u}[6/6]${n} Starting remote instance via script."
            ssh ${remote_address} "killall node ; cd $remote_dir ; chmod +x start.sh ; ./start.sh" >> ${log_file} 2>&1
        else
            echo "${b}[INFO]${n} ${u}[6/6]${n} Starting remote instance via systemd."
            # Hopefully remote has the "run.sh" script systemd'd to restart always.
            ssh ${remote_address} "cd $remote_dir ; chmod +x start.sh ; killall node" >> ${log_file} 2>&1
        fi
    else
        echo "${b}[${y}INFO${d}]${n} ${u}[6/6]${n} ${b}[${y}SKIPPING${d}]${n} Starting remote instance."
    fi
    echo "${b}[INFO]${n} Finished."
}

# Main Section

(new_log_entry  || print_fatal_message)
(get_options    || print_error_message)
(clean          || print_error_message)
(compile        || print_error_message)
(copy           || print_error_message)
(push           || print_error_message)
(install        || print_error_message)
(deploy         || print_error_message)
